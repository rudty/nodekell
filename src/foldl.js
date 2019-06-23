import { curry } from "./curry";
import { seq } from "./seq";
export const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});

export const foldl1 = curry(async (f, iter) => {
    const g = seq(iter);
    const h = await g.next();
    if (h.done) {
        throw new Error("empty iter");
    }
    return foldl(f, h.value, g);
});
export const reduce = foldl1;
