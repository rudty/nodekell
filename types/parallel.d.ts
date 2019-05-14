import {
    Iter,
    EP,
    PFlat,
	Flat,
    FlatForInternalFn,
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
export function pmap<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
// export function pmap<T, R>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T>): AsyncIterableIterator<R>;

export function pmap<T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R, iter: T): AsyncIterableIterator<EP<R>>;
export function pmap<T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R): (iter: T) => AsyncIterableIterator<EP<R>>;

export function pmap<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
// export function pmap<T, R>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T>) => AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#pfilter
 *
 * @param f
 * @param iter
 */
export function pfilter<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function pfilter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function pfilter<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function pfilter<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function pfilter<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function pfilter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#pcalls
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
 * @param f
 * @param iter
 */
export function pfmap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
export function pfmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;

export function pfmap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;
export function pfmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;

/**
 * https://github.com/rudty/nodekell#pflatmap
 *
 * @param f
 * @param iter
 */
export function pflatMap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
export function pflatMap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;

export function pflatMap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;
export function pflatMap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;
