import { curry } from "./curry";
import { Iter, _Predicate, _FlatPredicate, FlatForInternalFn } from "./internal/typeTraits";
export interface Find {
    /**
     * find first value
     * @example
     * const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
     * const r = await F.find(e => "a" in e , arr);
     * console.log(r); // print {a:"a1"}
     *
     * const arr2 = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
     * const r2 = await F.find(e => "hello" in e , arr2);
     * console.log(r2); // print undefined
     * @param f find function
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): Promise<T | undefined>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): Promise<FlatForInternalFn<T> | undefined>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => Promise<FlatForInternalFn<T> | undefined>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => Promise<T | undefined>;
}

export const find: Find = curry(async (fn: _Predicate<any>, iter: Iter<any>): Promise<any> => {
    for await(const e of iter) {
        if (await fn(e)) {
            return e;
        }
    }
    // return undefined;
});
