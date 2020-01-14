import { _collectArray } from "./internal/collectArray";
import { Iter, ExtractPromise } from "./internal/typeTraits";
export interface Reverse {
    <T>(iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T>>;
}

/**
 * reverse iterator
 * @example
 * const a = [1,2,3,4,5];
 * const t = F.reverse(a);
 * console.log(await F.collect(t)); // print 5,4,3,2,1
 * @param iter any iterator
 */
export const reverse: Reverse = async function *(iter: Iter<any>): AsyncIterableIterator<any> {
    const a = await _collectArray(iter);
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};