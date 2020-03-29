import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";
import { Iter, ExtractPromise, _Func1, _FlatFunc1 } from "./internal/typeTraits";
import { _fetchMapInternal } from "./internal/parallelFetch";

export interface PMapType {
    /**
     * concurrently map
     *
     * @example
     *  F.parallel_set_fetch_count(3);
     *
     *  await F.run(
     *      F.range(Infinity),
     *      F.pmap(async e =>{
     *          console.log(e);
     *          // somthing async work...
     *          return e + 1;
     *      }), // fetch and execute first [0..99]
     *      F.take(2),  // fetch 0, 1, excute 100, 101 in pmap:[2..101]
     *      F.collect);
     * // print
     * // 0
     * // 1
     * // 2
     * // ...
     * // ...
     * // 99
     * // 100
     * // 101
     * // [1,2]
     */
    <T, R>(f: _Func1<T, R>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
    <T extends Iter<any>, R>(f: _FlatFunc1<T, R>, iter: T): AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, R>(f: _FlatFunc1<T, R>): (iter: T) => AsyncIterableIterator<ExtractPromise<R>>;
    <T, R>(f: _Func1<T, R>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
}

export const pmap: PMapType = curry(async function *(fn: any, iter: any) {
    const f = new _Queue();
    const g = await _fetchMapInternal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield f.poll();
    }

    yield* f.removeIterator();
});
