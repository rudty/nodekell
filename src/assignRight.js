import { curry } from "./curry";

/**
 * curry with Object.assign
 * merge from right to left 
 * 
 * @param {any} target target object to copy to
 * @param {any} source source objects from which to copy properties
 * @param  {...any} sources 
 * @returns {Object}
 */
export const assignRight = curry((target, source, ...sources) => {
    return Object.assign.call(null, [target, source, ...sources].reverse());
});
