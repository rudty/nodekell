let randomUintInternal;

if (typeof exports === "object" && 
    typeof module !== "undefined" && 
    typeof crypto === "undefined") {
    const crypto = require("crypto");

    randomUintInternal = (size) => {
        const buf = crypto.randomBytes(size);
        const n = buf.readUIntBE(0, size);
        return n;
    };
} else {
    randomUintInternal = (size) => {
        const buf = new ArrayBuffer(4);
        const ar = new Uint8Array(buf);
        const v = new DataView(buf);
        crypto.getRandomValues(ar);
        switch(size) {
            case 1: return v.getUint8(0);
            case 2: return v.getUint16(0);
            case 3: return v.getUint32(0) & 16777215;
            default: return v.getUint32(0);
        }
    };
}
const randomInternal = (begin, end) => {
    const randomRange = end - begin - 1;

    /**
     * mask: binary digit, equal or greater than randomRange
     * bit: multiple of 2 greater than randomRange
     * 
     * randomRange: 0~255 byteSize:1
     * randomRange: 256~65535 byteSize:2
     * randomRange: 65536~16777215 byteSize:3
     * ...
     * ...
     */

    let step = 0;
    let bit = 1;
    for (;randomRange >= bit; ++step) {
        bit <<= 1;
    }

    const mask = bit - 1;
    const byteSize = Math.floor(step / 8) + 1;

    const v = randomUintInternal(byteSize) & mask;
    const randomValue = v / bit;

    return Math.ceil(randomValue * randomRange) + begin;
};

/**
 * random() => 0 ~ 4294967295 (unsigned int max)
 * random(10) => 0 ~ 9 [begin end) max: 4294967295
 * random(1, 42) => 1 ~ 41 [begin end) max: 4294967295
 * 
 * maximum value is uint max
 * 
 * @param  {...Object} k 0 ~ 2 argument
 */
export const random = (...k) => {
    const len = k.length;

    switch (len) {
    case 0:
        return randomUintInternal(4);
    case 1:
        return randomInternal(0, k[0]);
    case 2:
        return randomInternal(k[0], k[1]);
    default:
        throw new Error("function random: argument must <= 2");
    }
};
