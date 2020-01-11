import { curry } from "./curry";
import { Iter, FlatForInternalFn, _Predicate, _FlatPredicate } from "./internal/typeTraits";
export interface FilterNot {
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const filterNot: FilterNot = curry(async function *(fn: any, iter: Iter<any>): AsyncIterableIterator<any> {
    for await (const e of iter) {
        if (!(await fn(e))) {
            yield e;
        }
    }
});
