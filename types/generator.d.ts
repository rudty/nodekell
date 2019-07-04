// TypeScript Version: 3.4

import {
    EP,
    Iter
} from './utils';

/**
 * https://github.com/rudty/nodekell#repeat
 *
 * **Note**
 * - if use with run or run like function, please use lambda expression or function
 * ```ts
 * const a = Promise.resolve('a');
 * const r0 = await F.run(a, e => repeat(e));
 * const r1 = await F.run(a, e => repeat(10, e));
 * ```
 * @param supply
 */
export function repeat<T>(length: number | Promise<number>, supply: Promise<() => T>): AsyncIterableIterator<EP<T>>;
export function repeat<T>(length: number | Promise<number>, supply: () => T): AsyncIterableIterator<EP<T>>;
export function repeat<T>(length: number | Promise<number>, supply: T): AsyncIterableIterator<EP<T>>;

export function repeat<T>(supply: Promise<() => T>): AsyncIterableIterator<EP<T>>;
export function repeat<T>(supply: () => T): AsyncIterableIterator<EP<T>>;
export function repeat<T>(supply: T): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#range
 *
 * @param endOrBegin
 * @param end
 * @param step
 */
export function range(end?: number): IterableIterator<number>;
export function range(begin: number, end: number, step?: number): IterableIterator<number>;

/**
 * https://github.com/rudty/nodekell#iterate
 *
 * @param f
 * @param value
 */
export function iterate<T>(f: (value: T) => (T | Promise<T>), value: T | Promise<T>): AsyncIterableIterator<T>;

export function iterate<T>(f: (value: T) => (T | Promise<T>)): (value: T | Promise<T>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#enumerate
 *
 * @param iter
 */
// export function enumerate<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<[number, T]>;
export function enumerate<T>(iter: Iter<T>): AsyncIterableIterator<[number, EP<T>]>;
