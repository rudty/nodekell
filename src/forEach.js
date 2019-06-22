import { curry } from "./curry"

export const forEach = curry(async (fn, iter) => {
    const wait = [];
    for await (const e of iter) {
        wait.push(fn(e));
    }
    return Promise.all(wait);
});