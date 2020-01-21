import { seq } from "./seq";
import { curry } from "./curry";
import { _removeIteratorElements } from "./internal/runtime";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";
export interface Drop {
    /**
     * drop first element
     * @example
     * const a0 = [1,2,3,4,5];
     * const r0 = F.drop(3, a0)
     * const result0 = await F.collect(r0);
     * console.log(result0); // print [4, 5]
     *
     * const a1 = [1,2,3,4,5];
     * const r1 = F.drop(Infinity, a1)
     * const result1 = await F.collect(r1);
     * console.log(result1); // print []
     * @param count drop count
     * @param iter any iterator
     */
    <T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}
export const drop: Drop = curry(async function *(count: number, iter: Iter<any>): AsyncIterableIterator<any> {
    const g = seq(iter);
    await _removeIteratorElements(g, count);
    yield* g;
});
