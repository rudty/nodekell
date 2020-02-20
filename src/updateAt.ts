import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";
import { seq } from "./seq";
import { _takeValue } from "./internal/runtime";
import { Iter, ExtractPromise } from "./internal/typeTraits";

export interface UpdateAtType {
    /**
     * Update {iter} to the {index} position of {iter} received as an argument.
     *
     * @example
     *      const arr = [1,2,3,4,5];
     *      const u = F.updateAt(
     *          99, // update value
     *          0,  // index
     *          arr // iterator
     *      );
     *      for await (const e of u) {
     *          console.log(e);
     *      }
     *      //print
     *      // 99
     *      // 2
     *      // 3
     *      // 4
     *      // 5
     * @param value add value
     * @param index add index
     * @param iter any iterable
     * @returns new AsyncIterator
     */
    <T>(value: T | Promise<T>, index: number, iter: Iter<T>): AsyncIterableIterator<T>;
    <T>(value: T, index: number): (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
    <T>(value: T): (index: number) => (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
}

export const updateAt: UpdateAtType = curry(async function *(value: any, index: any, iter: any) {
    let i = 0;
    const g = seq(iter);
    for await (const e of g) {
        if (i++ === index) {
            yield value;
            yield* g;
            return;
        } else {
            yield e;
        }
    }
});
