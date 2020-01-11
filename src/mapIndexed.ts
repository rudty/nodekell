import { curry } from "./curry";
import { Iter, _IndexedFunc1, ExtractPromise, _IndexedFlatFunc1 } from "./internal/typeTraits";

export interface MapIndexed {
    <T, R>(fn: _IndexedFunc1<T, R>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
    <T extends Iter<any>, R>(fn: _IndexedFlatFunc1<T, R>, iter: T): AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, R>(fn: _IndexedFlatFunc1<T, R>): (iter: T) => AsyncIterableIterator<ExtractPromise<R>>;
    <T, R>(fn: _IndexedFunc1<T, R>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
}

/**
 * map with loop counter
 * @example
 * const a = ['a','b','c','d','e'];
 * const mapped = F.mapIndexed((i, e) => {
 *     return e + i;
 * }, a);
 *
 * for await (const e of mapped) {
 *     console.log(e);
 * }
 * //print
 * //a0
 * //b1
 * //c2
 * //d3
 * //34
 * @param fn function (a) => b
 * @param iter any iterator
 * @returns mapped async iterator
 */
export const mapIndexed: MapIndexed = curry(async function *(fn: any, iter: Iter<any>): AsyncIterableIterator<any> {
    let i = 0;
    for await (const e of iter) {
        yield fn(i++, e);
    }
});
