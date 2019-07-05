/**
 * check 
 * 
 * Int8Array
 * Int16Array 
 * Int32Array
 * Uint8Array
 * Uint8ClampedArray
 * Uint16Array
 * Uint32Array
 * Float32Array
 * Float64Array
 * 
 * @param {any} a 
 * @returns {bool} true if isTypedArray else false
 */
export const _isTypedArray = (a) => ArrayBuffer.isView(a) && !(a instanceof DataView);

export const _isWriteArrayLike = (a) => Array.isArray(a) || _isTypedArray(a);
/**
 * is array like object
 * if not an Array, must have at least one element
 * Array, TypedArray, String
 * @param {ArrayLike} any 
 */
export const _isReadArrayLike = (a) => {
    if(_isWriteArrayLike(a) || a.constructor === String) {
        return true;
    }

    const len = a.length;
    if (Number.isSafeInteger(len)) {
        if (len === 1) {
            return Object.keys(a).length === 1;
        } else {
            return (a.length - 1) in a;
        }
    }
    return false;
}
        
