import { curry } from "./curry";
import { undefined } from "./internal/undefined";

export const has = curry((key, a) => {
    if (a.has && a.has.constructor === Function) {
        if (a.has(key)) {
            return true;
        }
    }

   return a[key] !== undefined;
});
