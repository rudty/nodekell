import { _isFunction, Iter, ExtractPromise } from "./typeTraits";

const parallel_default_fetch_count = 100;
let parallel_global_fetch_count = parallel_default_fetch_count;

/**
 * Iterator and AsyncIterator don't calculate until the value is fetched
 * take it {count} the effect of calculating in parallel.
 *
 * not parallel functions: Promise -> execute -> Promise -> execute
 *
 * parallel functions: Promise -> Promise -> Promise... (execute all)
 *
 * @param count take count
 */
export const parallel_set_fetch_count_internal = (count: number) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("parallel_fetch_count > 0 required");
    }
    parallel_global_fetch_count = count || parallel_default_fetch_count;
};

export const parallel_get_fetch_count_internal = () => parallel_global_fetch_count;

/**
 * Get the value.
 * If it's a Promise, it gets its value from Promise
 * Then call the function if the value is a function.
 * @param v any
 */
export const _takeValue = async (v: any) => {
    v = await v;

    if (_isFunction(v)) {
        v = await v();
    }

    return v;
};

/**
 * Remove N elements of iterator
 *
 * @param iter any iterator
 * @param count removeCount
 */
export const _removeIteratorElements = async <T>(iter: IterableIterator<T> | AsyncIterator<T>, count: number = Infinity): Promise<(ExtractPromise<T>)[] | any> => {
    if (!iter) {
        return;
    }
    const awaiter = [];
    for (let i = 0; i < count; ++i) {
        const e = await iter.next();
        if (e.done) {
            break;
        }
        awaiter.push(e.value);
    }
    return Promise.all(awaiter);
};

/**
 * zip elements
 *  arr = [[1,2,3],[4,5,6]]
 *  result => [[1,4],[2,5],[3,6]]
 *
 * @param f zipFunction
 * @param arr zipArray
 */
export const _zipWith = async function *(f: (a: any) => any, arr: (Iterator<any> | AsyncIterator<any>)[]): AsyncIterator<any> {
    while (true) {
        const elems = await Promise.all(arr.map((e) => e.next()));
        for (const e of elems) {
            if (e.done) {
                return;
            }
        }
        yield f.apply(null, elems.map((e) => e.value));
    }
};

/**
 * throw if value is empty IteratorResult
 *
 * 1. { done: true }
 *  => throw
 *
 * 2. 1
 *  => pass
 *
 * 3. { value: undefined, done: false }
 *  => pass
 *
 * 4. undefined
 *  => pass
 *
 * @param a any object
 */
export const _mustNotEmptyIteratorResult = (a: any) => {
    if (!a) {
        throw new Error("error iter result");
    }

    if (a.done) {
        throw new Error("empty iter");
    }
};
