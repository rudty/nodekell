import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface CollectInt32Type {
    /**
     * collect native array(int32)
     * support async generator(collect + Int32Array.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectInt32(arr);
     * console.log(c);
     * //print Int32Array [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Int32Array>;
}
export const collectInt32: CollectInt32Type = _collectNativeArray(Int32Array);
