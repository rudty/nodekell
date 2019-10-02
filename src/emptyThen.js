import { curry } from "./curry";
import { _takeValue } from "./internal/runtime";

export const emptyThen = curry(async function *(supply, iter) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }

    yield* await _takeValue(supply);
});
