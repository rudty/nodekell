import { curry } from "./curry";
import { prop } from "./prop";
import { undefinedValue } from "./internal/typeTraits";

/**
 * get the properties of that object. 
 * if there is no value, it returns defaultValue.
 * 
 * @example
 *      const arr = [1, 2, 3];
 *      const r0 = F.propOrElse("0", 100, arr);
 *      console.log(r0); // print 1
 * 
 *      const r1 = F.propOrElse("5", 100, arr);
 *      console.log(r1); // print 100
 * 
 * @param {Object} key any key value
 * @param {Object} defaultValue a[key] is undefined return defaultValue
 * @param {Object} a any object
 * @returns {Object} a[key] or defaultValue
 */
export const propOrElse = curry((key, defaultValue, a) => {
    const r = prop(key, a);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});