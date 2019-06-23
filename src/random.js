const crypto = require("crypto");

const randomUintInternal = (size) => {
    const buf = crypto.randomBytes(size);
    const n = buf.readUIntBE(0, size);
    return n;
};

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
 * @param  {...any} k 0 ~ 2 argument
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
