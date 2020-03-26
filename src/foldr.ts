import { curry } from "./curry";
import { reverse } from "./reverse";
import { _headTail } from "./internal/headTail";
import { _foldrInternal } from "./internal/runtime";
import { _Func2, Iter, CurriedFunction2, _FlatFunc2 } from "./internal/typeTraits";

export interface FoldrType {
    /**
     * @example
     * const arr = [64,2,1];
     * const r = await F.foldr((a, b) => a / b, 1, arr);
     * console.log(r); // print 32
     *
     * const arr2 = ["1","2","3","4"];
     * const r2 = await F.foldr((a, b) => a + b, "5", arr);
     * console.log(r2); // print 12345
     * @param f accumation function
     * @param init initial value to start the accumulation
     * @param iter any iterator
     */
    <T, U>(f: _Func2<T, U, U>, init: U | Promise<U>, iter: Iter<T | Promise<T>>): Promise<U>;
    <T extends Iter<any>, U>(f: _FlatFunc2<T, U, U>, init: U | Promise<U>, iter: T): Promise<U>;
    <T extends Iter<any>, U>(f: _FlatFunc2<T, U, U>, init: U | Promise<U>): (iter: T) => Promise<U>;
    <T extends Iter<any>, U>(f: _FlatFunc2<T, U, U>): CurriedFunction2<U | Promise<U>, T, Promise<U>>;
    <T, U>(f: _Func2<T, U, U>, init: U | Promise<U>): (iter: Iter<T | Promise<T>>) => Promise<U>;
    <T, U>(f: _Func2<T, U, U>): CurriedFunction2<U | Promise<U>, Iter<T | Promise<T>>, Promise<U>>;
}

export const foldr: FoldrType = curry((f: any, z: any, iter: any) => {
    return _foldrInternal(f, z, reverse(iter));
});
