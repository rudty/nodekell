import { curry } from "./curry";
export const forEachIndexed = curry(async (fn, iter) => {
    const wait = [];
    let i = 0;
    for await (const e of iter) {
        wait.push(fn(i++, e));
    }
    return Promise.all(wait);
});
