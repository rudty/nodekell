import { curry } from "./curry";
import { _headTail } from "./internal/headTail";
import { Iter, _Func1 } from "./internal/typeTraits";
export interface MinBy {
    /**
     * get minimum element
     * @example
     * const a = [9,10,9,8,7,0];
     * const r = await F.minBy(e => e, a);
     * console.log(r); // print 0
     *
     * @param f min compare function
     * @param iter any iterator
     */
    <T>(f: _Func1<T, any>, iter: Iter<T | Promise<T>>): Promise<T>;
    <T>(f: _Func1<T, any>): (iter: Iter<T | Promise<T>>) => Promise<T>;
}

export const minBy: MinBy = curry(async (f: any, iter: any) => {
    const h = await _headTail(iter);
    let m = h[0];

    let c = await f(m);
    for await (const e of h[1]) {
        const k = await f(e);
        if (k < c) {
            m = e;
            c = k;
        }
    }
    return m;
});
