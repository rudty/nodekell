import { _isArrayLike } from "./internal/typeTraits";
import { _toIterator } from "./internal/toIterator";


/**
 * Map or object
 * keys
 */
export const keys = async function *(iter) {
    // any object
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[0];
        } else {
            // yield e;
            throw new Error(`keys / ${e} is not array`);
        }
    }
};