import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";
export const takeLast = curry(async function *(count, iter) {
    iter = await _collectArray(iter);
    yield* iter.slice(iter.length - count);
});