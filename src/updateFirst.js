import { _isFunction } from "./internal/typeTraits";
import { equals } from "./equals";

const _updateFirstFunction = async function *(value, comp, iter) {
    const g = seq(iter);
    for await (const e of g) {
        if (await comp(e)) {
            yield value;
            yield* g;
            return;
        } else {
            yield e;
        }
    }
};

/**
 * @param {*} x predicate. update value or find function
 * @param {Iterable | AsyncIterable} iter any iterable
 */
export const updateFirst = curry(async function *(value, x, iter) {
    x = await x;
    if (_isFunction(x)) {
        yield* _updateFirstFunction(value, x, iter);
    } else {
        const compareFunction = equals(x);
        yield* _updateFirstFunction(value, compareFunction, iter);
    }
});