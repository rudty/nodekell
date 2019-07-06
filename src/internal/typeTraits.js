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

/**
 * const o = {
 *      0: 1,
 *      1: 2,
 *      2: 3,
 *      length: 3
 * };
 * console.log(Array.from(o)); 
 * //print [1,2,3]
 * 
 * @param {any} a 
 */
const _isObjectArray = (a) => {
    const len = a.length;
    if (Number.isSafeInteger(len)) {
        if (len === 1) {
            return Object.keys(a).length === 1;
        } else {
            return Object.prototype.hasOwnProperty.call(a, (a.length - 1));
        }
    }
    return false;
};

const _isArrayLike = (a) => (Array.isArray(a) || _isTypedArray(a) || _isObjectArray(a));

/**
 * is array like object
 * @param {ArrayLike} any 
 */
export const _isReadableArrayLike = (a) => a.constructor === String || _isArrayLike(a);

/**
 * is array like object and writable
 * @param {ArrayLike} a 
 */
export const _isWritableArrayLike = (a) => a.constructor !== String && _isArrayLike(a);
