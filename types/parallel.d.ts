import {
    Iter,
    EP,
    PFlat,
} from './utils';

/**
 * https://github.com/rudty/nodekell#parallel_set_fetch_count
 *
 * @param count
 */
export function parallel_set_fetch_count(count: number): void;

/**
 * https://github.com/rudty/nodekell#pmap
 *
 * @param f
 * @param iter
 */
export function pmap<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
export function pmap<T, R>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T>) => AsyncIterableIterator<R>;

export function pmap<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
export function pmap<T, R>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T>): AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#pfilter
 *
 * @param f
 * @param iter
 */
export function pfilter<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function pfilter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function pfilter<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function pfilter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#pcalls
 *
 * **Note**
 * - if arguments length unknown or over 10 and use union type, please use generic
 * ```ts
 * const a = repeat(5, () => () => 1);
 * const b = repeat(5, () => () => 'a');
 * const c = repeat(5, () => async () => 2);
 * const d = repeat(5, () => async () => 'b');
 * const abcd = await run(concat(a, b), concat(c), concat(d), e => collect(e));
 * const r = pcalls<string | number>(...abcd);
 * ```
 *
 * @param f
 */
export function pcalls<R>(f: Iter<() => (R | Promise<R>)>): AsyncIterableIterator<R>;
export function pcalls<T extends () => any>(f: Iter<T>): AsyncIterableIterator<EP<ReturnType<T>>>;

export function pcalls<R0>(f0: (() => R0 | Promise<R0>)): AsyncIterableIterator<R0>;
export function pcalls<R0, R1>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>)): AsyncIterableIterator<R0 | R1>;
export function pcalls<R0, R1, R2>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>)): AsyncIterableIterator<R0 | R1 | R2>;
export function pcalls<R0, R1, R2, R3>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>)): AsyncIterableIterator<R0 | R1 | R2 | R3>;
export function pcalls<R0, R1, R2, R3, R4>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>), f4: (() => R4 | Promise<R4>)): AsyncIterableIterator<R0 | R1 | R2 | R3 | R4>;
export function pcalls<R0, R1, R2, R3, R4, R5>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>), f4: (() => R4 | Promise<R4>), f5: (() => R5 | Promise<R5>)): AsyncIterableIterator<R0 | R1 | R2 | R3 | R4 | R5>;
export function pcalls<R0, R1, R2, R3, R4, R5, R6>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>), f4: (() => R4 | Promise<R4>), f5: (() => R5 | Promise<R5>), f6: (() => R6 | Promise<R6>)): AsyncIterableIterator<R0 | R1 | R2 | R3 | R4 | R5 | R6>;
export function pcalls<R0, R1, R2, R3, R4, R5, R6, R7>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>), f4: (() => R4 | Promise<R4>), f5: (() => R5 | Promise<R5>), f6: (() => R6 | Promise<R6>), f7: (() => R7 | Promise<R7>)): AsyncIterableIterator<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7>;
export function pcalls<R0, R1, R2, R3, R4, R5, R6, R7, R8>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>), f4: (() => R4 | Promise<R4>), f5: (() => R5 | Promise<R5>), f6: (() => R6 | Promise<R6>), f7: (() => R7 | Promise<R7>), f8: (() => R8 | Promise<R8>)): AsyncIterableIterator<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>;
export function pcalls<R0, R1, R2, R3, R4, R5, R6, R7, R8, R9>(f0: (() => R0 | Promise<R0>), f1: (() => R1 | Promise<R1>), f2: (() => R2 | Promise<R2>), f3: (() => R3 | Promise<R3>), f4: (() => R4 | Promise<R4>), f5: (() => R5 | Promise<R5>), f6: (() => R6 | Promise<R6>), f7: (() => R7 | Promise<R7>), f8: (() => R8 | Promise<R8>), f9: (() => R9 | Promise<R9>)): AsyncIterableIterator<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>;
export function pcalls<R>(...f: (() => (R | Promise<R>))[]): AsyncIterableIterator<R>;
export function pcalls(...f: (() => any)[]): AsyncIterableIterator<any>;

/**
 * https://github.com/rudty/nodekell#pfmap
 *
 * **Note**
 * - if use run or run like function and type error occurred, please use lambda expression or function
 * ```ts
 * const a = [[1], Promise.resolve(['a']), [4], [5]];
 * const r0 = await F.run(a, F.pfmap(e => e)); // type error
 * const r1 = await F.run(a, e0 => F.pfmap(e1 => e1, e0)); // AsyncIterableIterator<string | number>
 * ```
 *
 * @param f
 * @param iter
 */
export function pfmap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;
export function pfmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;

export function pfmap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
export function pfmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;

/**
 * https://github.com/rudty/nodekell#pflatmap
 *
 * **Note**
 * - if use run or run like function and type error occurred, please use lambda expression or function
 * ```ts
 * const a = [[1], Promise.resolve(['a']), [4], [5]];
 * const r0 = await F.run(a, F.pflatMap(e => e)); // type error
 * const r1 = await F.run(a, e0 => F.pflatMap(e1 => e1, e0)); // AsyncIterableIterator<string | number>
 * ```
 *
 * @param f
 * @param iter
 */
export function pflatMap<T, R = T>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;
export function pflatMap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;

export function pflatMap<T, R = T>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;
export function pflatMap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
