import { curry } from "./curry";
import { prop } from "./prop";
import { undefinedValue } from "./internal/typeTraits";

export interface PropOrElse {
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
     * @param key any key value
     * @param defaultValue a[key] is undefined return defaultValue
     * @param target any object
     * @returns target[key] or defaultValue
     */
    <T, D, K extends keyof T>(key: K, defaultValue: D, target: T): T[K] extends undefined ? D : T[K] | D;
    <T, D, K extends keyof T>(key: K, defaultValue: D): (target: T) => T[K] extends undefined ? D : T[K] | D;
    <T, D, K extends keyof T>(key: K): (defaultValue: D, target: T) => T[K] extends undefined ? D : T[K] | D;
}

export const propOrElse = curry((key: any, defaultValue: any, target: any): any => {
    const r = prop(key, target);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});
