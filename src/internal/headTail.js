import { seq } from "../seq";
import { _isTypedArray, _isString } from "./typeTraits";

const _throwEmpty = () => {
    throw new Error("empty iter");
};

const _headTailArray = async (arr) => {
    if (arr.length === 0) {
        _throwEmpty();
    }
    return [await arr[0], arr.slice(1)];
};

const _headTailIterator = async (iter) => {
    const g = seq(iter);
    const head = await g.next();
    if (head.done) {
        _throwEmpty();
    }
    return [head.value, g];
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
export const _headTail = (iter) => {
    if (Array.isArray(iter) || _isTypedArray(iter) || _isString(iter)) {
        return _headTailArray(iter);
    }
    return _headTailIterator(iter);
};