import { seq } from "./seq";
import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";

const addNext = async (q, g) => {
    const e = await g.next();
    if (e.done) {
        return false;
    }
    q.add(e.value);
    return true;
};

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
    
    // for (let i = 0; i < count; i++) {
    //     if(!(await addNext(q, g))) {
    //         return;
    //     }
    // }
    
    while ((await addNext(q, g))) {
        yield q.poll();
    }
});
