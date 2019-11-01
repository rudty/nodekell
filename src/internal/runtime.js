/**
 * Get the value.
 * If it's a Promise, it gets its value from Promise
 * Then call the function if the value is a function.
 * @param {Object} v any 
 */
export const _takeValue = async (v) => {
    v = await v;

    if (v.constructor === Function) {
        v = await v();
    }

    return v;
};

/**
 * Remove all elements of iterator
 * @param {IterableIterator | AsyncIterator} it 
 */
export const _removeAllIteratorElements = async (it) => {
    if (!it) {
        return;
    }

    for (; ;) {
        //for await (const e of iter) {} is 
        //May not work due to optimizations
        const { value, done } = await it.next();
        if (done) {
            break;
        }

        await value;
    }
};
/**
 * zip elements
 *  arr = [[1,2,3],[4,5,6]]
 *  result => [[1,4],[2,5],[3,6]]
 *
 * @param {Function} f zipFunction
 * @param {Array} arr zipArray
 */
export const _zipWith = async function *(f, arr) {
    while (true) {
        const elems = await Promise.all(arr.map(e => e.next()));
        for (let i = 0; i < elems.length; ++i) {
            if (elems[i].done) {
                return;
            }
        }
        yield f.apply(null, elems.map(e => e.value));
    }
};