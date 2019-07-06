import { random } from "./random";
import { _isReadableArrayLike } from "./internal/typeTraits";
import { collect } from "./collect";

const _sampleArray = (arr) => arr[random(arr.length)];

const _sampleNotArray = async (iter) => {
    const r = await collect(iter);
    return _sampleArray(r);
};

/**
 * get random element from iterator
 * @param {Iterable | AsyncIterable} iter any iterator
 */
export const sample = (iter) => {
    if (_isReadableArrayLike(iter) || iter.constructor === String) {
        return _sampleArray(iter);
    } 
    return _sampleNotArray(iter);
};