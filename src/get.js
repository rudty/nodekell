import { curry } from "./curry";
import { undefinedValue } from "./internal/undefinedValue";
import { prop } from "./prop";
import { _isFunction } from "./internal/typeTraits";

/**
 * if object have a get function, 
 * call it or get the properties of that object. 
 * if there is no value, it returns undefined.
 * 
 * support Map, Set, any Object
 * 
 * @example
 *      const m = new Map([
 *          ["name", "hello map"],
 *          ["value", 84]
 *      ]);
 *      const r = F.get("name", m);
 *      console.log(r); // print hello map
 * 
 * @param {Object} key any key value
 * @param {Object} a any object
 * @returns {Object | undefined} a.get or a[key] or undefined
 */
export const get = curry((key, a) => {
    if (a && _isFunction(a.get)) {
        const r = a.get(key);
        if (r !== undefinedValue) {
            return r;
        }
    }
    return prop(key, a);
});
