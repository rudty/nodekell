import { seq } from "../seq";
import { _isTypedArray, _isString } from "./typeTraits";
import { _mustNotEmptyIteratorResult } from "./runtime";

const _headTailArray = async (arr) => {
    if (arr.length !== 0) {
        return [await arr[0], arr.slice(1)];
    }
    // return undefined;
};

const _headTailIterator = async (iter) => {
    const g = seq(iter);
    const head = await g.next();
    return [head.value, g];    
};

const _headTailInternal = (iter) => {
    if (Array.isArray(iter) || _isTypedArray(iter) || _isString(iter)) {
        return _headTailArray(iter);
    }
    return _headTailIterator(iter);
};

/**
 * get head and tail
 * const [head, tail] = _headTail(iterator);
 * 
 * head = value
 * tail = generator
 * 
 * @param {Array | Iterable | AsyncIterable} iter 
 * @returns {Array} [head, tail] value, iterable
 */
export const _headTail = async (iter) => {
    const r = await _headTailInternal(iter);
    _mustNotEmptyIteratorResult(r[0]);
    return r;
};