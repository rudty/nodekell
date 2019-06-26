import { curry } from "./curry";
import { _headTail } from "./internal/headTail";

export const minBy = curry(async (f, iter) => {
    let [m, tail] = await _headTail(iter);
    
    let c = await f(m);
    for await (const e of tail) {
        const k = await f(e);
        if (k < c) {
            m = e;
            c = k;
        }
    }
    return m;
});