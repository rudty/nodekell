import { curry } from "./curry";
import { _flatOnce } from "./internal/iterable";

export const concat = curry(async function *(a, b) {
    yield* _flatOnce(a);
    yield* _flatOnce(b);
});
export const union = concat;
