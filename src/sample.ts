import { random } from "./random";
import { _isReadableArrayLike, Iter } from "./internal/typeTraits";
import { _collectArray } from "./internal/collectArray";

const _sampleArray = <T>(arr: ArrayLike<T>): T => arr[random(arr.length)];

const _sampleNotArray = async <T>(iter: Iter<T>): Promise<T> => {
    const r = await _collectArray(iter);
    return _sampleArray(r);
};

export interface Sample {
    /**
     * get random element from iterator
     * **await** is not required to use for an array.
     * @example
     * const r = F.sample([1,2,3,4,5,6]);
     * console.log(r); //print 1 ~ 6 random
     *
     * const r = await F.sample(F.range(100));
     * console.log(r); //print 0 ~ 100 random
     * @param iter any iterator
     */
    <T>(iter: ArrayLike<T>): T;
    <T>(iter: Iter<T>): Promise<T>;
}

export const sample: Sample = (iter: any): any => {
    if (_isReadableArrayLike(iter)) {
        return _sampleArray(iter);
    }
    return _sampleNotArray(iter);
};
