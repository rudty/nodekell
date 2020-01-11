import { curry } from "./curry";
import { Iter, FlatForInternalFn, _IndexedPredicate, _IndexedFlatPredicate } from "./internal/typeTraits";

export interface FilterIndexed {
    <T>(f: _IndexedPredicate<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _IndexedFlatPredicate<T>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _IndexedFlatPredicate<T>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _IndexedPredicate<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const filterIndexed: FilterIndexed = curry(async function *(fn: any, iter: any): AsyncIterableIterator<any> {
    let i = 0;
    for await (const e of iter) {
        if (await fn(i++, e)) {
            yield e;
        }
    }
});
