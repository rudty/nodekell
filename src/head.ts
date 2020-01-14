import { seq } from "./seq";
import { _mustNotEmptyIteratorResult } from "./internal/runtime";
import { Iter, ExtractPromise } from "./internal/typeTraits";

export interface Head {
    <T>(iter: Iter<T>): Promise<ExtractPromise<T>>;
}

export const head: Head = async <T>(iter: Iter<T>): Promise<ExtractPromise<T>> => {
    const g = seq(iter);
    const e = await g.next();
    _mustNotEmptyIteratorResult(e);
    return e.value;
};
