import { _collectArray } from "./internal/collectArray";

const innerJoin2 = curry(async (fn, iter1, iter2) => {
    iter1 = _collectArray(iter1);
    iter2 = _collectArray(iter2);

    iter1 = await iter1;
    iter2 = await iter2;

    const result = [];

    for (let i = 0; i < iter1.length; ++i) {
        for (let j = 0; j < iter2.length; ++j) {
            if (await fn(iter1[i], iter2[j])) {
                //combine
            }
        }
    }

    return result;
});