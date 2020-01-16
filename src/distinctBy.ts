import { curry } from "./curry";
import { Iter, _Func1, _FlatFunc1, FlatForInternalFn, ExtractPromise } from "./internal/typeTraits";

export interface DistinctBy {
    /**
     * distinct iterator
     * @example
     * const a = [{num:1}, {num:1}, {num:2}];
     * const r = F.distinctBy(e=>e.num, a);
     * const result = await F.collect(r);
     * for (const m of result) {
     *     console.log(m);
     * }
     * // print
     * // {num:1}
     * // {num:2}
     * @param f distinct function (a: T) => any
     * @param iter any iterable
     */
    <T>(f: _Func1<T, any>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<ExtractPromise<T>>;
    <T extends Iter<any>>(f: _FlatFunc1<T, any>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatFunc1<T, any>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Func1<T, any>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
}
export const distinctBy: DistinctBy = curry(async function *(f: any, iter: Iter<any>): AsyncIterableIterator<any> {
    const s = new Set();
    for await (const e of iter) {
        const d = await f(e);
        if (!s.has(d)) {
            s.add(d);
            yield e;
        }
    }
});
