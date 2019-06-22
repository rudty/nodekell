import { curry } from "./curry";
export const peek = curry(async function*(f, iter) {
    for await (const e of iter) {
        await f(e);
        yield e;
    }
});
