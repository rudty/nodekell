import { curry } from "./curry";
import { _collectIterable } from "./internal/collectIterable";

export const findLast = curry(async (fn, iter) => {
    iter = await _collectIterable(iter);
    for (let i = iter.length - 1; i >= 0; --i) {
        if (await fn(iter[i])) {
            return iter[i];
        }
    }
    //return undefined;
});
