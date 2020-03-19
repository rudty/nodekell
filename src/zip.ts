import { curry } from "./curry";
import { zipWith } from "./zipWith";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";
export interface ZipFunctionType {
    /**
     * zip iterator
     * @example
     * const a = [1,2,3,4,5];
     * const b = [6,7,8,9,10];
     * const z = F.zip(a, b);
     * const arr = await F.collect(z);
     * for (const e of arr) {
     *     console.log(e);
     * }
     * // print
     * // [1,6]
     * // [2,7]
     * // [4,9]
     * // [5,0]
     * @param iter1 any iterator
     * @param iter2 any iterator
     */
    <T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<[T, Y]>;
    <T extends Iter<any>, Y extends Iter<any>>(iter1: T, iter2: Y): AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>]>;
    <T extends Iter<any>, Y extends Iter<any>>(iter1: T): (iter2: Y) => AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>]>;
    <T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[T, Y]>;
}

export const zip: ZipFunctionType = <any> curry((iter1: any, iter2: any) => zipWith((elem1, elem2) => [elem1, elem2], iter1, iter2));
