import { curry } from "./curry"
export const mapIndexed = curry(async function* (fn, iter) {
    let i = 0;
    for await (const e of iter) {
        yield fn(i++, e);
    }
});