import { curry } from "./curry";
import { reverse } from "./reverse";
import { _headTail } from "./internal/headTail";
import { _foldrInternal } from "./internal/runtime";
import { Iter, _FlatFunc2, FlatForInternalFn, _Func2 } from "./internal/typeTraits";

export interface Foldr1Type {
    /**
     * fold iterator
     * @example
     * const arr = [1,2,3,4,5];
     * const r = await F.foldr1((a, b) => a + b, 0, arr);
     * console.log(r); // print 15
     * @param f fold function
     * @param iter not empty iterator
     */
    <T>(f: _Func2<T, T, T>, iter: Iter<T | Promise<T>>): Promise<T>;
    <T extends Iter<any>>(f: _FlatFunc2<T, T, FlatForInternalFn<T>>, iter: T): Promise<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatFunc2<T, T, FlatForInternalFn<T>>): (iter: T) => Promise<FlatForInternalFn<T>>;
    <T>(f: _Func2<T, T, T>): (iter: Iter<T | Promise<T>>) => Promise<T>;
}

export const foldr1: Foldr1Type = curry(async (f: any, iter: any) => {
    const r = reverse(iter);
    const [head, tail] = await _headTail(r);
    return _foldrInternal(f, head, tail);
});
