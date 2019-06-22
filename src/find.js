import { curry } from "./curry"
export const find = curry(async (fn, iter) => {
    for await(const e of iter) {
        if (await fn(e)) {
            return e;
        }
    }
    //return undefined;
});
