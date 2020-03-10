import { curry } from "./curry";
import { mergeMap } from "./mergeMap";
import { Iter, ExtractPromise } from "./internal/typeTraits";

export interface MergeMapRightType {
    /**
     * Create a new Map by combining the arguments of the function.
     * If the key exists, the value on the left is used.
     *
     * @example
     *      const m1 = new Map([[1, 2], [3, 4]]);
     *      const m2 = new Map([[5, 6], [7, 8]]);
     *      const r1 = await F.mergeMapRight(m1, m2);
     *      console.log(r1); // print Map { 5 => 6, 7 => 8, 1 => 2, 3 => 4 }
     *
     *      const m2 = new Map([[1, 2], [3, 4]]);
     *      const o2 = { 5: 6, 7: 8 };
     *      const r2 = await F.mergeMapRight(m2, o2);
     *      console.log(r2); // Map { '5' => 6, '7' => 8, 1 => 2, 3 => 4 }
     *
     * @param source1 source from which to copy properties
     * @param source2 source from which to copy properties
     */
    <K1, V1, K2, V2>(source1: Iter<[K1, V1]>, source2: Iter<[K2, V2]>): Promise<Map<ExtractPromise<K1> | ExtractPromise<K2>, ExtractPromise<V1> | ExtractPromise<V2>>>;
    <T extends Iter<[any, any]>>(source1: T, source2: T, source3: T, ...sources: T[]): T extends Iter<[infer K, infer V]> ? Promise<Map<ExtractPromise<K>, ExtractPromise<V>>> : Promise<Map<any, any>>;
    (source1: any, source2: any, source3: any, ...sources: any[]): Promise<Map<any, any>>;
    <K1, V1, O1 extends object>(source1: Map<K1, V1>, source2: O1): Promise<Map<ExtractPromise<K1> | string, ExtractPromise<V1> | ExtractPromise<O1[keyof O1]>>>;
    <K1, V1, O1 extends object>(source1: O1, source2: Map<K1, V1>): Promise<Map<ExtractPromise<K1> | string, ExtractPromise<V1> | ExtractPromise<O1[keyof O1]>>>;
    <O1 extends object, O2 extends object>(source1: O1, source2: O2): Promise<Map<string, ExtractPromise<O1[keyof O1]> | ExtractPromise<O2[keyof O2]>>>;
    (source1: Map<any, any>): (source2: object | Iter<[any, any]>, ...sources: (object | Iter<[any, any]>)[]) => Promise<Map<any, any>>;
    (source1: object | Iter<[any, any]>): (source2: object | Iter<[any, any]>, ...sources: (object | Iter<[any, any]>)[]) => Promise<Map<any, any>>;
}

export const mergeMapRight: MergeMapRightType = curry((source1: any, source2: any, ...sources: any[]) =>
    mergeMap.apply(null, [source1, source2, ...sources].reverse()));
