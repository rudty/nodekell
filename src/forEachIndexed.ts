import { curry } from "./curry";
import { Iter, ExtractPromise, _IndexedFunc1, _IndexedFlatFunc1 } from "./internal/typeTraits";

export interface ForEachIndexed {
    <T, R>(f: _IndexedFunc1<T, R>, iter: Iter<T | Promise<T>>): Promise<R[]>;
    <T extends Iter<any>, R>(f: _IndexedFlatFunc1<T, R>, iter: T): Promise<ExtractPromise<R>[]>;
    <T extends Iter<any>, R>(f: _IndexedFlatFunc1<T, R>): (iter: T) => Promise<ExtractPromise<R>[]>;
    <T, R>(f: _IndexedFunc1<T, R>): (iter: Iter<T | Promise<T>>) => Promise<R[]>;
}

/**
 * forEach with loop counter
 * works concurrency
 *
 * @example
 * const beginTime = Date.now();
 * const arr = ['a','b','c','d','e'];
 * await F.forEachIndexed(async (i, e) => {
 *     await F.sleep(100);
 *     console.log(i, e);
 * }, arr);
 * const endTime = Date.now();
 * console.log(endTime - beginTime);
 * // print
 * // 0 'a'
 * // 1 'b'
 * // 2 'c'
 * // 3 'd'
 * // 4 'e'
 *
 * @param f each function
 * @param iter any iterator
 */
export const forEachIndexed: ForEachIndexed = curry(async (f: any, iter: Iter<any>): Promise<any[]> => {
    const wait = [];
    let i = 0;
    for await (const e of iter) {
        wait.push(f(i++, e));
    }
    return Promise.all(wait);
});
