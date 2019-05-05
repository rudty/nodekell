import {
    Iter,
    EP,
    PFlat,
	Flat,
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

export function pcalls<F extends (() => any)[]>(...f: F): AsyncIterableIterator<EP<ReturnType<Flat<F>>>>;
export function pcalls<R>(...f: (() => (R | Promise<R>))[]): AsyncIterableIterator<R>;

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
