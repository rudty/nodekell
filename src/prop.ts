import { curry } from "./curry";
import { undefinedValue } from "./internal/typeTraits";

export interface Prop {
    <T, K extends keyof T>(key: K, target: T): T[K] | undefined;
    <T, K extends keyof T>(key: K): (target: T) => T[K] | undefined;
}

/**
 * get the properties of that object.
 * if there is no value, it returns undefined.
 *
 * @example
 *      const arr = [1, 2, 3];
 *      const r = F.prop("0", arr);
 *      console.log(r); // print 1
 *
 * @param key any key value
 * @param target any object
 * @returns (a[key]) || (undefined if object is null or undefined)
 */
export const prop: Prop = curry((key: any, target: any): any => {
    if (target === undefinedValue || target === null) {
        return undefinedValue;
    }
    return target[key];
});
