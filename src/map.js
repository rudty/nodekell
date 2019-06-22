import { curry } from "./curry";
export const map =  curry(async function*(fn, iter) {
    for await (const e of iter) {
        yield fn(e);
    }
});