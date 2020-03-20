import { curry } from "./curry";
import { zipWith3 } from "./zipWith3";
import { Iter, CurriedFunction2, FlatForInternalFn } from "./internal/typeTraits";
export interface Zip3FunctionType {
    /**
     * zip iterator
     * @example
     * const a = [1,2,3];
     * const b = [4,5,6];
     * const c = [7,8,9];
     * const z = F.zip3(a,b,c);
     * const arr = await F.collect(z);
     * for (const e of arr) {
     *     console.log(e);
     * }
     * // print
     * // [1,4,7]
     * // [2,5,8]
     * // [3,6,9]
     * @param iter1 any iterator
     * @param iter2 any iterator
     * @param iter3 any iterator
     */
    <T, Y, Z>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>, iter3: Iter<Z | Promise<Z>>): AsyncIterableIterator<[T, Y, Z]>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>>(iter1: T, iter2: Y, iter3: Z): AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>, FlatForInternalFn<Z>]>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>>(iter1: T, iter2: Y): (iter3: Z) => AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>, FlatForInternalFn<Z>]>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>>(iter1: T): CurriedFunction2<Y, Z, AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>, FlatForInternalFn<Z>]>>;
    <T, Y, Z>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): (iter3: Iter<Z | Promise<Z>>) => AsyncIterableIterator<[T, Y, Z]>;
    <T, Y, Z>(iter1: Iter<T | Promise<T>>): CurriedFunction2<Iter<Y | Promise<Y>>, Iter<Z | Promise<Z>>, AsyncIterableIterator<[T, Y, Z]>>;
}

export const zip3 = curry((iter1: any, iter2: any, iter3: any) => zipWith3((elem1, elem2, elem3) => [elem1, elem2, elem3], iter1, iter2, iter3));
