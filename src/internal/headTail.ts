import { seq } from "../seq";
import { _isTypedArray, _isString, Iter, ExtractPromise } from "./typeTraits";
import { _mustNotEmptyIteratorResult } from "./runtime";

export interface HeadTailType<T> {
    0: T;
    1: (T | Promise<T>)[] | AsyncIterableIterator<ExtractPromise<T>>;
    [Symbol.iterator](): any;
}

const _headTailArray = async <T>(arr: (T | Promise<T>)[]): Promise<HeadTailType<T>> => {
    if (arr.length !== 0) {
        return [await arr[0], arr.slice(1)];
    }
    throw new Error("empty array");
};

const _headTailIterator = async <T>(iter: Iter<T>): Promise<HeadTailType<T>> => {
    const g = seq(iter);
    const head = await g.next();
    _mustNotEmptyIteratorResult(head);
    return [head.value, g];
};

/**
 * get head and tail
 * const [head, tail] = _headTail(iterator);
 *
 * head = value
 * tail = generator
 *
 * @param iter any iterable
 * @returns [head, tail]
 */
export const _headTail = <T>(iter: any): Promise<HeadTailType<T>> => {
    if (Array.isArray(iter) || _isTypedArray(iter) || _isString(iter)) {
        return _headTailArray(iter);
    }
    return _headTailIterator(iter);
};
