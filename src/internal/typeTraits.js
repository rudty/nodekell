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
 * @param {Object} a 
 * @returns {bool} true if isTypedArray else false
 */
export const _isTypedArray = (a) => ArrayBuffer.isView(a) && !(a instanceof DataView);

/**
 * (a.hasOwnProperty) can be override 
 * call Object prototype 
 * @param {ArrayLike} a any object
 */
const _isObjectArrayCheckProps = (a) => {
    if (a.length === 0) {
        return Object.keys(a).length === 1; 
    }
    return Object.prototype.hasOwnProperty.call(a, (a.length - 1)); 
};

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
 * @param {Object} a 
 */
export const _isObjectArray = (a) => {
    if (Number.isSafeInteger(a.length)) {
        return _isObjectArrayCheckProps(a);
    }
    return false;
};

export const _isString = (a) => a.constructor === String;

export const _isArrayLike = (a) => (Array.isArray(a) || _isTypedArray(a) || _isObjectArray(a));

/**
 * is array like object
 * @param {ArrayLike} any 
 */
export const _isReadableArrayLike = (a) => a && (_isString(a) || _isArrayLike(a));

/**
 * is array like object and writable
 * 
 * Object.isFrozen("string") => true
 * Object.isFrozen(new String("string")) => false
 * 
 * but.. (new String()) cannot modify
 * 
 * @param {ArrayLike} a 
 */
export const _isWritableArrayLike = (a) => 
    a &&
    !(_isString(a)) &&
    !(Object.isFrozen(a)) &&
    _isArrayLike(a);

export const _hasIterator = (a) => a[Symbol.iterator] || a[Symbol.asyncIterator];

/**
 * function is 
 * () => {...}
 */
export const _isFunction = (a) => a && a.constructor === Function;

export const mustEvenArguments = (arr) => {
    if ((arr.length) & 1) {
        throw new Error("requires an even arguments");
    }
};