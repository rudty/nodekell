import { curry } from "./curry";

/**
 * curry with Object.assign
 * Returns the target object.
 * must have at least 3 arguments
 * 
 * @param {any} target target object to copy to
 * @param {any} source source objects from which to copy properties
 * @param  {...any} sources 
 * @returns {Object}
 */
export const assign3 = curry((target, source1, source2, ...sources) => {
    return Object.assign(target, source1, source2, ...sources);
});
