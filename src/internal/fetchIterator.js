import { seq } from "../seq";

/**
 * fetch {fetchCount} elements and returns iterator
 *
 * @param {Number} fetchCount 
 * @param {Iterable | AsyncIterable} iter iterable
 * @param {Function} fn callback 
 * @returns {AsyncIterator} next iter
 */
export const _fetchAndGetIterator = async (fetchCount, iter, fn) => {
    fetchCount = Math.max(fetchCount, 0);
    const g = seq(iter);
    for (let i = fetchCount; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        fn(e.value);
    }
    return g;
};