import { collect } from "./collect";
import { random } from "./random";
import { _isArrayLike } from "./internal/isArrayLike";

const shuffleInternal = (arr) => {
    const len = arr.length;
    for (let i = len - 1; i >= 0; --i) {
        const where = random(len);
        if (i !== where) {
            const tmp = arr[i];
            arr[i] = arr[where];
            arr[where] = tmp;
        }
    }
    return arr;
};

//for Iterable, AsyncIterable
const shuffleAsync = async (iter) => {
    iter = await collect(iter);
    return shuffleInternal(iter);
};

/**
 * return a random permutation of iterator
 * 
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Array>} new shuffle Array
 */
export const shuffle = (iter) => {
    if (!_isArrayLike(iter)) {
        return shuffleAsync(iter);
    }
    return shuffleInternal(iter.slice());
};