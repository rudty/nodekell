import { curry } from "./curry";
import { _headTail } from "./internal/headTail";
export const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});

export const foldl1 = curry(async (f, iter) => {
    const [head, tail] = await _headTail(iter);
    return foldl(f, head, tail);
});
export const reduce = foldl1;
