import { curry } from "./curry";
import { Iter, FlatForInternalFn } from "../types/utils";
import { _Predicate, _FlatPredicate } from "./internal/typeTraits";

export interface TakeWhile {
    /**
     * take condition
     * @example
     * const a = [1,2,3,1,2,3];
     * const t = F.takeWhile(e => e < 3, a);
     * console.log(await F.collect(t)); // print 1, 2
     *
     * @param f condition function
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const takeWhile: TakeWhile = curry(async function *(f: _Predicate<any>, iter: Iter<any>): AsyncIterableIterator<any> {
    for await (const e of iter) {
        if (!(await f(e))) {
            break;
        }
        yield e;
    }
});
