import { curry } from "./curry";
import { Iter, _Func1, ExtractPromise, _FlatFunc1 } from "./internal/typeTraits";

export interface MapType {
    <T, R>(f: _Func1<T, R>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
    <T extends Iter<any>, R>(f: _FlatFunc1<T, R>, iter: T): AsyncIterableIterator<ExtractPromise<R>>;
    <T extends Iter<any>, R>(f: _FlatFunc1<T, R>): (iter: T) => AsyncIterableIterator<ExtractPromise<R>>;
    <T, R>(f: _Func1<T, R>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
}

export const map: MapType = curry(async function *(fn: any, iter: Iter<any>): AsyncIterableIterator<any> {
    for await (const e of iter) {
        yield fn(e);
    }
});
