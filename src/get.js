import { curry } from "./curry";
/**
 * support Map, Set, any Object
 */
export const get = curry((key, a) => {
    if (a.get && a.get.constructor === Function) {
        const r = a.get(key);
        if (r !== undefined) {
            return r;
        }
    }
    return a[key];
});
