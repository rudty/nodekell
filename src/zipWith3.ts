import { curry } from "./curry";
import { seq } from "./seq";
import { _zipWith } from "./internal/runtime";
import { Iter, _Func3, CurriedFunction3, CurriedFunction2, _FlatFunc3, ExtractPromise } from "./internal/typeTraits";

export interface ZipWith3Type {
    /**
     * zip iterator
     * **Note**
     * - if you want high quality type, use type assertion
     * ```ts
     * const a = [1, 2, 3, 4];
     * const b = 'abcd';
     * const c = [5, 6, 7, 8];
     * const r = F.zipWith3((a, b, c) => [a, b, c] as [number, string, number]);
     * ```
     * @example
     * const a = [1,2,3];
     * const b = [4,5,6];
     * const c = [7,8,9];
     * const z = F.zipWith3((f,s,t)=>f+s+t, a, b,c);
     * const arr = await F.collect(z);
     * console.log(arr);
     * //print [12,15,18]
     * @param f flat function
     * @param iter1 any iterator
     * @param iter2 any iterator
     * @param iter3 any iterator
     */
    <T, Y, Z, R>(f: _Func3<T, Y, Z, R>, iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>, iter3: Iter<Z | Promise<Z>>): AsyncIterableIterator<R>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: _FlatFunc3<T, Y, Z, R>, iter1: T, iter2: Y, iter3: Z): AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: _FlatFunc3<T, Y, Z, R>, iter1: T, iter2: Y): (iter3: Z) => AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: _FlatFunc3<T, Y, Z, R>, iter1: T): CurriedFunction2<Y, Z, AsyncIterableIterator<ExtractPromise<R>>>;
    <T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: _FlatFunc3<T, Y, Z, R>): CurriedFunction3<T, Y, Z, AsyncIterableIterator<ExtractPromise<R>>>;
    <T, Y, Z, R>(f: _Func3<T, Y, Z, R>, iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): (iter3: Iter<Z | Promise<Z>>) => AsyncIterableIterator<R>;
    <T, Y, Z, R>(f: _Func3<T, Y, Z, R>, iter1: Iter<T | Promise<T>>): CurriedFunction2<Iter<Y | Promise<Y>>, Iter<Z | Promise<Z>>, AsyncIterableIterator<R>>;
    <T, Y, Z, R>(f: _Func3<T, Y, Z, R>): CurriedFunction3<Iter<T | Promise<T>>, Iter<Y | Promise<Y>>, Iter<Z | Promise<Z>>, AsyncIterableIterator<R>>;
}

export const zipWith3: ZipWith3Type = curry(async function *(f: any, a: any, b: any, c: any) {
    yield* <any> _zipWith(f, [seq(a), seq(b), seq(c)]);
});
