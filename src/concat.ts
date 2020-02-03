import { curry } from "./curry";
import { _flatOnce } from "./internal/iterable";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";

export interface Concat {
    /**
     * combines two iterables
     * @example
     * const c = F.concat([1,2,3],[4,5,6]);
     * for await(const e of c) {
     *     console.log(e);
     * }
     * // print [1,2,3,4,5,6]
     * @param iter1 any iterator
     * @param iter2 any iterator
     */
    <T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<T | Y>;
    <T extends Iter<any>, Y extends Iter<any>>(iter1: T, iter2: Y): AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
    <T extends Iter<any>, Y extends Iter<any>>(iter1: T): (iter2: Y) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
    <T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<T | Y>;
}
export const concat = curry(async function *(a: Iter<any>, b: Iter<any>) {
    yield* _flatOnce(a);
    yield* _flatOnce(b);
});
