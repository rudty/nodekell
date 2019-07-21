import { equals } from "./equals";
import { _isFunction } from "./internal/typeTraits";
/**
 *  for pattern matching 
 *  F._ is any match 
 * 
 * @example
 * 
 *  const value = 1;
 * 
 *  F.match(value,
 *      0, () => console.log("value is 0"),
 *      1, () => console.log("value is 1"),
 *      2, () => console.log("value is 2")
 *  );
 * //print value is 1
 * 
 *  const value2 = [1, 2, 3, 4, 5];
 *  F.match(value2, 
 *      [1, 2], () => console.log("value is [1,2]"),
 *      [1, F._, F._, F._, F._], () => console.log("value is [1, any, any, any, any]")
 *  );
 *  //print value is [1, any, any, any, any]
 * 
 * @param {any} value match value
 * @param  {...any} cv must even [0]:compare, [1]: value, ...
 */
export const match = (value, ...cv) => {
    for (let i = 0; i < cv.length; i += 2) {
        if (equals(value, cv[i])) {
            if (_isFunction(cv[i + 1])) {
                return cv[i + 1](value);
            }
            return cv[i + 1];
        }
    }
    //return undefined;
};