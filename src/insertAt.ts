import { _flatOnce } from "./internal/iterable";
import { curry } from "./curry";
import { ExtractPromise, Iter } from "./internal/typeTraits";

export interface InsertAtType {
    /**
     * Add {iter} to the {index} position of {iter} received as an argument.
     * If {index} is greater than the length of {iter}, it is added to the end of {iter}.
     * @param value add value
     * @param index add index
     * @param iter any iterable
     */
    <T>(value: T | Promise<T>, index: number, iter: Iter<T>): AsyncIterableIterator<T>;
    <T>(value: T, index: number): (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
    <T>(value: T): (index: number) => (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
}

export const insertAt = curry(async function *(value: any, index: any, iter: any) {
    let i = 0;
    for await(const e of iter) {
        if (i++ === index) {
            yield* _flatOnce(value);
        }
        yield e;
    }

    if (i <= index) {
        yield* _flatOnce(value);
    }
});
