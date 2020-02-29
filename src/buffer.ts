import { curry } from "./curry";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";
export interface BufferType {
    /**
     * creates a list by dividing the iterator at specified interval
     * @example
     * const b = F.buffer(2, [1,2,3,4,5]);
     * const c = await F.collect(b);
     * console.log(c); //print [[1,2],[3,4],[5]]
     * @param supply divide count
     * @param iter any iterator
     */
    <T>(supply: number | Promise<number>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T[]>;
    <T extends Iter<any>>(supply: number | Promise<number>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>[]>;
    <T extends Iter<any>>(supply: number | Promise<number>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>[]>;
    <T>(supply: number | Promise<number>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T[]>;
}

export const buffer: BufferType = curry(async function *(supply: any, iter: any) {
    supply = await supply;

    if (supply <= 0) {
        throw new Error("arg supply > 0 required");
    }

    let c = [];
    for await (const e of iter) {
        const len = c.push(e);
        if (len >= supply) {
            yield c;
            c = [];
        }
    }

    if (c.length !== 0) {
        yield c;
    }
});
