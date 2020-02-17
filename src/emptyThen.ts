import { curry } from "./curry";
import { _takeValue } from "./internal/runtime";
import { _flatOnce } from "./internal/iterable";
import { Iter, ExtractPromise, FlatForInternalFn } from "./internal/typeTraits";

export interface EmptyThen {
    /**
     * take supply if empty
     * @example
     * const v = await F.run(F.range(Infinity),
     *             F.take(0), // take 0
     *             F.emptyThen([1,2,3,4,5]), // new array
     *             F.map(e => e + 1), // 2,3,4,5,6
     *             F.collect);
     * console.log(v); // 2,3,4,5,6
     *
     * @param supply take from supply if iter is empty
     * @param iter any iterator
     */
    <T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
    <T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>), iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T> | ExtractPromise<Y>>;
    <T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
    <T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>, iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T> | ExtractPromise<Y>>;
    <T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
    <T, Y>(supply: Iter<Y> | Promise<Iter<Y>>, iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T> | ExtractPromise<Y>>;
    <T extends Iter<any>, Y extends Iter<any>>(supply: () => (Y | Promise<Y>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
    <T extends Iter<any>, Y extends Iter<any>>(supply: Promise<() => (Y | Promise<Y>)>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
    <T extends Iter<any>, Y extends Iter<any>>(supply: Y): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
    <T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
    <T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>)): (iter: Iter<T>) => AsyncIterableIterator<ExtractPromise<T> | ExtractPromise<Y>>;
    <T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
    <T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>): (iter: Iter<T>) => AsyncIterableIterator<ExtractPromise<T> | ExtractPromise<Y>>;
    <T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
    <T, Y>(supply: Iter<Y> | Promise<Iter<Y>>): (iter: Iter<T>) => AsyncIterableIterator<ExtractPromise<T> | ExtractPromise<Y>>;
}

export const emptyThen: EmptyThen = curry(async function *(supply: any, iter: any) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }

    yield* _flatOnce(_takeValue(supply));
});
