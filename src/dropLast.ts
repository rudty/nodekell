import { curry } from "./curry";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/iterable";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";

export interface DropLast {
    /**
     * drop last element
     * @example
     * const a = [1,2,3,4,5];
     * const dropIter = F.dropLast(1, a);
     * for await (const e of dropIter) {
     *      console.log(e);
     * }
     * print
     * 1
     * 2
     * 3
     * 4
     * @param count drop count
     * @param iter any iterator
     */
    <T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const dropLast: DropLast = curry(async function *(count: number, iter: Iter<any>): AsyncIterableIterator<any> {
    const q: any = new _Queue();
    const g = await _fetchAndGetIterator(count, iter, q.add.bind(q));

    while (true) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        q.add(e.value);
        yield q.poll();
    }
});
