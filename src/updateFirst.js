import { _isFunction } from "./internal/typeTraits";
import { equals } from "./equals";
import { seq } from "./seq";
import { curry } from "./curry";

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
 * In {iter}, update the first value that matches {x} to {value}.
 * @example
 *      const arr = [1, 2, 3];
 *      const r = F.updateFirst(
 *          99, // update value
 *          1,  // find value
 *          arr);
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      // print
 *      // 99
 *      // 2
 *      // 3
 *
 * @param {*} value update value
 * @param {Object | Function} x predicate. update value or find function
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