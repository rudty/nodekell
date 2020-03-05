import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface CollectInt16Type {
    /**
     * collect native array(short)
     * support async generator(collect + Int16Array.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectInt16(arr);
     * console.log(c);
     * //print Int8Array [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Int16Array>;
}
export const collectInt16: CollectInt16Type = _collectNativeArray(Int16Array);
