import { curry } from "./curry";
import { isNil } from "./isNil";
import { undefinedValue } from "./internal/undefinedValue";

export const prop = curry((key, a) => {
    if (isNil(key) || !a) {
        return undefinedValue;
    }
    return a[key];
});
