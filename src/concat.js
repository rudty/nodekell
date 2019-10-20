import { curry } from "./curry";
import { flatOnce } from "./internal/flatOnce";

export const concat = curry(async function *(a, b) {
    yield* flatOnce(a);
    yield* flatOnce(b);
});
export const union = concat;
