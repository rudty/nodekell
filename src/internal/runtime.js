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