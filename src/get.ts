import { curry } from "./curry";
import { undefinedValue, Getter, _isFunction } from "./internal/typeTraits";
import { prop } from "./prop";

export interface Get {
    <T, K extends keyof T>(key: K, target: T): Getter<T, K>;
    <T, K>(key: K, target: T): Getter<T, K>;
    <T, K extends keyof T>(key: K): (target: T) => Getter<T, K>;
    <T, K>(key: K): (target: T) => Getter<T, K>;
}

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
 * @param key any key value
 * @param target any object
 * @returns a.get or a[key] or undefined
 */
export const get: Get = curry((key: any, a: any): any => {
    if (a && _isFunction(a.get)) {
        const r = a.get(key);
        if (r !== undefinedValue) {
            return r;
        }
    }
    return prop(key, a);
});
