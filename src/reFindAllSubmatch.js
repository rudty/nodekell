import { curry } from "./curry";

const toGlobalRegex = (r) => {
    if (r.constructor === RegExp && r.global) {
        return r;
    }
    return new RegExp(r, "g");
};

export const reFindAllSubmatch = curry((re, str) => {
    const r = [];
    re = toGlobalRegex(re);
    
    while (true) {
        const m = re.exec(str);
        if (!m) {
            break;
        }
        r.push(m);
    }

    return r;
});