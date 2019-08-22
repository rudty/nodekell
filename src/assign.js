import { curry } from "./curry";

/**
 * curry with Object.assign
 * Returns the target object.
 * 
 * @param {any} target target object to copy to
 * @param {any} source source objects from which to copy properties
 * @param  {...any} sources 
 * @returns {Object}
 */
export const assign = curry((target, source, ...sources) => {
    return Object.assign(target, source, ...sources);
});
