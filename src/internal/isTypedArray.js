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