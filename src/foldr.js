import { curry } from "./curry";
import { reverse } from "./reverse";
const _foldr_internal = async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(e, z);
    }
    return z;
};

export const foldr = curry((f, z, iter) => {
    return _foldr_internal(f, z, reverse(iter));
});

export const foldr1 = curry(async (f, iter) => {
    const g = reverse(iter);
    const h = await g.next();
    if (h.done) {
        throw new Error("empty iter");
    }
    return _foldr_internal(f, h.value, g);
});