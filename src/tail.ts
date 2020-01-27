import { seq } from "./seq";
import { _mustNotEmptyIteratorResult } from "./internal/runtime";
import { Iter, ExtractPromise } from "./internal/typeTraits";

export interface Tail {
    /**
     * get from the second
     * warning: if use tail for generator, result is not the same
     * @example
     * const a = [1,2,3,4,5];
     * const t = F.tail(a);
     * console.log(await F.collect(t)); // print 2 3 4 5
     * @param iter any iterator
     */
    <T>(iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T>>;
}

export const tail: Tail = async function *(iter: Iter<any>): AsyncIterableIterator<any> {
    const g = seq(iter);
    const f = await g.next();
    _mustNotEmptyIteratorResult(f);
    yield* g;
};
