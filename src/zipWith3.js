import { curry } from "./curry";
import { seq } from "./seq";
import { _zipWith } from "./internal/runtime";

export const zipWith3 = curry(async function *(f, a, b, c) {
    yield* _zipWith(f, [seq(a), seq(b), seq(c)]);
});