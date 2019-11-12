import { seq } from "./seq";
import { _mustNotEmptyIterableResult } from "./internal/runtime";
export const head = async (iter) => {
    const g = seq(iter);
    const e = await g.next();
    _mustNotEmptyIterableResult(e);
    return e.value;
};
