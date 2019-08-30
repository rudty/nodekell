// TypeScript Version: 3.4

import {
    Iter,
    EP,
    Find,
    PairRepeat,
    PickElements,
    Accumulator,
    FlatAccumulator,
    FlatForInternalFn,
    ReturnTypePickElements,
    ExtractPromise,
} from "./utils";

import { Getter } from "./core";

/**
 * https://github.com/rudty/nodekell#otherwise
 */
export function otherwise(): true;

/**
 * https://github.com/rudty/nodekell#cond
 *
 * Requires an even number of arguments
 *
 * if the first argument is true, it returns the second argument
 */
export function cond<T extends PairRepeat<2, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<4, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<6, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<8, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<10, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<12, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<14, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<16, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<18, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<20, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<22, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<24, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<26, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<28, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<30, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<32, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<34, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<36, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<38, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<40, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;

/**
 *
 *
 * **Note**
 * - if use overloaded type function, use generic
 * ```ts
 * const addn = F.memoizeBy<(a: number, b: number) => number>((...e) => e, F.add);
 * addn(1, 2);
 * const adds = F.memoizeBy<(a: string, b: string) => string>((...e) => e, F.add);
 * adds('a', 'b');
 * const add = F.memoizeBy<((a: string, b: string) => string) | ((a: number, b: number) => number)>((...e) => e, F.add);
 * add('a', 'b') as string;
 * add(1, 2) as number;
 * ```
 * @param keyFn
 * @param callFn
 */
export function memoizeBy<P extends any[], R>(keyFn: (...args: P) => any, callFn: (...args: P) => (R | Promise<R>)): (...args: P) => Promise<R>;
export function memoizeBy<F extends (...args: any[]) => any>(keyFn: (...args: Parameters<F>) => any, callFn: F): (...args: Parameters<F>) => Promise<EP<ReturnType<F>>>;

export function memoizeBy<P extends any[], R>(keyFn: (...args: P) => any): (callFn: (...args: P) => (R | Promise<R>)) => (...args: P) => Promise<R>;
export function memoizeBy<F extends (...args: any[]) => any>(keyFn: (...args: Parameters<F>) => any): (callFn: F) => (...args: Parameters<F>) => Promise<EP<ReturnType<F>>>;

/**
 *
 *
 * **Note**
 * - if use overloaded type function, use generic
 * ```ts
 * const addn = F.memoize<(a: number, b: number) => number>(F.add);
 * addn(1, 2);
 * const adds = F.memoize<(a: string, b: string) => string>(F.add);
 * adds('a', 'b');
 * const add = F.memoize<((a: string, b: string) => string) | ((a: number, b: number) => number)>(F.add);
 * add('a', 'b') as string;
 * add(1, 2) as number;
 * ```
 *
 * @param callFn
 */
export function memoize<P extends any[], R>(callFn: (...args: P) => R): (...args: P) => Promise<EP<R>>;
export function memoize<F extends (...args: any[]) => any>(callFn: F): (...args: Parameters<F>) => Promise<EP<ReturnType<F>>>;

/**
 *
 *
 * **Note**
 * - if use overloaded type function, use generic
 * ```ts
 * const addn = F.memoizeWithTimeout<(a: number, b: number) => number>(1, F.add);
 * addn(1, 2);
 * const adds = F.memoizeWithTimeout<(a: string, b: string) => string>(1, F.add);
 * adds('a', 'b');
 * const add = F.memoizeWithTimeout<((a: string, b: string) => string) | ((a: number, b: number) => number)>(1, F.add);
 * add('a', 'b') as string;
 * add(1, 2) as number;
 * ```
 * @param timeout timeout cache
 * @param callFn
 */
export function memoizeWithTimeout<P extends any[], R>(timeout: number, callFn: (...args: P) => (R | Promise<R>)): (...args: P) => Promise<R>;
export function memoizeWithTimeout<F extends (...args: any[]) => any>(timeout: number, callFn: F): (...args: Parameters<F>) => Promise<EP<ReturnType<F>>>;

export function memoizeWithTimeout<P extends any[], R>(timeout: number): (callFn: (...args: P) => (R | Promise<R>)) => (...args: P) => Promise<R>;
export function memoizeWithTimeout<F extends (...args: any[]) => any>(timeout: number): (callFn: F) => (...args: Parameters<F>) => Promise<EP<ReturnType<F>>>;

/**
 * https://github.com/rudty/nodekell#juxta
 * @param fn reduce function iterator
 * @param iter iterator
 */
export function juxtA<T>(fn: Iter<Accumulator<T>>, iter: Iter<T | Promise<T>>): Promise<T[]>;

