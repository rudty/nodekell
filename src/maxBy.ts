import { curry } from "./curry";
import { _headTail } from "./internal/headTail";
import { Iter, _Func1 } from "./internal/typeTraits";

export interface MaxBy {
    /**
     * get maximum element
     * @example
     * const a = [10,9,8,7];
     * const r = await F.maxBy(e => e, a);
     * console.log(r); // print 10;
     *
     * @param f min compare function
     * @param iter any iterator
     */
    <T>(f: _Func1<T, any>, iter: Iter<T | Promise<T>>): Promise<T>;
    <T>(f: _Func1<T, any>): (iter: Iter<T | Promise<T>>) => Promise<T>;
}
export const maxBy: MaxBy = curry(async (f: any, iter: any) => {
    const h = await _headTail(iter);
    let m = h[0];

    let c = await f(m);
    for await (const e of h[1]) {
        const k = await f(e);
        if (k > c) {
            m = e;
            c = k;
        }
    }
    return m;
});
