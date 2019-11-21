import { _isPrimitive } from "./internal/typeTraits";

/**
 * check string, number, bigint, boolean, null, undefined, and symbol.
 * @example
 *      console.log(F.isPrimitive(1)); // true
 *      console.log(F.isPrimitive(0)); // true
 *      console.log(F.isPrimitive({})); // false 
 *      console.log(F.isPrimitive([])); // false 
 */
export const isPrimitive = _isPrimitive;