export function juxtA<T extends Iter<any>>(fn: Iter<FlatAccumulator<T>>, iter: T): Promise<FlatForInternalFn<T>[]>;
export function juxtA<T extends Iter<any>>(fn: Iter<FlatAccumulator<T>>): (iter: T) => Promise<FlatForInternalFn<T>[]>;

export function juxtA<T>(fn: Iter<Accumulator<T>>): (iter: Iter<T | Promise<T>>) => Promise<T[]>;

/**
 * https://github.com/rudty/nodekell#juxto
 * @param key get func
 * @param target get obj
 */
export function juxtO<T, K extends keyof T>(key: K[], target: T): Getter<T, K>[];
export function juxtO<T, K>(key: K[], target: T): Getter<T, K>[];
export function juxtO(key: any[]): (target: any) => any[];

/**
 * return a random permutation of iterator
 * https://github.com/rudty/nodekell#shuffle
 *
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Array>} new shuffle Array
 */
export function shuffle<T>(arr: ArrayLike<T>): T[];
export function shuffle<T>(iter: Iter<T>): Promise<T[]>;

/**
 * return a random element
 * @param {Iterable | AsyncIterable} iter any iterable
 */
export function sample<T>(arr: ArrayLike<T>): T;
export function sample<T>(iter: Iter<T>): Promise<T>;

export const _: any;
export const underBar: any;

export function match<T, P extends PairRepeat<2, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<4, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<6, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<8, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<10, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<12, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<14, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<16, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<18, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<20, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<22, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<24, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<26, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<28, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
export function match<T, P extends PairRepeat<30, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;

/**
 *
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 *
 * @example
 *      const m1 = new Map([[1, 2], [3, 4]]);
 *      const m2 = new Map([[5, 6], [7, 8]]);
 *      const r1 = await F.mergeMap(m1, m2);
 *      console.log(r1); // print Map { 1 => 2, 3 => 4, 5 => 6, 7 => 8 }
 *
 *      const m3 = new Map([[1, 2], [3, 4]]);
 *      const o1 = { 5: 6, 7: 8 };
 *      const r2 = await F.mergeMap(m3, o1);
 *      console.log(r2); // print Map { 1 => 2, 3 => 4, '5' => 6, '7' => 8 }
 *
 * @param source1 source from which to copy properties
 * @param source2 source from which to copy properties
 */
export function mergeMap<K1, V1, K2, V2>(source1: Iter<[K1, V1]>, source2: Iter<[K2, V2]>): Promise<Map<ExtractPromise<K1> | ExtractPromise<K2>, ExtractPromise<V1> | ExtractPromise<V2>>>;
export function mergeMap<K1, V1, O1 extends object>(source1: Iter<[K1, V1]>, source2: O1): Promise<Map<ExtractPromise<K1> | string, ExtractPromise<V1> | ExtractPromise<O1[keyof O1]>>>;
export function mergeMap<K1, V1, O1 extends object>(source1: O1, source2: Map<K1, V1>): Promise<Map<ExtractPromise<K1> | string, ExtractPromise<V1> | ExtractPromise<O1[keyof O1]>>>;
export function mergeMap<O1 extends object, O2 extends object>(source1: O1, source2: O2): Promise<Map<string, ExtractPromise<O1[keyof O1]> | ExtractPromise<O2[keyof O2]>>>;
export function mergeMap(source1: Map<any, any>): (source2: object | Iter<[any, any]>) => Promise<Map<any, any>>;
export function mergeMap(source1: object | Iter<[any, any]>): (source2: object | Iter<[any, any]>) => Promise<Map<any, any>>;

/**
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
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
export function mergeMapRight<K1, V1, K2, V2>(source1: Map<K1, V1>, source2: Map<K2, V2>): Promise<Map<ExtractPromise<K1> | ExtractPromise<K2>, ExtractPromise<V1> | ExtractPromise<V2>>>;
export function mergeMapRight<K1, V1, O1 extends object>(source1: Map<K1, V1>, source2: O1): Promise<Map<ExtractPromise<K1> | string, ExtractPromise<V1> | ExtractPromise<O1[keyof O1]>>>;
export function mergeMapRight<K1, V1, O1 extends object>(source1: O1, source2: Map<K1, V1>): Promise<Map<ExtractPromise<K1> | string, ExtractPromise<V1> | ExtractPromise<O1[keyof O1]>>>;
export function mergeMapRight<O1 extends object, O2 extends object>(source1: O1, source2: O2): Promise<Map<string, ExtractPromise<O1[keyof O1]> | ExtractPromise<O2[keyof O2]>>>;
export function mergeMapRight(source1: Map<any, any>): (source2: object | Iter<[any, any]>) => Promise<Map<any, any>>;
export function mergeMapRight(source1: object | Iter<[any, any]>): (source2: object | Iter<[any, any]>) => Promise<Map<any, any>>;
