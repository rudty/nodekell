import { curry } from "./curry";

export const every = curry(async (f, iter) => {
    for await (const e of iter) {
        if (!(await f(e))) {
            return false;
        }
    }
    return true;
});
