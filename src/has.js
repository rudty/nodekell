import { curry } from "./curry";
export const has = curry((key, a) => {
    if (a.has && a.has.constructor === Function) {
        if (a.has(key)) {
            return true;
        }
    }

   return a[key] !== undefined;
});
