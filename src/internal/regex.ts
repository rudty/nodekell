const toGlobalRegex = (r: any): RegExp => {
    if (r.constructor === RegExp) {
        if (!r.global) {
            r = new RegExp(r, r.flags + "g");
        }
        r.lastIndex = 0;
        return r;
    }
    return new RegExp(r, "g");
};

export const findAllSubMatch = (re: any, str: string, callback: (a: RegExpExecArray) => any) => {
    re = toGlobalRegex(re);

    while (true) {
        const m = re.exec(str);
        if (!m) {
            break;
        }
        callback(m);
    }
};
