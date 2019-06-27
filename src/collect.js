/**
 * iterable to array
 * and resolve promise elements
 * 
 * @param {Array | Iterable | AsyncIterable} iter
 * @returns {Array}
 */
export const collect = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};