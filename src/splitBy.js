import { curry } from "./curry";

export const splitBy = curry(async function*(f, any) {
    yield* await f(any);
});
