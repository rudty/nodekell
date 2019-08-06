import { curry } from "./curry";
import { get } from "./get";
import { undefinedValue } from "./internal/undefinedValue";

export const getOrElse = curry((key, defaultValue, a) => {
    const r = get(key, a);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});