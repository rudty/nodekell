import { curry } from "./curry";
import { _takeValue } from "./internal/runtime";

export const firstOrGet = curry(async (supply, iter) => {
    for await (const e of iter) {
        return e;
    }
    return _takeValue(supply);
});
