import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";

export interface TakeLast {
    /**
     * take last n element
     * @example
     * const arr = [1,2,3,4,5];
     * const r = F.takeLast(2, arr); // last 2 elem
     * for await (const e of r) {
     *  console.log(e);
     * }
     * // print
     * // 4
     * // 5
     * @param count take count
     * @param iter any iterable
     */
    <T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const takeLast: TakeLast = curry(async function *(count: number, iter: Iter<any>): AsyncIterableIterator<any> {
    const q = new _Queue();
    const g = await _fetchAndGetIterator(count, iter, (e) => q.add(e));

    for await (const e of g) {
        q.add(e);
        q.poll();
    }

    yield* q.removeIterator();
});
