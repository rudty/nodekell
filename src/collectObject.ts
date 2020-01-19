import { _collectArray } from "./internal/collectArray";
import { _isPairLike, Iter } from "./internal/typeTraits";
export interface CollectObjectKeyValue<T> {
    0: any;
    1: T;
}
export interface CollectObject {
    /**
     * [[a,1],[b,2]] => {a: 1, b: 2}
     * @example
     * const a = [[1,2],[3,4]];
     * const m = await F.collectObject(a);
     * console.log(m);
     * // print { '1': 2, '3': 4 }
     * @param iter [[key, value]] iterator
     */
    <T>(iter: Iter<CollectObjectKeyValue<T> | Promise<CollectObjectKeyValue<T>>>): Promise<{ [key: string]: CollectObjectKeyValue<T>[1] }>;
    (iter: Iter<any[] | Promise<any[]>>): Promise<{ [key: string]: any }>;
}

export const collectObject: CollectObject = async (iter: Iter<any>): Promise<any> => {
    const c = await _collectArray(iter);
    const o: any = {};
    for (const e of c) {
        if (!_isPairLike(e)) {
            throw new TypeError("collectObject value is not pair require [k,v] ");
        }
        o[e[0]] = e[1];
    }
    return o;
};
