import { _isFunction } from "./internal/typeTraits";
import { equals } from "./equals";

const _updateFirstFunction = async function *() {

};

/**
 * @param {*} x predicate. update value or find function
 * @param {Iterable | AsyncIterable} iter any iterable
 */
export const updateFirst = curry(async function *(x, iter) {
    x = await x;
    if (_isFunction(x)) {
        yield* _updateFirstFunction(x, iter);
    } else {
        const compareFunction = equals(x);
        yield* _updateFirstFunction(compareFunction, iter);
    }
});