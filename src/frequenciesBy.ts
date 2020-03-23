import { curry } from "./curry";
import { _Func1, Iter, _FlatFunc1, ExtractPromise } from "./internal/typeTraits";
export interface FrequenciesByType {
    /**
     * get frequency count by function
     *
     * @example
     *  (async () => {
     *      const arr = [{a:1},{a:2},{a:1}];
     *      const f = await frequenciesBy(e => e.a, arr);
     *      console.log(f);
     *  })();
     *
     * //count by elem.a
     * //print Map { 1 => 2, 2 => 1 }
     *
     * @param f frequency_function
     * @param iter any iterable
     */
    <K, T>(f: _Func1<T, K>, iter: Iter<T | Promise<T>>): Promise<Map<K, number>>;
    <K, T extends Iter<any>>(f: _FlatFunc1<T, K>, iter: T): Promise<Map<ExtractPromise<K>, number>>;
    <K, T extends Iter<any>>(f: _FlatFunc1<T, K>): (iter: T) => Promise<Map<ExtractPromise<K>, number>>;
    <K, T>(f: _Func1<T, K>): (iter: Iter<T | Promise<T>>) => Promise<Map<K, number>>;
}

export const frequenciesBy: FrequenciesByType = curry(async (fn: any, iter: any) => {
    const m = new Map();

    for await (const v of iter) {
        const e = await fn(v);
        const cnt = (m.get(e) || 0) + 1;
        m.set(e, cnt);
    }

    return m;
});
