import { curry } from "./curry";
import { prop } from "./prop";
import { undefinedValue } from "./internal/undefinedValue";

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
 * @param {any} key any key value
 * @param {any} defaultValue a[key] is undefined return defaultValue
 * @param {any} a any object
 * @returns {any} a[key] or defaultValue
 */
export const propOrElse = curry((key, defaultValue, a) => {
    const r = prop(key, a);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});