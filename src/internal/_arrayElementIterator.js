import { _toIterator } from "./toIterator";
import { _isArrayLike } from "./typeTraits";

/**
 * Gets only the {index} value from the Collection object.
 */
export const _arrayElementIterator = (index, onNotArrayError) => async function *(iter) {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[index];
        } else {
            onNotArrayError(e);
        }
    }
};
