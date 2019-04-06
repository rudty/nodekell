'use strict';
const C = require("./core.js");

exports.groupBy = C.curry(async (f, iter) => {
    const m = new Map();
    for await(const e of iter) {
        const k = await f(e);
        if (m.has(k)) {
            const v = m.get(k);
            v.push(e);
        } else {
            m.set(k, [e]);
        }
    }
    return m;
});

