import { seq } from "./seq";
import { curry } from "./curry";
import { _removeIteratorElements } from "./internal/runtime";
export const drop = curry(async function *(count, iter) {
    const g = seq(iter);
    await _removeIteratorElements(g, count);
    yield* g;
});
