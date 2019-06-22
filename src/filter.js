import { curry } from "./curry"
export const filter = curry(async function*(fn, iter) {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});
