/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

/**
 * take all elements of Iterable or AsyncIterable. 
 * No element is returned. Use [collect] if you want to use it.
 * @example
 *      await F.run([1,2,3,4,5],
 *          F.map(NetworkSomthingJob),
 *          F.blocking);
 * @param {Iterable | AsyncIterable} iter any iterator
 * @returns {Promise}
 */
export const blocking = async (iter) => {    
    for await (const _ of iter) {
        /** empty */
    }
};
