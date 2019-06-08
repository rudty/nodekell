const crypto = require("crypto");

const random_unsigned_internal = (byteSize) => {
    const buf = crypto.randomBytes(byteSize);
    const n = buf.readUIntBE(0, byteSize);
    return n;
};

const random_internal = (begin, end) => {
    const randomRange = end - begin - 1;
    let byteSize = 4;
    let maxValue = 4294967295;
    if (randomRange <= 254) { //1byte(char)
        byteSize = 1;
        maxValue = 255;
    } else if (randomRange <= 65534) { //2byte(short)
        byteSize = 2;
        maxValue = 65535;
    } 
    else if (randomRange <= 16777214) { // 3byte
        byteSize = 3;
        maxValue = 16777215;
    }
    const n = random_unsigned_internal(byteSize);
    const randomValue = n / maxValue; //[0 ~ 1) like Math.random

    return Math.ceil(randomValue * randomRange + begin); 
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
        return random_unsigned_internal(4);
    case 1:
        return random_internal(0, k[0]);
    case 2:
        return random_internal(k[0], k[1]);
    default:
        throw new Error("function random: argument must <= 2");
    }
};
