import { curry } from "./curry";
import { Iter, _Predicate, _FlatPredicate } from "./internal/typeTraits";

export interface Every {
    /**
     * Calls the function on all items and checks to see if they return true.
     * @example
     * const a = [1,2,3,4,5];
     * const r = await F.every(e => e  >= 0, a); // all elem >= 0 return true
     * console.log(r); // true
     * @param f match function (elem: T): boolean
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): Promise<boolean>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): Promise<boolean>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => Promise<boolean>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
}

export const every: Every = curry(async (f: (elem: any) => boolean | Promise<boolean>, iter: Iter<any>): Promise<boolean> => {
    for await (const e of iter) {
        if (!(await f(e))) {
            return false;
        }
    }
    return true;
});
