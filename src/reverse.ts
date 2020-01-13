import { _collectArray } from "./internal/collectArray";
import { Iter, ExtractPromise } from "./internal/typeTraits";
export interface Reverse {
    <T>(iter: Iter<T>): AsyncIterableIterator<ExtractPromise<T>>;
}
export const reverse: Reverse = async function *(iter: Iter<any>): AsyncIterableIterator<any> {
    const a = await _collectArray(iter);
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};
