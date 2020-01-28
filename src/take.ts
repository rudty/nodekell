import { curry } from "./curry";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";
export interface Take {
    /**
     * take N elemnt
     * @example
     * const a = [1,2,3,4,5];
     * const t = F.take(3, a);
     * console.log(await F.collect(t)); // print 1 2 3
     *
     * const v = await F.run(
     *     F.range(Infinity),
     *     F.take(2),
     *     F.collect
     * );
     * console.log(v); // print 0 1
     * @param count take count
     * @param iter any iterator
     */
    <T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const take: Take = curry(async function *(count: number, iter: Iter<any>): AsyncIterableIterator<any> {
    let it = 0;
    for await (const e of iter) {
        ++it;
        if (it > count) {
            break;
        }
        yield e;
    }
});
