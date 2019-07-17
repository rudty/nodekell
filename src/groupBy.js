import { curry } from "./curry";

export const groupBy = curry(async (f, iter) => {
    const m = new Map();
    for await (const e of iter) {
        const k = await f(e);
        const v = m.get(k);
        if (v) {
            v.push(e);
        } else {
            m.set(k, [e]);
        }
    }
    return m;
});
