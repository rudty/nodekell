import { curry } from "./curry";
import { undefinedValue } from "./internal/typeTraits";

/**
 * get the properties of that object. 
 * if there is no value, it returns undefined.
 * 
 * @example
 *      const arr = [1, 2, 3];
 *      const r = F.prop("0", arr);
 *      console.log(r); // print 1
 * 
 * @param {Object} key any key value
 * @param {Object} a any object
 * @returns {Object | undefined} (a[key]) || (undefined if object is null or undefined)
 */
export const prop = curry((key, a) => {
    if (a === undefinedValue || a === null) {
        return undefinedValue;
    }
    return a[key];
});
