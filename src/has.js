import { curry } from "./curry";
import { undefinedValue } from "./internal/undefinedValue";
import { _isFunction } from "./internal/typeTraits";

export const has = curry((key, a) => {
    if (a) {
        if (_isFunction(a.has) && a.has(key)) {
            return true;
        }
        return a[key] !== undefinedValue;
    }
    return false;
});
