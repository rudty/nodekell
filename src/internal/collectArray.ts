import { collect } from "../collect";
import { _isTypedArray, _isObjectArray, _isString, Iter } from "./typeTraits";

export interface _CollectArray {
    (a: string): string[];
    <T>(a: ArrayLike<T>): T[];
    <T>(a: Iterable<T>): T[];
    <T>(a: AsyncIterable<T>): Promise<T[]>;
    <T>(a: Iter<T>): Promise<T[]>;
}
/**
 * any iterable to array
 * and resolve promise elements
 *
 * @param iter any iter
 */
export const _collectArray: _CollectArray = (iter: any): any => {
    if (Array.isArray(iter)) {
        return Promise.all(iter);
    }

    if (_isTypedArray(iter)) {
        // typed array and string does not require await
        return iter;
    }

    if (_isString(iter)) {
        return Array.from(iter);
    }

    if (_isObjectArray(iter)) {
        return Promise.all(Array.from(iter));
    }

    return collect(iter);
};
