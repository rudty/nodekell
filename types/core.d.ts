import {
    CurriedFunction2,
    CurriedFunction3,
    CurriedFunction4,
    CurriedFunction5,
    CurriedFunction6,
    CurriedFunction7,
    CurriedFunction8,
    Iter,
    EP,
} from './utils';

/**
 * https://github.com/rudty/nodekell#curry
 *
 * please use arguments length 8 or less
 *
 * @param f
 */
export function curry<T1, T2, R>(f: (t1: T1, t2: T2) => R): CurriedFunction2<T1, T2, R>;
export function curry<T1, T2, T3, R>(f: (t1: T1, t2: T2, T3: T3) => R): CurriedFunction3<T1, T2, T3, R>;
export function curry<T1, T2, T3, T4, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4) => R): CurriedFunction4<T1, T2, T3, T4, R>;
export function curry<T1, T2, T3, T4, T5, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R): CurriedFunction5<T1, T2, T3, T4, T5, R>;
export function curry<T1, T2, T3, T4, T5, T6, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R): CurriedFunction6<T1, T2, T3, T4, T5, T6, R>;
export function curry<T1, T2, T3, T4, T5, T6, T7, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => R): CurriedFunction7<T1, T2, T3, T4, T5, T6, T7, R>;
export function curry<T1, T2, T3, T4, T5, T6, T7, T8, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8) => R): CurriedFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>;

/**
 * https://github.com/rudty/nodekell#seq
 *
 * make generator
 *
 * do not need to check if iter
 *
 * Symbol.asyncIterator or Symbol.iterator
 */
// export function seq<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function seq<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 *
 * ```ts
 * identity('hello') === 'hello';
 * identity(1234) === 1234;
 * ```
 */
export function identity<T>(e: T): T;

/**
 * internal function
 *
 * do nothing
 */
export function fnothing(): void;

/**
 * ```ts
 * add(1, 2) === 3;
 * add('hello', 'world') === 'helloworld';
 * ```
 */
export function add(a: number, b: number): number;
export function add(a: string, b: string): string;

/**
 * ```ts
 * sub(2, 1) === 1;
 * ```
 */
export function sub(a: number, b: number): number;

/**
 * ```ts
 * inc(1) === 2;
 * ```
 */
export function inc(a: number): number;

/**
 * ```ts
 * dec(2) === 1;
 * ```
 */
export function dec(a: number): number;

/**
 * ```ts
 * first([0,1,2,3]) === 0;
 * ```
 */
export function first<T extends any[]>(a: T): T[0];

/**
 * ```ts
 * second([0,1,2,3]) === 1;
 * ```
 */
export function second<T extends any[]>(a: T): T[1];

/**
 * ```ts
 * isNil(undefined) === true;
 * isNil(false) === false;
 * ```
 */
export function isNil(a: any): boolean;

/**
 * ```ts
 * notNil(undefined) === false;
 * notNil(false) === true;
 * ```
 * @deprecated use isNil instead
 */
export function notNil(a: any): boolean;
