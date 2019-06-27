import { curry } from "./curry";
import { _collectInternal } from "./internal/collectInternal";

export const findLast = curry(async (fn, iter) => {
    iter = await _collectInternal(iter);
    for (let i = iter.length - 1; i >= 0; --i) {
        if (await fn(iter[i])) {
            return iter[i];
        }
    }
    //return undefined;
});
