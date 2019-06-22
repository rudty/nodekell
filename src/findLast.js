import { curry } from "./curry";
import { collect } from "./collect";

export const findLast = curry(async (fn, iter) => {
    iter = Array.isArray(iter) ? iter : await collect(iter);
    for (let i = iter.length - 1; i >= 0; --i) {
        if (await fn(iter[i])) {
            return iter[i];
        }
    }
    //return undefined;
});
