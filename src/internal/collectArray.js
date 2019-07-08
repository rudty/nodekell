import { collect } from "../collect";
import { _isTypedArray, _isObjectArray, _isString } from "./typeTraits";

/**
 * any iterable to array
 * and resolve promise elements
 * 
 * @param {ArrayLike | Iterable | AsyncIterable} iter
 * @returns {Promise<Array> | ArrayLike}
 */
export const _collectArray = (iter) => {
    if (Array.isArray(iter)) {
        return Promise.all(iter);
    }

    if (_isTypedArray(iter)){
        //typed array and string does not require await
        return iter;
    }

    if(_isString(iter)) {
        return Array.from(iter);
    }

    if (_isObjectArray(iter)) {
        return Promise.all(Array.from(iter));
    }

    return collect(iter);
};