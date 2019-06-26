import { curry } from "./curry";
import { reverse } from "./reverse";
import { _headTail } from "./internal/headTail";
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
    const r = reverse(iter);
    const [head, tail] = await _headTail(r);
    return _foldr_internal(f, head, tail);
});