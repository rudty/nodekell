import { curry } from "./curry";
import { Iter, _Func1, _FlatFunc1, FlatForInternalFn } from "./internal/typeTraits";

export interface PeekType {
    /**
     * function that perform a function on each element like a map but returns the original instead of the result
     * this function is useful for debugging.
     * @example
     * const v = await F.run([1,2,3,4,5],
     *     F.map(e => e + 1),
     *     F.peek(console.log),
     *     F.map(e => e + 1),
     *     F.collect);
     * // print
     * // 2
     * // 3
     * // 4
     * // 5
     * // 6
     * @param f peek function
     * @param iter any iterator
     */
    <T>(f: _Func1<T, any>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatFunc1<T, any>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatFunc1<T, any>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Func1<T, any>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const peek: PeekType = curry(async function *(f: any, iter: any) {
    for await (const e of iter) {
        await f(e);
        yield e;
    }
});
