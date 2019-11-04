import { _isArrayLike } from "./internal/typeTraits";


/**
 * Map or object
 * keys
 */
export const keys = async function *(iter) {
    if (iter instanceof Map ||
        iter instanceof Set) {
        yield* iter.keys();
    }

    // any object
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[0];
        } else {
            yield e;
        }
    }
};