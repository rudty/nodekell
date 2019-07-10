import { curry } from "./curry";
import { _hasIterator } from "./internal/typeTraits";
export const fmap = curry(async function *(fn, iter) {
    for await (const e of iter) {
        if (e && _hasIterator(e)) {
            yield* await fn(e);
        } else {
            yield e;
        }
    }
});
export const flatMap = fmap;
