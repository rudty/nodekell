import { curry } from "./curry";
import { FlatForInternalFn, Iter, ExtractPromise } from "./internal/typeTraits";

export interface GroupBy {
    <K, V>(f: (elem: V) => (K | Promise<K>), iter: Iter<V | Promise<V>>): Promise<Map<K, V[]>>;
    <K, V extends Iter<any>>(f: (elem: FlatForInternalFn<V>) => K, iter: V): Promise<Map<ExtractPromise<K>, FlatForInternalFn<V>[]>>;
    <K, V extends Iter<any>>(f: (elem: FlatForInternalFn<V>) => K): (iter: V) => Promise<Map<ExtractPromise<K>, FlatForInternalFn<V>[]>>;
    <K, V>(f: (elem: V) => (K | Promise<K>)): (iter: Iter<V | Promise<V>>) => Promise<Map<K, V[]>>;
}

/**
 * returns a Map that is aggregated through a function.
 * key is the return value of the function, and value is the source.
 *
 * @example
 * const a = [
 *    {type: "tea",
 *       price: 1},
 *   {type: "tea",
 *       price: 2},
 *   {type: "phone",
 *       price: 3},
 *   {type: "phone",
 *       price: 4},
 * ];
 * //returns new Map(... )
 * const r = await F.groupBy(e => e.type, a);
 * console.log(r.get("tea"));
 * //print [ { type: 'tea', price: 1 }, { type: 'tea', price: 2 } ]
 * console.log(r.get("phone"));
 * //print [ { type: 'phone', price: 3 }, { type: 'phone', price: 4 } ]
 */
export const groupBy: GroupBy = curry(async (f: any, iter: Iter<any>): Promise<Map<any, any>> => {
    const m = new Map();
    for await (const e of iter) {
        const k = await f(e);
        const v = m.get(k);
        if (v) {
            v.push(e);
        } else {
            m.set(k, [e]);
        }
    }
    return m;
});
