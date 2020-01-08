import { Iter, ExtractPromise } from "./internal/typeTraits";

const _seq = async function *(iter: Iter<any>) {
    for await (const e of iter) {
        yield e;
    }
};

/**
 * make iterable(array, set, map, any iteratorable object) to asyncIterator 
 * @example
 * const a = [1,2,3,4,5];
 * for await(const e of F.seq(a)) {
 *     console.log(e);
 * }
 * @params iter any iterator
 * @returns async iterator
 */
export function seq<T>(iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T>>;
export function seq<T>(iter: any): AsyncIterableIterator<ExtractPromise<T>> {
    const it = iter[Symbol.asyncIterator];
    if (it) {
        return it.call(iter);
    }
    return _seq(iter);
};
