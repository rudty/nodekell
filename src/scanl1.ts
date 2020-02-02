import { curry } from "./curry";
import { seq } from "./seq";
import { scanl } from "./scanl";
import { Iter, _FlatBiFunction, FlatForInternalFn } from "./internal/typeTraits";

export interface Scanl1 {
    /**
     * call scanl(fn, head(iter), tail(iter));
     * @example
     * const s = F.scanl((a,b) => a + b, [1,2,3]);
     * const r = await F.collect(s);
     * console.log(r);
     * // print [1,3,6]
     * @param f scan function
     * @param iter any iterator
     */
    <T>(f: _FlatBiFunction<T, T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatBiFunction<T, T>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatBiFunction<T, T>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _FlatBiFunction<T, T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const scanl1 = curry(async function *(f: any, iter: Iter<any>) {
    const g = seq(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});
