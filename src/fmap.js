import { curry } from "./curry";

export const fmap = curry(async function *(fn, iter) {
    for await (const e of iter) {
        yield* await fn(e);
    }
});

export const flatMap = fmap;
