import { equals } from "./equals";
import { _isCallable } from "./internal/typeTraits";
/**
 *  const value = 1;
 * 
 *  F.match(value,
 *      0, console.log("value is 0"),
 *      1, console.log("value is 1"),
 *      2, console.log("value is 2")
 *  );
 * @param {any} value match value
 * @param  {...any} cv must even [0]:compare, [1]: value, ...
 */
export const match = (value, ...cv) => {
    for (let i = 0; i < cv.length; i += 2) {
        if (equals(value, cv[i])) {
            if (_isCallable(cv[i + 1])) {
                return cv[i + 1](cv[i]);
            }
            return cv[i + 1];
        }
    }
    //return undefined;
};