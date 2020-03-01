import { _isReadableArrayLike, Iter, _FlatFunc1, _Func1, AssociateMap } from "./internal/typeTraits";
import { curry } from "./curry";

export interface AssociateByType {
    /**
     * returns a Map using iterator.
     * when the function returns Array
     * it uses the first argument as key and the second argument as value.
     * when not in an array, the key and value are both return values.
     *
     * **Note**
     * - if want you high quality type, use type assertion
     *
     * @example
     *      const arr0 = [1, 2, 3];
     *      const m0 = await F.associateBy(e => [e, e * 2], arr0);
     *      console.log(m0);
     *      // => Map { 1 => 2, 2 => 4, 3 => 6 }
     *
     *      const arr1 = [1, 2, 3];
     *      const m1 = await F.associateBy(e => e + 1, arr1);
     *      console.log(m1);
     *      // => Map { 2 => 2, 3 => 3, 4 => 4 }
     *
     * @param fn convert function
     * @param iter any iterator
     */
    <T, R>(fn: _Func1<T, R>): Promise<AssociateMap<R>>;
    <T extends Iter<any>, R>(fn: _FlatFunc1<T, R>, iter: T): Promise<AssociateMap<R>>;
    <T extends Iter<any>, R>(fn: _FlatFunc1<T, R>): (iter: T) => Promise<AssociateMap<R>>;
}
export const associateBy = curry(async (fn: any, iter: any) => {
    const m = new Map();
    for await (const e of iter) {
        const v = await fn(e);
        if (_isReadableArrayLike(v)) {
            m.set(v[0], v[1]);
        } else {
            m.set(v, v);
        }
    }
    return m;
});
