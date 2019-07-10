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
 * @param {any} a 
 */
export const _isObjectArray = (a) => {
    if (Number.isSafeInteger(a.length)) {
        return _isObjectArrayCheckProps(a);
    }
    return false;
};

export const _isString = (a) => a.constructor === String;

const _isArrayLike = (a) => (Array.isArray(a) || _isTypedArray(a) || _isObjectArray(a));

/**
 * is array like object
 * @param {ArrayLike} any 
 */
export const _isReadableArrayLike = (a) => _isString(a) || _isArrayLike(a);

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
    !(_isString(a)) &&
    !(Object.isFrozen(a)) &&
    _isArrayLike(a);

// const _emptyAsyncGenerator = async function *(){};
// const _asyncGeneratorConstructor = _emptyAsyncGenerator().constructor;

// export const _isAsyncGenerator = (a) => 
//     a.constructor === _asyncGeneratorConstructor &&
//     a.toString() === "[object AsyncGenerator]";

export const _toIterator = (a) => {
    const it = a[Symbol.iterator];
    if (it) {
        return it.call(a);
    }

    const ait = a[Symbol.asyncIterator];
    if (ait) {
        return ait.call(a);
    }

    //return undefined;
}
