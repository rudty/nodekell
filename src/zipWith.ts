import { curry } from "./curry";
import { seq } from "./seq";
import { _zipWith } from "./internal/runtime";
import { Iter, _Func1, _Func2, _FlatFunc2, ExtractPromise, CurriedFunction2 } from "./internal/typeTraits";

export interface ZipWithType {
    /**
     * zip iterator
     * **Note**
     * - if you want high quality type, use type assertion
     * ```ts
     * const a = [1, 2, 3, 4];
     * const b = 'abcd';
     * const r = F.zipWith((a, b) => [a, b] as [number, string]);
     * ```
     * @example
     * const a = [{id:1}, {id:2}];
     * const b = [{name:"a"}, {name:"b"}];
     *
     * const myZip = (f, s) => {
     *     return [f.id, s.name];
     * };
     *
     * const z = F.zipWith(myZip,a, b);
     * const arr = await F.collect(z);
     * for (const e of arr) {
     *     console.log(e);
     * }
     * // print
     * // [1,"a"]
     * // [2,"b"]
     * @param f zip function
     * @param iter1 any iterator
     * @param iter2 any iterator
     */
    <T, Y, R>(f: _Func2<T, Y, R>, iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<R>;
    <T extends Iter<any>, Y extends Iter<any>, R>(f: _FlatFunc2<T, Y, R>, iter1: T, iter2: Y): AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, Y extends Iter<any>, R>(f: _FlatFunc2<T, Y, R>, iter1: T): (iter2: Y) => AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, Y extends Iter<any>, R>(f: _FlatFunc2<T, Y, R>): CurriedFunction2<T, Y, AsyncIterableIterator<ExtractPromise<R>>>;
    <T, Y, R>(f: _Func2<T, Y, R>, iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<R>;
    <T, Y, R>(f: _Func2<T, Y, R>): CurriedFunction2<Iter<T | Promise<T>>, Iter<Y | Promise<Y>>, AsyncIterableIterator<R>>;
}

export const zipWith: ZipWithType = curry(async function *(f: any, a: any, b: any) {
    yield* <any> _zipWith(f, [seq(a), seq(b)]);
});
