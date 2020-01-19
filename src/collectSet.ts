import { _collectArray } from "./internal/collectArray";
import { Iter, ExtractPromise } from "./internal/typeTraits";
export interface CollectSet {
    /**
     * @example
     * const a = [1,2,3,1,2,3];
     * const m = await F.collectSet(a); //new Set([1,2,3])
     * for(const e of m) {
     *     console.log(e);
     * }
     * // print
     * // 1
     * // 2
     * // 3
     */
    <T>(iter: Iter<T>): Promise<Set<ExtractPromise<T>>>;
}

export const collectSet: CollectSet = async (iter: Iter<any>): Promise<Set<any>> => new Set(<any> (await _collectArray(iter)));
