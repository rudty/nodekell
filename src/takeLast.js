import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/fetchIterator";

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
    const q = new _Queue();
    const g = await _fetchAndGetIterator(count, iter, (e) => q.add(e));

    for await (const e of g) {
        q.add(e);
        q.poll();
    }
    
    yield* q.removeIterator();
});
