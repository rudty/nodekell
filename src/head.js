import { seq } from "./seq";
import { _mustNotEmptyIteratorResult } from "./internal/runtime";
export const head = async (iter) => {
    const g = seq(iter);
    const e = await g.next();
    _mustNotEmptyIteratorResult(e);
    return e.value;
};
