import { _collectNativeArray } from "./internal/collectNative";
import { Iter } from "./internal/typeTraits";

export interface collectUint8ClampedType {
    /**
     * collect native array(unsigned char)
     * support async generator(collect + Uint8ClampedArray.from)
     * if the element is not a number, 0 is assigned
     * @example
     * const arr = [1,2,3,4];
     * const c = await F.collectUint8Clamped(arr);
     * console.log(c);
     * //print Uint8ClampedArray [ 1, 2, 3, 4 ]
     * @param iter iterator or async iterator
     */
    (iter: Iter<number | Promise<number>>): Promise<Uint8ClampedArray>;
}
export const collectUint8Clamped: collectUint8ClampedType = _collectNativeArray(Uint8ClampedArray);
