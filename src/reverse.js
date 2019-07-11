import { _collectArray } from "./internal/collectArray";

export const reverse = async function *(iter) {
    const a = await _collectArray(iter);
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};
