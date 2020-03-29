import { curry } from "./curry";
import * as P from "./internal/runtime";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";
import { Iter, _FlatPredicate, FlatForInternalFn, _Predicate } from "./internal/typeTraits";

const _fetch_filter_internal = (f: any, v: any, fn: any, iter: any) => {
    const fetchCount = P.parallel_get_fetch_count_internal() - 1;
    return _fetchAndGetIterator(fetchCount, iter, (e) => {
        f.add(fn(e));
        v.add(e);
    });
};

export interface PFilterType {
    /**
     * concurrently filter
     * @example
     * // F.parallel_set_fetch_count(100);  default is 100
     * const v = await F.run(
     *     F.range(Infinity),
     *     F.pfilter(async e =>{
     *         console.log(e);
     *         //somthing async work...
     *         return e % 2 === 0;
     *     }),// fetch and execute first [0..99]
     *     F.take(2),// take 2 and execute 100, 101, 102 in pmap:[3..102]
     *     F.collect);
     * console.log(v);
     * // print
     * // 1
     * // 2
     * // 3
     * // ...
     * // ...
     * // 99
     * // [0,2]
     * @param f filter function
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const pfilter = curry(async function *(fn: any, iter: any) {
    const f = new _Queue();
    const v = new _Queue();
    const g = await _fetch_filter_internal(f, v, fn, iter);
    for await (const e of g) {
        f.add(fn(e));
        v.add(e);

        const c = v.poll();
        if (await <any> f.poll()) {
            yield c;
        }
    }

    while (!v.isEmpty()) {
        const c = v.poll();
        if (await <any> f.poll()) {
            yield c;
        }
    }
});
