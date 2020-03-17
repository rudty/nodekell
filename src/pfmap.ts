import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";
import { Iter, ExtractPromise, _Func1, _FlatFunc1, Flat } from "./internal/typeTraits";
import { _fetchMapInternal } from "./internal/parallelFetch";

/**
 * Promise Iter Flat
 */
export type PFlat<T> = ExtractPromise<Flat<ExtractPromise<T>>>;

export interface PFMapType {
    /**
     * like fmap, but calls a [parallel_set_fetch_count] of functions concurrently.
     * @example
     * // F.parallel_set_fetch_count(100); default is 100
     *  const v = await F.run(
     *     F.range(Infinity),  //0,1,2,...
     *     F.map(e=> [e]),     //[0],[1],[2]...
     *     F.pfmap(async e =>{
     *         console.log(e); //print [0] ...
     *
     *         //somthing async work...
     *
     *         e.push(42);     // [0,42],[1,42],[2,42]...
     *         return e;
     *     }),
     *     F.take(5),   // [0,42,1,42,2]
     *     F.collect);  // iterator to array
     * console.log(v);
     * // print
     * // [0]
     * // [1]
     * // [2]
     * // ...
     * // ...
     * // [99]
     * // [0,42,1,42,2]
     * @param f flat function
     * @param iter any iterator
     */
    <T, R = T>(f: _Func1<T, R>, iter: Iter<T>): AsyncIterableIterator<PFlat<ExtractPromise<R>>>;
    <T, R = ExtractPromise<T>>(f: _Func1<T, R>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;
    <T, R = T>(f: _Func1<T, R>): (iter: Iter<T>) => AsyncIterableIterator<PFlat<ExtractPromise<R>>>;
    <T, R = ExtractPromise<T>>(f: _Func1<T, R>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;
}

export const pfmap: PFMapType = curry(async function *(fn: any, iter: any) {
    const f: _Queue<any> = new _Queue();
    const g = await _fetchMapInternal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield* await f.poll();
    }

    while (!f.isEmpty()) {
        yield* await f.poll();
    }
});
