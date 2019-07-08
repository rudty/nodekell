import { _collectArray } from "./internal/collectArray";
/**
 * [a,1],[b,2],[c,3]]  => {a:1,b:2,c:3} 
 */
export const collectObject = async (iter) => {
    const c = await _collectArray(iter);
    const o = {};
    for (const e of c) {
        if (!Array.isArray(e)) {
            throw new TypeError("value is not array");
        }
        o[e[0]] = e[1];
    }
    return o;
};
