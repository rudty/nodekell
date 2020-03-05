import { _ArrayList } from "../ArrayList";

/**
 * Int32Array.from does not support async generator
 *
 * collect<T>
 * native number
 *
 * @param ctor native array constructor
 */
export const _collectNativeArray = (ctor: any) => async (iter: any) => {
    const arr = new _ArrayList(ctor);
    for await (const e of iter) {
        arr.add(e);
    }
    return arr.toArray();
};
