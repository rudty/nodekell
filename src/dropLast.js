import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";

/**
 * drop last element
 * 
 * const a = [1,2,3,4,5];
 * const dropIter = F.dropLast(1, a);
 * for await (const e of dropIter) {
 *      console.log(e);
 * }
 * print 
 * 1
 * 2
 * 3
 * 4
 */
export const dropLast = curry(async function *(count, iter) {
    const q = new _Queue();
    const g = await _fetchAndGetIterator(count, iter, q.add.bind(q));
    
    while (true) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        q.add(e.value);
        yield q.poll();
    }
});
