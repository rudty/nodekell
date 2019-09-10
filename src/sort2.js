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

const _mergeSortInternal = (arr, buf, left, mid, right) => {
    let i = left;
    let j = mid + 1;
    let k = left;

    for (;i <= mid && j <= right; ++k) {
        if (arr[i] <= arr[j]) {
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
        for(;j <= mid; ++j, ++k) {
            buf[k] = arr[j];
        } 
    }
    console.log(arr.slice(left, right + 1), buf.slice(left, right + 1));
    for (let l = left; l <= right; ++l) {
        arr[l] = buf[l];
    }
    
};

const _mergeSort = (arr, buf, left, right) => {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        const d1 = _mergeSort(arr, buf, left, mid);
        const d2 = _mergeSort(arr, buf, mid + 1, right);
        const d3 = _mergeSortInternal(arr, buf, left, mid, right);

        // await d1;
        // await d2;
        // await d3;
    }
    return arr;
};
const _sort = (fn, arr) => {
    console.log("before",arr)
    const buf = [];
    buf.length = arr.length;
    return _mergeSort(arr, buf, 0, arr.length - 1);
};

export const sortBy2 = curry(async (fn, iter) => {
    const arr = await _collectArray(iter);
    return _sort(fn, arr);
});