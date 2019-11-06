import { _isArrayLike } from "./internal/typeTraits";
import { _toIterator } from "./internal/toIterator";

/**
 * Map or object
 * values
 */
export const values = async function *(iter) {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[1];
        } else {
            // yield e;
            throw new Error(`values / ${e} is not array`);
        }
    }
};