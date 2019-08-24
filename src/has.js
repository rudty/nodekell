import { curry } from "./curry";
import { undefinedValue } from "./internal/undefinedValue";
import { _isFunction } from "./internal/typeTraits";

export const has = curry((key, a) => {
    if (a && _isFunction(a.has)) {
        if (a.has(key)) {
            return true;
        }
    }

    return a[key] !== undefinedValue;
});
