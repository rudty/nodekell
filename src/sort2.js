import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";

const timSize = 64;

const _insertionSort = async (fn, arr) => {
    for (let i = 1; i < arr.length; ++i) {
        let elem = arr[i];
        let j = i - 1;
        for (;j >= 0 && (await fn(arr[j], elem) > 0); --j) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = elem;
    }
    return arr;
};


const _sort = (fn, arr) => {
    return _insertionSort(fn, arr);
};

export const sortBy2 = curry(async (fn, iter) => {
    const arr = await _collectArray(iter);
    return _sort(fn, arr);
});