import { curry } from "./curry";
import { Iter, ExtractPromise, _Func1 } from "./internal/typeTraits";
import { PFlat } from "types/utils";

export interface FMap {
    /**
     * flattern iterator
     * @example
     * const a = [[1],[2],[3],[4],[5]];
     * const f = F.fmap(e => e, a);
     * console.log(await F.collect(f)); // print [1,2,3,4,5]
     * @param f flat function
     * @param iter nested iterator
     */
    <T, R = T>(f: _Func1<ExtractPromise<T>, R>, iter: Iter<T>): AsyncIterableIterator<PFlat<ExtractPromise<R>>>;
    <T, R = ExtractPromise<T>>(f: _Func1<ExtractPromise<T>, R>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;
    <T, R = T>(f: _Func1<ExtractPromise<T>, R>): (iter: Iter<T>) => AsyncIterableIterator<PFlat<ExtractPromise<R>>>;
    <T, R = ExtractPromise<T>>(f: _Func1<ExtractPromise<T>, R>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;
}
export const fmap: FMap = curry(async function *(fn: any, iter: any) {
    for await (const e of iter) {
        yield* await fn(e);
    }
});
