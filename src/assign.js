import { curry } from "./curry";

/**
 * curry with Object.assign
 * Returns the target object.
 * 
 * @param {Object} target target object to copy to
 * @param {Object} source source objects from which to copy properties
 * @param  {...Object} sources 
 * @returns {Object}
 */
export const assign = curry((target, source, ...sources) => {
    return Object.assign(target, source, ...sources);
});
