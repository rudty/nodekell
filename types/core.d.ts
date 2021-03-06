// TypeScript Version: 3.4

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
    ExtractMapValue,
    ExtractMapKey,
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
// export function seq<T extends Iter<any>>(iter: T): AsyncIterableIterator<ReturnTypeOfIter<T>>;
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

export function add(a: number): (b: number) => number;
export function add(a: string): (b: string) => string;

/**
 * ```ts
 * sub(2, 1) === 1;
 * ```
 */
export function sub(a: number, b: number): number;

export function sub(a: number): (b: number) => number;

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
 * https://github.com/rudty/nodekell#isnil
 *
 * ```ts
 * isNil(undefined) === true;
 * isNil(false) === false;
 * ```
 */
export function isNil(a: any): boolean;

export type Getter<T, K> =
    T extends Map<any, any> ?
        K extends ExtractMapKey<T> ?
            K extends keyof T ?
                ExtractMapValue<T> | T[K]
            : ExtractMapValue<T> | undefined
        : K extends keyof T ?
            T[K]
        : undefined
    :
    T extends any[] ?
        K extends keyof T ?
            K extends number ?
                T[K] | undefined
            : T[K]
        : undefined
    :
    T extends object ?
        K extends keyof T ?
            T[K]
        : undefined
    :
    K extends keyof T ?
        T[K]
    : unknown;

/**
 * https://github.com/rudty/nodekell#get
 *
 * ```ts
 * let obj = {
 *   "world": 1
 * };
 * F.get("world", obj) === 1;
 * ```
 *
 * @param key
 * @param target
 */
export function get<T, K extends keyof T>(key: K, target: T): Getter<T, K>;
export function get<T, K>(key: K, target: T): Getter<T, K>;

export function get<T, K extends keyof T>(key: K): (target: T) => Getter<T, K>;
export function get<T, K>(key: K): (target: T) => Getter<T, K>;

/**
 * https://github.com/rudty/nodekell#getorelse
 *
 * ```ts
 * let obj = {
 *   "world": 1
 * };
 * F.getOrElse("world", 0, obj) === 1;
 * F.getOrElse("hello", 0, obj) === 0;
 * ```
 *
 * @param key
 * @param target
 */
export function getOrElse<T, D, K extends keyof T>(key: K, defaultValue: D, target: T): Getter<T, K> extends undefined ? D: Getter<T, K> | D;
export function getOrElse<T, D, K>(key: K, defaultValue: D, target: T): Getter<T, K> extends undefined ? D: Getter<T, K> | D;

export function getOrElse<T, D, K extends keyof T>(key: K, defaultValue: D): (target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;
export function getOrElse<T, D, K>(key: K, defaultValue: D): (target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;

export function getOrElse<T, D, K extends keyof T>(key: K): (defaultValue: D, target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;
export function getOrElse<T, D, K>(key: K): (defaultValue: D, target: T) => Getter<T, K> extends undefined ? D: Getter<T, K> | D;

/**
 * https://github.com/rudty/nodekell#has
 *
 * @param key
 * @param target
 */
// tslint:disable-next-line: no-unnecessary-generics
export function has<T>(key: any, target: T): boolean;
// export function has(key: any, target: any): boolean;

// tslint:disable-next-line: no-unnecessary-generics
export function has<T>(key: any): (target: T) => boolean;
// export function has(key: any): (target: any) => boolean;

/**
 * https://github.com/rudty/nodekell#prop
 *
 * @param key
 * @param target
 */
export function prop<T, K extends keyof T>(key: K, target: T): T[K];

export function prop<T, K extends keyof T>(key: K): (target: T) => T[K];

/**
 * https://github.com/rudty/nodekell#proporelse
 *
 * @param key
 * @param target
 */
export function propOrElse<T, D, K extends keyof T>(key: K, defaultValue: D, target: T): T[K] extends undefined ? D : T[K] | D;
export function propOrElse<T, D, K extends keyof T>(key: K, defaultValue: D): (target: T) => T[K] extends undefined ? D : T[K] | D;
export function propOrElse<T, D, K extends keyof T>(key: K): (defaultValue: D, target: T) => T[K] extends undefined ? D : T[K] | D;

/**
 *
 *
 * @param a
 * @param b
 */
export function equals<T>(a: T, b: T): boolean;

export function equals<T>(a: T): (b: T) => boolean;

/**
 * check string, number, bigint, boolean, null, undefined, and symbol.
 * @example
 *      F.isPrimitive(1) // true
 *      F.isPrimitive(null) // true
 *      F.isPrimitive(0) // true
 *      F.isPrimitive(Symbol("HELLO")); // true
 *      F.isPrimitive("HELLO") // true
 *      F.isPrimitive(new String("HELLO")) // false
 *      F.isPrimitive(new Number(123)) // false
 *      F.isPrimitive({}) // false
 *      F.isPrimitive([]) // false
 *      F.isPrimitive(()=>{}) // false
 */
export function isPrimitive(a: string): true;
export function isPrimitive(a: number): true;
// export function isPrimitive(a: bigint): true; // typescript error
export function isPrimitive(a: boolean): true;
export function isPrimitive(a: null): true;
export function isPrimitive(a: undefined): true;
export function isPrimitive(a: symbol): true;
export function isPrimitive(a: any): boolean;
