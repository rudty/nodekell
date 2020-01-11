import { curry } from "./curry";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";

export interface Filter {
    <T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const filter: Filter = curry(async function *(fn: any, iter: Iter<any>): AsyncIterableIterator<any> {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});
