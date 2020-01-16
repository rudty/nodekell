import { distinctBy } from "./distinctBy";
import { identity } from "./identity";
import { Iter, ExtractPromise } from "./internal/typeTraits";
export interface Distinct {
    /**
     * distinct
     * @example
     * const a = [1,2,1,2,2,3];
     * const r = F.distinct(a);
     * const result = await F.collect(r);
     * console.log(result); // print 1,2,3
     * @param iter any iterator
     */
    <T>(iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T>>;
}

export const distinct: Distinct = <T>(iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T>> => distinctBy(identity, iter);
