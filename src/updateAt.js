import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";

export const updateAt = curry(async function *(value, index, iter) {
    // const a = await _collectArray(iter);
    // a[index] = value;
    // return a; 
    let i = 0;
    for await (const e of iter) {
        if (i++ === index) {
            yield value;
        } else {
            yield e;
        }
    }
});