import { curry } from "./curry";
import { Iter, _Predicate, _FlatPredicate } from "./internal/typeTraits";

export interface Some {
    /**
     * Returns true if at least one element returns true
     * @example
     * const a = [1,2,3,4,5];
     * const r0 = await F.some(e=> e % 2 == 0, a); //found '2' return
     * console.log(r0); // true
     *
     * const r1 = await F.run(
     *     F.range(Infinity), //[0...Infinity]
     *     F.some(e=> Promise.resolve(e > 100)) // found '101' return
     * );
     * console.log(r1); // true
     *
     * @param f flat function
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): Promise<boolean>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): Promise<boolean>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => Promise<boolean>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
}

export const some: Some = curry(async (f: _Predicate<any>, iter: Iter<any>): Promise<boolean> => {
    for await (const e of iter) {
        if (await f(e)) {
            return true;
        }
    }
    return false;
});
