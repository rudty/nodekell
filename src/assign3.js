import { curry } from "./curry";

/**
 * curry with Object.assign
 * Returns the target object.
 * must have at least 3 arguments
 * 
 * @param {Object} target target object to copy to
 * @param {Object} source source objects from which to copy properties
 * @param  {...Object} sources 
 * @returns {Object}
 */
export const assign3 = curry((target, source1, source2, ...sources) => {
    return Object.assign(target, source1, source2, ...sources);
});
