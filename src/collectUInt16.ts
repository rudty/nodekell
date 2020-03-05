import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface CollectUInt16Type {
    /**
     * collect native array(unsigned short)
     * support async generator(collect + Uint16Array.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectUint8(arr);
     * console.log(c);
     * //print Uint16Array [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Uint16Array>;
}
export const collectUint16: CollectUInt16Type = _collectNativeArray(Uint16Array);
