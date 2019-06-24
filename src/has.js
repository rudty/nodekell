import { curry } from "./curry";
import { undefinedValue } from "./internal/undefinedValue";

export const has = curry((key, a) => {
    if (a.has && a.has.constructor === Function) {
        if (a.has(key)) {
            return true;
        }
    }

   return a[key] !== undefinedValue;
});
