import { curry } from "./curry";
import { seq } from "./seq";
import { _zipWith } from "./internal/runtime";

export const zipWith = curry(async function *(f, a, b) {
    yield* _zipWith(f, [seq(a), seq(b)]);
});