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
