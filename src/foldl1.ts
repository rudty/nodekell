import { curry } from "./curry";
import { _headTail } from "./internal/headTail";
import { Iter, FlatForInternalFn, _BiFunction, _FlatBiFunction } from "./internal/typeTraits";
import { foldl } from "./foldl";

export interface Foldl1 {
    <T>(f: _BiFunction<T, T>, iter: Iter<T | Promise<T>>): Promise<T>;
    <T extends Iter<any>>(f: _FlatBiFunction<T, T>, iter: T): Promise<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatBiFunction<T, T>): (iter: T) => Promise<FlatForInternalFn<T>>;
    <T>(f: _BiFunction<T, T>): (iter: Iter<T | Promise<T>>) => Promise<T>;
}

/**
 * take 1 items and call foldl
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = await F.foldl1((acc, e) => acc + e, a);
 * console.log(sum); // print 15;
 *
 * @param f (acc: T, elem: T) => (T | Promise<T>)
 * @param iter any iterator
 */
export const foldl1: Foldl1 = curry(async (f: any, iter: Iter<any>) => {
    const [head, tail] = await _headTail(iter);
    return foldl(f, head, tail);
});
