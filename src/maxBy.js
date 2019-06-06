import { curry } from "./curry"
import { seq } from "./seq"

export const maxBy = curry(async (f, iter) => {
    const g = seq(iter);
    const head = await g.next();
    if (head.done) {
        throw new Error("empty iter");
    }
    let m = head.value;
    let c = await f(m);
    for await (const e of g) {
        const k = await f(e);
        if (k > c) {
            m = e;
            c = k;
        }
    }
    return m;
});
