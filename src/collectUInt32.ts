import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface CollectUInt32Type {
    /**
     * collect native array(unsigned short)
     * support async generator(collect + Uint32Array.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectUint32(arr);
     * console.log(c);
     * //print Uint32Array [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Uint32Array>;
}
export const collectUint32: CollectUInt32Type = _collectNativeArray(Uint32Array);