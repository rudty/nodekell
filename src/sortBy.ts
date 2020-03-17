import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";
import { ExtractPromise, Iter } from "./internal/typeTraits";

const insertSortThresholdSize = 1;

export const _binarySearchIndex = async (fn: any, arr: ArrayLike<any>, elem: any, left: number, right: number): Promise<number> => {
    while (true) {
        if (right <= left) {
            if (await fn(elem, arr[left]) > 0) {
                return left + 1;
            }
            return left;
        }

        const mid = Math.floor((left + right) / 2);
        const comp = await fn(elem, arr[mid]);

        if (comp === 0) {
            return mid;
        } else if (comp > 0) {
            left = mid + 1;
        } else { // if (comp < 0)
            right = mid - 1;
        }
    }
};

/**
 * sort simple array (length < insertSortThresholdSize)
 * @param {Function} fn compareator
 * @param {ArrayLike} arr array
 * @param {Number} left beginIndex (0)
 * @param {Number} right endIndex (length - 1)
 */
export const _insertionSort = async (fn: any, arr: any, left: number, right: number) => {
    for (let i = left + 1; i <= right; ++i) {
        const elem = arr[i];
        const insertIndex = await _binarySearchIndex(fn, arr, elem, left, i);
        for (let j = i - 1; j >= insertIndex; --j) {
            arr[j + 1] = arr[j];
        }
        arr[insertIndex] = elem;
    }
};

const _mergeSortInternal = async (fn: any, arr: any, buf: any, left: number, mid: number, right: number) => {
    let i = left;
    let j = mid + 1;
    let k = left;

    for (; i <= mid && j <= right; ++k) {
        if ((await fn(arr[i], arr[j])) <= 0) {
            buf[k] = arr[i];
            ++i;
        } else {
            buf[k] = arr[j];
            ++j;
        }
    }

    if (i > mid) {
        for (; j <= right; ++j, ++k) {
            buf[k] = arr[j];
        }
    } else {
        for (; i <= mid; ++i, ++k) {
            buf[k] = arr[i];
        }
    }

    for (k = left; k <= right; ++k) {
        arr[k] = buf[k];
    }
};

const _mergeSort = async (fn: any, arr: any, buf: any, left: number, right: number) => {
    if (left < right) {
        if (right - left < insertSortThresholdSize) {
            await _insertionSort(fn, arr, left, right);
        } else {
            const mid = Math.floor((left + right) / 2);
            const d1 = _mergeSort(fn, arr, buf, left, mid);
            const d2 = _mergeSort(fn, arr, buf, mid + 1, right);

            await d1;
            await d2;

            await _mergeSortInternal(fn, arr, buf, left, mid, right);
        }
    }
};

/**
 * Sort the values by the return value of the function.
 * iterator or asyncIterator take all the values and sorts them.
 *
 * @example
 *  const arr = [4, 3, 2, 5, 1];
 *  const res = await F.sortBy((a, b) => a - b, arr);
 *  console.log(res); // print [1,2,3,4,5]
 *
 * @param comparator compareator function
 * @param iter any iterable
 * @returns new sorted array
 */
export interface SortByType {
    <T>(comparator: (lhs: ExtractPromise<T>, rhs: ExtractPromise<T>) => number | Promise<number>, iter: Iter<T | Promise<T>>): Promise<ArrayLike<ExtractPromise<T>>>;
    <T>(comparator: (lhs: T, rhs: T) => number | Promise<number>): (iter: Iter<T | Promise<T>>) => Promise<ArrayLike<T>>;
}

export const sortBy: SortByType = curry(async (fn: any, iter: any) => {
    const arr = await <any> _collectArray(iter);
    const buf: any = [];
    buf.length = arr.length;
    await _mergeSort(fn, arr, buf, 0, arr.length - 1);
    return arr;
});
