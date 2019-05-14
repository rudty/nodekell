import {
    Iter,
    EP,
    FlatForInternalFn,
} from './utils';

/**
 * https://github.com/rudty/nodekell#sleep
 *
 * @param t milliseconds
 */
export function sleep(t: number): Promise<void>;

/**
 * https://github.com/rudty/nodekell#withtimeout
 *
 * @param duration
 * @param iter
 */
export function withTimeout<T>(duration: number | Promise<number> | (() => (number | Promise<number>)), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function withTimeout<T>(duration: () => (number | Promise<number>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function withTimeout<T extends Iter<any>>(duration: number | Promise<number> | (() => (number | Promise<number>)), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function withTimeout<T extends Iter<any>>(duration: number | Promise<number> | (() => (number | Promise<number>))): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function withTimeout<T>(duration: number | Promise<number> | (() => (number | Promise<number>))): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function withTimeout<T>(duration: () => (number | Promise<number>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#timeout
 *
 * @param duration
 * @param job
 */
export function timeout<T>(duration: number | Promise<number> | (() => (number | Promise<number>)), job: Promise<T> | (() => Promise<T>)): Promise<T>;

export function timeout<T>(duration: number | Promise<number> | (() => (number | Promise<number>))): (job: Promise<T> | (() => Promise<T>)) => Promise<T>;

/**
 * https://github.com/rudty/nodekell#interval
 *
 * **Note**
 * - if you want stop interval, set false timer.run
 * ```ts
 * const timer = interval(1000, () => fnothing());
 * timer.run = false;
 * ```
 *
 * @param timeout
 * @param timerHandler
 * @param params
 */
export function interval<A extends any[]>(timeout: number, timerHandler: (...args: A) => any, ...args: A): { run: boolean; };

/**
 * https://github.com/rudty/nodekell#rangeinterval
 *
 * @param duration
 * @param endOrBegin
 * @param end
 * @param step
 */
export function rangeInterval(duration: number | Promise<number> | (() => (number | Promise<number>)), end?: number): AsyncIterableIterator<number>;

export function rangeInterval(duration: number | Promise<number> | (() => (number | Promise<number>)), begin: number, end: number, step?: number): AsyncIterableIterator<number>;
