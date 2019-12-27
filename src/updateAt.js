import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";
import { seq } from "./seq";
import { _takeValue } from "./internal/runtime";

/**
 * Update {iter} to the {index} position of {iter} received as an argument. 
 *
 * @example
 *      const arr = [1,2,3,4,5];
 *      const u = F.updateAt(
 *          99, // update value
 *          0,  // index
 *          arr // iterator
 *      );
 *      for await (const e of u) {
 *          console.log(e);
 *      }
 *      //print
 *      // 99
 *      // 2
 *      // 3
 *      // 4
 *      // 5
 * @param {any} value add value
 * @param {Number} index add index
 * @param {Iterable | AsyncIterable} iter any iterable
 * @returns {AsyncIterable} new AsyncIterator
 */
export const updateAt = curry(async function *(value, index, iter) {
    let i = 0;
    const g = seq(iter);
    for await (const e of g) {
        if (i++ === index) {
            yield value;
            yield* g;
            return;
        } else {
            yield e;
        }
    }
});
