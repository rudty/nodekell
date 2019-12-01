import { _collectArray } from "./internal/collectArray";
import { _isPairLike } from "./internal/typeTraits";
/**
 * [a,1],[b,2],[c,3]]  => {a:1,b:2,c:3} 
 */
export const collectObject = async (iter) => {
    const c = await _collectArray(iter);
    const o = {};
    for (const e of c) {
        if (!_isPairLike(e)) {
            throw new TypeError("collectObject value is not pair require [k,v] ");
        }
        o[e[0]] = e[1];
    }
    return o;
};
