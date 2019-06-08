const crypto = require("crypto");

const random_unsigned_internal = (byteSize) => {
    const buf = crypto.randomBytes(byteSize);
    const n = buf.readUIntBE(0, byteSize);
    return n;
};

const random_internal = (r) => {
    let byteSize = 4;
    let maxValue = 4294967295;
    if (r <= 254) { //1byte(char)
        byteSize = 1;
        maxValue = 255;
    } else if (r <= 65534) { //2byte(short)
        byteSize = 2;
        maxValue = 65535;
    } 
    else if (r <= 16777214) { // 3byte
        byteSize = 3;
        maxValue = 16777215;
    }
    const n = random_unsigned_internal(byteSize);
    return n / maxValue;
};

const random_1 = (end) => {
    const r = end - 1;
    const rand = random_internal(r);
    return Math.ceil(rand * r);
};

const random_2 = (begin, end) => {
    const r = end - begin - 1;
    const rand = random_internal(r);
    return Math.ceil(rand * r + begin);
};

/**
 * random() => 0 ~ 4294967295 (unsigned int max)
 * random(10) => 0 ~ 9 [begin end)
 * random(1, 42) => 1 ~ 41 [begin end) 
 * 
 * maximum value is uint max
 * 
 * @param  {...any} k 0 ~ 2 argument
 */
export const random = (...k) => {
    const len = k.length;

    switch (len) {
    case 0:
        return random_unsigned_internal(4);
    case 1:
        return random_1(k[0]);
    case 2:
        return random_2(k[0], k[1]);
    default:
        throw new Error("function random: argument must <= 2");
    }
};
