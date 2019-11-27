import { random } from "./random";
import { _isReadableArrayLike } from "./internal/typeTraits";
import { _collectArray } from "./internal/collectArray";

const _sampleArray = (arr) => arr[random(arr.length)];

const _sampleNotArray = async (iter) => {
    const r = await _collectArray(iter);
    return _sampleArray(r);
};

/**
 * get random element from iterator
 * @param {Iterable | AsyncIterable} iter any iterator
 */
export const sample = (iter) => {
    if (_isReadableArrayLike(iter)) {
        return _sampleArray(iter);
    } 
    return _sampleNotArray(iter);
};