import { curry } from "./curry";
import { Iter, FlatForInternalFn, ExtractPromise } from "./internal/typeTraits";

export interface ForEach {
    <T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): Promise<R[]>;
    <T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R, iter: T): Promise<ExtractPromise<R>[]>;
    <T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R): (iter: T) => Promise<ExtractPromise<R>[]>;
    <T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => Promise<R[]>;
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
