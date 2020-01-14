import { curry } from "./curry";
import { get } from "./get";
import { undefinedValue, Getter } from "./internal/typeTraits";

export interface GetOrElse {
    <T, D, K extends keyof T>(key: K, defaultValue: D, target: T): Getter<T, K> extends undefined ? D: Getter<T, K> | D;
    <T, D, K>(key: K, defaultValue: D, target: T): Getter<T, K> extends undefined ? D: Getter<T, K> | D;
    <T, D, K extends keyof T>(key: K, defaultValue: D): (target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;
    <T, D, K>(key: K, defaultValue: D): (target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;
    <T, D, K extends keyof T>(key: K): (defaultValue: D, target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;
    <T, D, K>(key: K): (defaultValue: D, target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;
}

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
 * @param key any key value
 * @param defaultValue if target.get and target[key] is undefined return defaultValue
 * @param target any object
 * @returns target.get or target[key] or defaultValue
 */
export const getOrElse: GetOrElse = curry((key: any, defaultValue: any, target: any): any => {
    const r = get(key, target);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});
