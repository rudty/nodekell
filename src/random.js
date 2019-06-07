const crypto = require("crypto");
/**
 * random() => 0 ~ 4294967295 (unsigned int max)
 * random(10) => 0 ~ 9 [begin end)
 * random(1, 42) => 0 ~ 41 [begin end) 
 * 
 * maximum value is uint max
 * 
 * @param  {...any} k 0 ~ 2 argument
 */
export const random = (...k) => {
    const len = k.length;
    if (len === 0) {
        const buf = crypto.randomBytes(4);
        const n = buf.readUIntBE(0, 4);
        return n;
    }

    let begin = 0;
    let end = 0;
    let size = 4;

    switch (len) {
    case 1:
        end = k[0];
        break;
    case 2:
        begin = k[0];
        end = k[1];
        break
    default:
        throw new Error("function random: argument must <= 2");
    }
    const r = end - begin - 1;
    if (r <= 255) { //1byte(char)
        size = 1;
    } else if (r <= 65535) { //2byte(short)
        size = 2;
    } else if (r <= 16777215) { // 3byte
        size = 3;
    }  

    while (true) {
        const buf = crypto.randomBytes(size);
        const n = buf.readUIntBE(0, size) + begin;
        if (n < end) {
            return n;
        }
    }
};
