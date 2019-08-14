import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";

/**
 * take last n element
 * @example
 *      const arr = [1,2,3,4,5];
 *      const r = F.takeLast(2, arr); // last 2 elem
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      // print 
 *      // 4
 *      // 5
 * 
 * @param {Number} count take N count
 * @param {Iterable | AsyncIterable} iter any iterable
 * @returns {AsyncIterator}
 */
export const takeLast = curry(async function *(count, iter) {
    iter = await _collectArray(iter);
    yield* iter.slice(iter.length - count);
});
