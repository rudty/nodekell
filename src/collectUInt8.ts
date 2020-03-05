import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface CollectUInt8Type {
    /**
     * collect native array(unsigned char)
     * support async generator(collect + Uint8Array.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectUint8(arr);
     * console.log(c);
     * //print Uint8Array [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Uint8Array>;
}
export const collectUint8: CollectUInt8Type = _collectNativeArray(Uint8Array);
