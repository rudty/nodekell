import { equals } from "./equals";
import { curry } from "./curry";
import { seq } from "./seq";
import { _isFunction } from "./internal/typeTraits";

const _removeFirstFunction = async function *(comp, iter) {
    const g = seq(iter);
    for await (const e of g) {
        if (await comp(e)) {
            yield* g;
            return;
        } else {
            yield e;
        }
    }
};

/**
 * Iterates through A and removes the first element that satisfies the condition.
 *
 * @example
 *      for await (const e of F.removeFirst(1, [1,2,3,4])) {
 *          console.log(e);
 *      }
 *      // print
 *      // 2
 *      // 3
 *      // 4
 *
 *      const r = F.removeFirst((e) => e % 2 === 0, [1,2,3,4]);
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      // print
 *      // 1
 *      // 3
 *      // 4
 *
 * @param {*} x remove value or find function
 * @param {Iterable | AsyncIterable} iter any iterable
 */
export const removeFirst = curry(async function *(x, iter) {
    x = await x;

    if (_isFunction(x)) {
        yield* _removeFirstFunction(x, iter);
    } else {
        const compareFunction = equals(x);
        yield* _removeFirstFunction(compareFunction, iter);
    }
});
