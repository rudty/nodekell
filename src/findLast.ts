import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";
import { Iter, _Predicate, _FlatPredicate, FlatForInternalFn } from "./internal/typeTraits";

export interface FindLast {
    /**
     * find last element
     * @example
     * const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
     * const r = await F.findLast(e => "a" in e , arr);
     * console.log(r); // print {a:"a3"}
     *
     * const arr2 = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
     * const r2 = await F.findLast(e => "hello" in e , arr2);
     * console.log(r2); // print undefined
     * @param f find function
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): Promise<T | undefined>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): Promise<FlatForInternalFn<T> | undefined>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => Promise<FlatForInternalFn<T> | undefined>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => Promise<T | undefined>;
}

export const findLast: FindLast = curry(async (fn: any, iter: Iter<any>): Promise<any> => {
    const arr = await _collectArray(iter);
    for (let i = arr.length - 1; i >= 0; --i) {
        if (await fn(arr[i])) {
            return arr[i];
        }
    }
    // return undefined;
});
