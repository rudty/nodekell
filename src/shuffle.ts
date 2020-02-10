import { collect } from "./collect";
import { random } from "./random";
import { _isReadableArrayLike, Iter } from "./internal/typeTraits";

const shuffleInternal = (arr: any[]) => {
    const len = arr.length;
    for (let i = len - 1; i >= 0; --i) {
        const where = random(len);
        if (i !== where) {
            const tmp = arr[i];
            arr[i] = arr[where];
            arr[where] = tmp;
        }
    }
    return arr;
};

// for Iterable, AsyncIterable
const shuffleAsync = async (iter: any) => {
    iter = await collect(iter);
    return shuffleInternal(iter);
};

export interface Shuffle {
    /**
     * return a random permutation of iterator
     *
     * @param iter any iterable
     * @return new shuffle Array
     */
    <T>(arr: ArrayLike<T>): T[];
    <T>(iter: Iter<T>): Promise<T[]>;
}

export const shuffle: Shuffle = <any> ((iter: any) => {
    if (_isReadableArrayLike(iter)) {
        return shuffleInternal(Array.from(iter));
    }
    return shuffleAsync(iter);
});
