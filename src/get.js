import { curry } from "./curry";
import { undefinedValue } from "./internal/undefinedValue";
import { prop } from "./prop";

/**
 * support Map, Set, any Object
 */
export const get = curry((key, a) => {
    if (a && a.get && a.get.constructor === Function) {
        const r = a.get(key);
        if (r !== undefinedValue) {
            return r;
        }
    }
    return prop(key, a);
});
