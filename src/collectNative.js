import { _ArrayList } from "./ArrayList";

/**
 * collect<T>
 * native number
 * 
 * @param {T} ctor 
 */
const _collectNativeArray = (ctor) => async (iter) => {
    const arr = new _ArrayList(ctor);
    for await (const e of iter) {
        arr.add(e);
    }
    return arr.toArray();
};

export const collectInt8 = _collectNativeArray(Int8Array);
export const collectInt16 = _collectNativeArray(Int16Array);
export const collectInt32 = _collectNativeArray(Int32Array);
export const collectUint8 = _collectNativeArray(Uint8Array);
export const collectUint16 = _collectNativeArray(Uint16Array);
export const collectUint32 = _collectNativeArray(Uint32Array);
export const collectUint8Clamped = _collectNativeArray(Uint8ClampedArray);
