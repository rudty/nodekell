import { curry } from "./curry";
import { Iter, ExtractPromise, _Func1, _FlatFunc1 } from "./internal/typeTraits";

export interface ForEach {
    <T, R>(f: _Func1<T, R>, iter: Iter<T | Promise<T>>): Promise<R[]>;
    <T extends Iter<any>, R>(f: _FlatFunc1<T, R>, iter: T): Promise<ExtractPromise<R>[]>;
    <T extends Iter<any>, R>(f: _FlatFunc1<T, R>): (iter: T) => Promise<ExtractPromise<R>[]>;
    <T, R>(f: _Func1<T, R>): (iter: Iter<T | Promise<T>>) => Promise<R[]>;
}

/**
 * works concurrency
 *
 * @example
 * const beginTime = Date.now();
 * await F.run(
 *   F.range(100),
 *   F.forEach(async e => {
 *       await F.sleep(100)
 *   }));
 * const endTime = Date.now();
 * console.log(endTime - beginTime);
 * // print 121
 *
 * @param f each function
 * @param iter any iterator
 */
export const forEach: ForEach = curry(async (f: any, iter: Iter<any>): Promise<any> => {
    const wait = [];
    for await (const e of iter) {
        wait.push(f(e));
    }
    return Promise.all(wait);
});
