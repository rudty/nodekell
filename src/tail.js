import { seq } from "./seq";
import { _mustNotEmptyIteratorResult } from "./internal/runtime";

export const tail = async function *(iter) {
    const g = seq(iter);
    const f = await g.next();
    _mustNotEmptyIteratorResult(f);
    yield* g;
};