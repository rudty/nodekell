import { curry } from "./curry";
export const filterIndexed = curry(async function*(fn, iter) {
    let i = 0;
    for await (const e of iter) {
        if (await fn(i++, e)) {
            yield e;
        }
    }
});