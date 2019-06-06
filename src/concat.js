import { curry } from "./curry"

export const concat = curry(async function* (a, b) {
    yield* a;
    yield* b;
});
export const union = concat;
