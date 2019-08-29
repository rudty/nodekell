import { curry } from "./curry";
import { mergeObject } from "./mergeObject";
/**
 * Create a new object by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @param {any} target target object to copy to
 * @param {any} source source objects from which to copy properties
 * @param  {...any} sources 
 * @returns {Object}
 */
export const mergeObjectRight = curry((source1, source2, ...sources) => 
    mergeObject.apply(null, [source1, source2, ...sources].reverse()));
