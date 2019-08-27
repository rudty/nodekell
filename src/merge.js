import { curry } from "./curry";

/**
 * Create a new object by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @param {any} target target object to copy to
 * @param {any} source source objects from which to copy properties
 * @param  {...any} sources 
 * @returns {Object}
 */
export const merge = curry((target, source, ...sources) => {
    return Object.assign({}, target, source, ...sources);
});
