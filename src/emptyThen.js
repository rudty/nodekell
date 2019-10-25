import { curry } from "./curry";
import { _takeValue } from "./internal/runtime";
import { _flatOnce } from "./internal/flatOnce";

export const emptyThen = curry(async function *(supply, iter) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }

    yield* _flatOnce(_takeValue(supply));
});
