import { collect } from "../collect";

/**
 * remove promise
 * 
 * @param {Array | Iterable | AsyncIterable} iter
 * @returns {Array | AsyncIterator} iterator
 */
export const _collectIterable = (iter) => {
    if (Array.isArray(iter)) {
        return Promise.all(iter);
    }
    return collect(iter);
};