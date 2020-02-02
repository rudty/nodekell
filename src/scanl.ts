import { curry } from "./curry";
import { Iter, FlatForInternalFn, CurriedFunction2, _Function2, _FlatFunction2 } from "./internal/typeTraits";

export interface Scanl {
    /**
     * @example
     * const s = F.scanl((a,b) => a + b, 0, [1,2,3]);
     * const r = await F.collect(s);
     * console.log(r);
     * // print [0,1,3,6]
     * @param f scan function
     * @param init init value
     * @param iter any iterator
     */
    <T>(f: _Function2<T, T, T>, init: T | Promise<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatFunction2<T, T, T>, init: FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _Function2<T, T, T>, init: FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _Function2<T, T, T>): CurriedFunction2<FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>, T, AsyncIterableIterator<FlatForInternalFn<T>>>;
    <T>(f: _Function2<T, T, T>, init: T | Promise<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
    <T>(f: _Function2<T, T, T>): CurriedFunction2<T | Promise<T>, Iter<T | Promise<T>>, AsyncIterableIterator<T>>;
}

export const scanl: Scanl = curry(async function *(f: any, z: any, iter: Iter<any>) {
    z = await z;
    yield z;
    for await (const e of iter) {
        z = await f(z, e);
        yield z;
    }
});
