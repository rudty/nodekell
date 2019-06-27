import { collect } from "../collect";

/**
 * iterable to array
 * and resolve promise elements
 * 
 * @param {Array | Iterable | AsyncIterable} iter
 * @returns {Array}
 */
export const _collectInternal = (iter) => {
    if (Array.isArray(iter)) {
        return Promise.all(iter);
    }
    return collect(iter);
};