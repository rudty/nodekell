import { curry } from "./curry";
import { _hasIterator } from "./internal/typeTraits";

export const concat = curry(async function *(a, b) {
    yield* a;
    if (b && _hasIterator(b)) {
        yield* b;
    } else {
        yield b;
    }
});
export const union = concat;
