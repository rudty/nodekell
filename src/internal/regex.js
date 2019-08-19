const toGlobalRegex = (r) => {
    if (r.constructor === RegExp) {
        if (!r.global) {
            r = new RegExp(r, r.flags + "g");
        }
        r.lastIndex = 0;
        return r;
    }
    return new RegExp(r, "g");
};

export const findAllSubMatch = (re, str, callback) => {
    re = toGlobalRegex(re);
    
    while (true) {
        const m = re.exec(str);
        if (!m) {
            break;
        }
        callback(m);
    }
};