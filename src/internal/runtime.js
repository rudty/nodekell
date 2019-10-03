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
