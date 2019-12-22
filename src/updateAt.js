import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";

export const updateAt = curry(async (value, index, iter) => {
    const a = await _collectArray(iter);
    a[index] = value;
    return a; 
});