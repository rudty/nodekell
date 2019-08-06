import { curry } from "./curry";
import { prop } from "./prop";
import { undefinedValue } from "./internal/undefinedValue";

export const propOrElse = curry((key, defaultValue, a) => {
    const r = prop(key, a);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});