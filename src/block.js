/* eslint-disable no-unused-vars */
import { _toStrictIterator } from "./internal/toIterator";

/**
 * 1. await promise
 * 2. Fetch all the elements of type iterator. 
 *    When an element returns a promise, it waits for it to finish. 
 * 3. Fetch all elements of async iterator type.
 * @example
 *      const r = await F.run([1,2,3,4,5],
 *          F.map(SomethingNetworkJob), 
 *          F.map(console.log),
 *          F.block);
 * @param  {...Object} values
 */
export const block = async (...values) => {
    values = await Promise.all(values);
    for (const iter of values) {
        const it = _toStrictIterator(iter);
        if (it) {
            for (; ;) {
                //for await (const e of iter) {} is 
                //May not work due to optimizations
                const { value, done } = await it.next();
                if (done) {
                    break;
                }

                await value;
            }
        }
    }
};