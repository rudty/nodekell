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

const _mergeSortInternal = async (fn, arr, buf, left, mid, right) => {
    let i = left;
    let j = mid + 1;
    let k = left;

    for (;i <= mid && j <= right; ++k) {
        if ((await fn(arr[i], arr[j])) <= 0) {
            buf[k] = arr[i];
            ++i;
        } else {
            buf[k] = arr[j];
            ++j; 
        }
    }

    if (i > mid) {
        for(;j <= right; ++j, ++k) {
            buf[k] = arr[j];
        }
    } else {
        for(;i <= mid; ++i, ++k) {
            buf[k] = arr[i];
        } 
    }

    for (let l = left; l <= right; ++l) {
        arr[l] = buf[l];
    }
};

const _mergeSort = async (fn, arr, buf, left, right) => {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        const d1 = _mergeSort(fn, arr, buf, left, mid);
        const d2 = _mergeSort(fn, arr, buf, mid + 1, right);
        
        await d1;
        await d2;
        
        await _mergeSortInternal(fn, arr, buf, left, mid, right);
    }
    return arr;
};
const _sort = (fn, arr) => {
    // console.log("before",arr)
    const buf = [];
    buf.length = arr.length;
    return _mergeSort(fn, arr, buf, 0, arr.length - 1);
};

export const sortBy2 = curry(async (fn, iter) => {
    const arr = await _collectArray(iter);
    return _sort(fn, arr);
});