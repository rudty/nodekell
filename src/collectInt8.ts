import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface CollectInt8Type {
    /**
     * collect native array(char)
     * support async generator(collect + Int8Array.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectInt8(arr);
     * console.log(c);
     * //print Int8Array [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Int8Array>;
}
export const collectInt8: CollectInt8Type = _collectNativeArray(Int8Array);
