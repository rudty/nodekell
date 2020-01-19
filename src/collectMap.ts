import { _collectArray } from "./internal/collectArray";
import { Iter } from "./internal/typeTraits";

export interface CollectMap {
    /**
     * @example
     * const a = [[1,2],[3,4]];
     * const m = await F.collectMap(a); // new Map([[1,2],[3,4]])
     * for(const [k,v] of m) {
     *     console.log(k, v);
     * }
     * // print
     * // 1 2
     * // 3 4
     *
     * // if want you high quality type, use type assertion
     * const a = [['a', 0], ['b', 1]] as [string, number][];
     * const r = await collectMap(a); // Map<string, number>
     * @param iter any iterator
     */
    <T extends any[]>(iter: Iter<T | Promise<T>>): Promise<Map<T[0], T[1]>>;
}
export const collectMap: CollectMap = async (iter: Iter<any>) => new Map((<[any, any]> (await _collectArray(iter))));
