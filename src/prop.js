import { curry } from "./curry";
import { undefinedValue } from "./internal/undefinedValue";

/**
 * get the properties of that object. 
 * if there is no value, it returns undefined.
 * 
 * @example
 *      const arr = [1, 2, 3];
 *      const r = F.prop("0", arr);
 *      console.log(r); // print 1
 * 
 * @param {any} key any key value
 * @param {any} a any object
 * @returns {any | undefined} (a[key]) || (undefined if object is null or undefined)
 */
export const prop = curry((key, a) => {
    if (a === undefinedValue || a === null) {
        return undefinedValue;
    }
    return a[key];
});
