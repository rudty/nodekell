import { _isTypedArray } from "./isTypedArray";

/**
 * is array like object
 * if not an Array, must have at least one element
 * @param {ArrayLike} any 
 */
export const _isArrayLike = (a) => Array.isArray(a) || _isTypedArray(a);