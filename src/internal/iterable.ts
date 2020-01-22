import { _isArrayLike, _hasIterator, Iter, ExtractPromise } from "./typeTraits";
import { seq } from "../seq";

/**
 * object to iterator
 *
 * @param object any object
 */
const objectIterator = function *(object: any): IterableIterator<[string, any]> {
    const keys = Object.keys(object);
    for (const k of keys) {
        yield [k, object[k]];
    }
};

/**
 * object to iterator if has Symbol.iterator or Symbol.asyncIterator
 * @param a object
 */
export const _toStrictIterator = (a: any): Iter<any> | undefined => {
    if (a) {
        const it = a[Symbol.iterator];
        if (it) {
            return it.call(a);
        }

        const ait = a[Symbol.asyncIterator];
        if (ait) {
            return ait.call(a);
        }
    }
    // return undefined;
};

/**
 * object to iterator
 * if dont have Symbol.iterator or Symbol.asyncIterator
 * iterate [Object.key, Object.value]
 * @param a object
 */
export const _toIterator = (a: any): Iter<any> | undefined => {
    if (a) {
        const s = _toStrictIterator(a);
        if (s) {
            return s;
        }
        return objectIterator(a);
    }
    // return undefined;
};

/**
 * Gets only the {index} value from the Collection object.
 */
export const _arrayElementIterator = (index: number, onNotArrayError: (elem: any) => any) => async function *(iter: any): AsyncIterableIterator<any> {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[index];
        } else {
            onNotArrayError(e);
        }
    }
};

/**
 * If the argument is iterable, the elements are returned as iterable.
 * If not, return the argument iterable
 * @param a any object
 */
export const _flatOnce = async function *(a: any): AsyncIterableIterator<any> {
    a = await a;
    if (a && _hasIterator(a)) {
        yield* a;
    } else {
        yield a;
    }
};

/**
 * fetch {fetchCount} elements and returns iterator
 *
 * @param fetchCount
 * @param iter iterable
 * @param fn callback
 * @returns next iter
 */
export const _fetchAndGetIterator = async (fetchCount: number, iter: Iter<any>, fn: (elem: any) => any): Promise<AsyncIterableIterator<any>> => {
    fetchCount = Math.max(fetchCount, 0);
    const g = seq(iter);
    for (let i = fetchCount; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        fn(e.value);
    }
    return g;
};
