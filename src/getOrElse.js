import { curry } from "./curry";
import { get } from "./get";
import { undefinedValue } from "./internal/typeTraits";

/**
 * if object have a get function, 
 * call it or get the properties of that object. 
 * if there is no value, it returns defaultValue.
 * 
 * support Map, Set, any Object
 * 
 * @example
 *      const m = new Map([
 *          ["name", "hello map"],
 *          ["value", 84]
 *      ]);
 *      const r0 = F.getOrElse("name", "world", m);
 *      console.log(r0); // print hello map
 * 
 *      const r1 = F.getOrElse("foo", "world", m);
 *      console.log(r1); // print world
 * 
 * @param {Object} key any key value
 * @param {Object} defaultValue a.get and a[key] is undefined return defaultValue
 * @param {Object} a any object
 * @returns {Object} a.get or a[key] or defaultValue
 */
export const getOrElse = curry((key, defaultValue, a) => {
    const r = get(key, a);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});