import { curry } from "./curry";
import { Iter, FlatForInternalFn, CurriedFunction2 } from "./internal/typeTraits";

export interface Foldl {
    <T, U>(f: (acc: U, elem: T) => (U | Promise<U>), init: U | Promise<U>, iter: Iter<T | Promise<T>>): Promise<U>;
    <T extends Iter<any>, U>(f: (acc: U, elem: FlatForInternalFn<T>) => (U | Promise<U>), init: U | Promise<U>, iter: T): Promise<U>;
    <T extends Iter<any>, U>(f: (acc: U, elem: FlatForInternalFn<T>) => (U | Promise<U>), init: U | Promise<U>): (iter: T) => Promise<U>;
    <T extends Iter<any>, U>(f: (acc: U, elem: FlatForInternalFn<T>) => (U | Promise<U>)): CurriedFunction2<U | Promise<U>, T, Promise<U>>;
    <T, U>(f: (acc: U, elem: T) => (U | Promise<U>), init: U | Promise<U>): (iter: Iter<T | Promise<T>>) => Promise<U>;
    <T, U>(f: (acc: U, elem: T) => (U | Promise<U>)): CurriedFunction2<U | Promise<U>, Iter<T | Promise<T>>, Promise<U>>;
}

/**
 * Call function for all the elements in an iterator
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = foldl((acc, e) => acc + e, 0, a);
 * console.log(sum); // print 15
 *
 * @param f (acc: T1, elem: T2) => (T1 | Promise<T1>)
 * @param z initial value
 * @param iter any iterable
 */
export const foldl: Foldl = curry(async (f: any, z: any, iter: Iter<any>) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});
