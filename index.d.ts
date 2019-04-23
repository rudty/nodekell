/**
 * Type definitions for nodekell 1.2
 */

export type Iter<T> = Iterable<T> | AsyncIterable<T>; // | IterableIterator<T> | AsyncIterableIterator<T> | T[];

export type IterOnly<T> = T extends Iter<any> ? T : T[];

export type ExtractPromise<T> = T extends Promise<infer PT> ? PT : T;
export type EP<T> = ExtractPromise<T>;

export type ExtractMap<T> = T extends Map<infer K, infer V> ? [K, V] : unknown;

/**
 * Non-Promise Iter Flat
 */
export type Flat<T> = T extends Iter<infer E0> ? E0 : T;

/**
 * Promise Iter Flat
 */
export type PFlat<T> = EP<Flat<EP<T>>>;

/**
 * Non-Promise Iter Deep Flat
 */
export type DFlat<T> =
    T extends Iter<infer E0> ?
    E0 extends Iter<infer E1> ?
    E1 extends Iter<infer E2> ?
    E2 extends Iter<infer E3> ?
    E3 extends Iter<infer E4> ?
    E4 extends Iter<infer E5> ?
    E5 extends Iter<infer E6> ?
    E6 extends Iter<infer E7> ?
    E7 extends Iter<infer E8> ?
    E8 extends Iter<infer E9> ?
    E9 extends Iter<infer E10> ?
    E10 extends Iter<infer E11> ?
    E11 : // 12
    E10 :
    E9 :
    E8 :
    E7 :
    E6 :
    E5 :
    E4 :
    E3 :
    E2 :
    E1 :
    E0 :
    T;

/**
 * Promise Iter Deep Flat
 */
export type PDFlat<T> =
    EP<DFlat<
    EP<DFlat<
    EP<DFlat<
    EP<DFlat<
    EP<DFlat<
    EP<DFlat<
    EP<DFlat< // 7
    EP<T>>>>>>>>>>>>>>>;

export interface CurriedFunction2<T1, T2, R> {
    (t1: T1): (t2: T2) => R;
    (t1: T1, t2: T2): R;
}

export interface CurriedFunction3<T1, T2, T3, R> {
    (t1: T1): CurriedFunction2<T2, T3, R>;
    (t1: T1, t2: T2): (t3: T3) => R;
    (t1: T1, t2: T2, t3: T3): R;
}

export interface CurriedFunction4<T1, T2, T3, T4, R> {
    (t1: T1): CurriedFunction3<T2, T3, T4, R>;
    (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
    (t1: T1, t2: T2, t3: T3): (t4: T4) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4): R;
}

export interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
    (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
    (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}

export interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
    (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>;
    (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
}

export interface CurriedFunction7<T1, T2, T3, T4, T5, T6, T7, R> {
    (t1: T1): CurriedFunction6<T2, T3, T4, T5, T6, T7, R>;
    (t1: T1, t2: T2): CurriedFunction5<T3, T4, T5, T6, T7, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction4<T4, T5, T6, T7, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction3<T5, T6, T7, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): CurriedFunction2<T6, T7, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): (t7: T7) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): R;
}

export interface CurriedFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
    (t1: T1): CurriedFunction7<T2, T3, T4, T5, T6, T7, T8, R>;
    (t1: T1, t2: T2): CurriedFunction6<T3, T4, T5, T6, T7, T8, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction5<T4, T5, T6, T7, T8, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction4<T5, T6, T7, T8, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): CurriedFunction3<T6, T7, T8, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): CurriedFunction2<T7, T8, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): (t8: T8) => R;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): R;
}

//
// core.js
//

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
export function seq<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function seq<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * internal function
 *
 * ```ts
 * ioe('hello') === 'hello';
 * ioe(1234) === 1234;
 * ```
 */
export function ioe<T>(e: T): T;

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
 * notNil(undefined) === false;
 * notNil(false) === true;
 * ```
 */
export function notNil(a: any): boolean;

//
// prelude.js
//

/**
 * https://github.com/rudty/nodekell#run
 *
 * **Note**
 * - originally allow Promise wrapped functions. but that is complicated. so don't support Promise wrapped functions type.
 * - please use functions length 20 or less
 * - run implement with foldl
 *
 * ```ts
 * // like `$` or `.`
 *
 * const a = [1,2,3,4,5];
 * const r = run(a,
 *               map(e => e + 1), // a = [2,3,4,5,6]
 *               filter(e => e < 4), // a = [2,3]
 *               take(Infinity));
 * result:
 * [ 2 , 3 ]
 * ```
 *
 * @param t
 * @param ...f
 */
export function run<T>(t: T | Promise<T>): Promise<T>;
export function run<T, R0>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>)): Promise<R0>;
export function run<T, R0, R1>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>)): Promise<R1>;
export function run<T, R0, R1, R2>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>)): Promise<R2>;
export function run<T, R0, R1, R2, R3>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>)): Promise<R3>;
export function run<T, R0, R1, R2, R3, R4>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>)): Promise<R4>;
export function run<T, R0, R1, R2, R3, R4, R5>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>)): Promise<R5>;
export function run<T, R0, R1, R2, R3, R4, R5, R6>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>)): Promise<R6>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>)): Promise<R7>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>)): Promise<R8>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>)): Promise<R9>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>)): Promise<R10>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>)): Promise<R11>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>)): Promise<R12>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>)): Promise<R13>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>)): Promise<R14>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>)): Promise<R15>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>)): Promise<R16>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>), f17: (r16: R16) => (R17 | Promise<R17>)): Promise<R17>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>), f17: (r16: R16) => (R17 | Promise<R17>), f18: (r17: R17) => (R18 | Promise<R18>)): Promise<R18>;
export function run<T, R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(t: T | Promise<T>, f0: (t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>), f17: (r16: R16) => (R17 | Promise<R17>), f18: (r17: R17) => (R18 | Promise<R18>), f19: (r18: R18) => (R19 | Promise<R19>)): Promise<R19>;

/**
 * https://github.com/rudty/nodekell#head
 *
 * @param iter
 */
export function head<T>(iter: Iter<T | Promise<T>>): Promise<T>;
export function head<T>(iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#tail
 *
 * @param iter
 */
export function tail<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function tail<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#drop
 *
 * @param count
 * @param iter
 */
export function drop<T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function drop<T>(count: number): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function drop<T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function drop<T>(count: number, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#dropwhile
 *
 * @param f
 * @param iter
 */
export function dropWhile<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function dropWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function dropWhile<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function dropWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#filter
 *
 * @param f
 * @param iter
 */
export function filter<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function filter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function filter<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function filter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#map
 *
 * @param f
 * @param iter
 */
export function map<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
export function map<T, R>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T>) => AsyncIterableIterator<R>;

export function map<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
export function map<T, R>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T>): AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#fmap
 *
 * @param f
 * @param iter
 */
export function fmap<T, R>(f: (elem: IterOnly<PFlat<T>>) => (Iter<R> | Promise<Iter<R>>)): (iter: T) => AsyncIterableIterator<PFlat<Iter<R>>>;
export function fmap<T, R>(f: (elem: IterOnly<PFlat<T>>) => R): (iter: T) => AsyncIterableIterator<PFlat<EP<R>>>;

export function fmap<T, R>(f: (elem: IterOnly<PFlat<T>>) => (Iter<R> | Promise<Iter<R>>), iter: T): AsyncIterableIterator<PFlat<Iter<R>>>;
export function fmap<T, R>(f: (elem: IterOnly<PFlat<T>>) => R, iter: T): AsyncIterableIterator<PFlat<EP<R>>>;

/**
 * https://github.com/rudty/nodekell#flatMap
 *
 * as fmap
 *
 * @param f
 * @param iter
 */
export function flatMap<T, R>(f: (elem: IterOnly<PFlat<T>>) => (Iter<R> | Promise<Iter<R>>)): (iter: T) => AsyncIterableIterator<PFlat<Iter<R>>>;
export function flatMap<T, R>(f: (elem: IterOnly<PFlat<T>>) => R): (iter: T) => AsyncIterableIterator<PFlat<EP<R>>>;

export function flatMap<T, R>(f: (elem: IterOnly<PFlat<T>>) => (Iter<R> | Promise<Iter<R>>), iter: T): AsyncIterableIterator<PFlat<Iter<R>>>;
export function flatMap<T, R>(f: (elem: IterOnly<PFlat<T>>) => R, iter: T): AsyncIterableIterator<PFlat<EP<R>>>;

/**
 * https://github.com/rudty/nodekell#flat
 *
 * @param iter
 */
export function flat<T>(iter: Iter<T>): AsyncIterableIterator<PFlat<T>>;

/**
 * https://github.com/rudty/nodekell#dflat
 *
 * **Note**
 * - don't use too deep iter
 * - please use arguments length 10 or less (if over 10, please use generic)
 *
 * @param t
 */
export function dflat<T1>(a: T1): AsyncIterableIterator<PDFlat<T1>>;
export function dflat<T1, T2>(a: T1, b: T2): AsyncIterableIterator<PDFlat<T1 | T2>>;
export function dflat<T1, T2, T3>(a: T1, b: T2, c: T3): AsyncIterableIterator<PDFlat<T1 | T2 | T3>>;
export function dflat<T1, T2, T3, T4>(a: T1, b: T2, c: T3, d: T4): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4>>;
export function dflat<T1, T2, T3, T4, T5>(a: T1, b: T2, c: T3, d: T4, e: T5): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4 | T5>>;
export function dflat<T1, T2, T3, T4, T5, T6>(a: T1, b: T2, c: T3, d: T4, e: T5, f: T6): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4 | T5 | T6>>;
export function dflat<T1, T2, T3, T4, T5, T6, T7>(a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4 | T5 | T6 | T7>>;
export function dflat<T1, T2, T3, T4, T5, T6, T7, T8>(a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>>;
export function dflat<T1, T2, T3, T4, T5, T6, T7, T8, T9>(a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>>;
export function dflat<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10): AsyncIterableIterator<PDFlat<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>>;
export function dflat<T>(...a: T[]): AsyncIterableIterator<PDFlat<T>>;
export function dflat(...a: any[]): AsyncIterableIterator<any>;

/**
 * https://github.com/rudty/nodekell#take
 *
 * @param count
 * @param iter
 */
export function take<T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function take<T>(count: number): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function take<T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function take<T>(count: number, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#takewhile
 *
 * @param f
 * @param iter
 */
export function takeWhile<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function takeWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function takeWhile<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function takeWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#foldl
 *
 * @param f
 * @param init
 * @param iter
 */

// export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>) => (iter: Iter<T | Promise<T>>) => Promise<T>;

// export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>, iter: Iter<T | Promise<T>>) => Promise<T>;

export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>)): CurriedFunction2<T | Promise<T>, Iter<T | Promise<T>>, Promise<T>>;
export function foldl<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): CurriedFunction2<T, Iter<T>, Promise<EP<T>>>;

export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>), init: T | Promise<T>): (iter: Iter<T | Promise<T>>) => Promise<T>;
export function foldl<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), init: T): (iter: Iter<T>) => Promise<EP<T>>;

export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>), init: T | Promise<T>, iter: Iter<T | Promise<T>>): Promise<T>;
export function foldl<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), init: T, iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#foldl1
 *
 * @param f
 * @param iter
 */
export function foldl1<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => Promise<T>;
export function foldl1<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => Promise<EP<T>>;

export function foldl1<T>(f: (acc: T, elem: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): Promise<T>;
export function foldl1<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#reduce
 *
 * as foldl1
 *
 * @param f
 * @param iter
 */
export function reduce<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => Promise<T>;
export function reduce<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => Promise<EP<T>>;

export function reduce<T>(f: (acc: T, elem: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): Promise<T>;
export function reduce<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#scanl
 *
 * @param f
 * @param init
 * @param iter
 */
// export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>)): (init: T | Promise<T>) => (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

// export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>)): (init: T | Promise<T>, iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>)): CurriedFunction2<T | Promise<T>, Iter<T | Promise<T>>, AsyncIterableIterator<T>>;
export function scanl<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>)): CurriedFunction2<T, Iter<T>, AsyncIterableIterator<EP<T>>>;

export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>), init: T | Promise<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function scanl<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>), init: T): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>), init: T | Promise<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function scanl<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>), init: T, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#scanl1
 *
 * @param f
 * @param iter
 */
export function scanl1<T>(f: (a: T, b: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function scanl1<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function scanl1<T>(f: (a: T, b: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function scanl1<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#reverse
 *
 * @param iter
 */
export function reverse<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function reverse<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#foldr
 *
 * @param f
 * @param init
 * @param iter
 */
// export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>) => (iter: Iter<T | Promise<T>>) => Promise<T>;

// export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>, iter: Iter<T | Promise<T>>) => Promise<T>;

export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>)): CurriedFunction2<T | Promise<T>, Iter<T | Promise<T>>, Promise<T>>;
export function foldr<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): CurriedFunction2<T, Iter<T>, Promise<EP<T>>>;

export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>), init: T | Promise<T>): (iter: Iter<T | Promise<T>>) => Promise<T>;
export function foldr<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), init: T): (iter: Iter<T>) => Promise<EP<T>>;

export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>), init: T | Promise<T>, iter: Iter<T | Promise<T>>): Promise<T>;
export function foldr<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), init: T, iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#foldr1
 *
 * @param f
 * @param iter
 */
export function foldr1<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => Promise<T>;
export function foldr1<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => Promise<EP<T>>;

export function foldr1<T>(f: (acc: T, elem: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): Promise<T>;
export function foldr1<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#zip
 *
 * @param iter1
 * @param iter2
 */
export function zip<T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[T, Y]>;
export function zip<T, Y>(iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<[EP<T>, EP<Y>]>;

export function zip<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<[EP<T>, EP<Y>]>;
export function zip<T, Y>(iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<[EP<T>, EP<Y>]>;

/**
 * https://github.com/rudty/nodekell#zipwith
 *
 * @param f
 * @param iter1
 * @param iter2
 */
// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => [R1, R2]): (a: Iter<T | Promise<T>>) => (b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;
// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => (Promise<[R1, R2]> | Promise<(R1 | R2)[]>)): (a: Iter<T | Promise<T>>) => (b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;

// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => [R1, R2]): (a: Iter<T | Promise<T>>, b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;
// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => (Promise<[R1, R2]> | Promise<(R1 | R2)[]>)): (a: Iter<T | Promise<T>>, b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;

export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => ([R1, R2] | Promise<[R1, R2]> | Promise<(R1 | R2)[]>)): CurriedFunction2<Iter<T | Promise<T>>, Iter<Y | Promise<Y>>, AsyncIterableIterator<[R1, R2]>>;
export function zipWith<T, Y, R1, R2>(f: (a: EP<T>, b: EP<Y>) => ([R1, R2] | Promise<[R1, R2]> | Promise<(R1 | R2)[]>)): CurriedFunction2<Iter<T>, Iter<Y>, AsyncIterableIterator<[R1, R2]>>;

export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => ([R1, R2] | Promise<[R1, R2]> | Promise<(R1 | R2)[]>), iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;
export function zipWith<T, Y, R1, R2>(f: (a: EP<T>, b: EP<Y>) => ([R1, R2] | Promise<[R1, R2]> | Promise<(R1 | R2)[]>), iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<[R1, R2]>;

export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => ([R1, R2] | Promise<[R1, R2]> | Promise<(R1 | R2)[]>), iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<[R1, R2]>;
export function zipWith<T, Y, R1, R2>(f: (a: EP<T>, b: EP<Y>) => ([R1, R2] | Promise<[R1, R2]> | Promise<(R1 | R2)[]>), iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<[R1, R2]>;

//
// stream.js
//

/**
 * https://github.com/rudty/nodekell#rangeof
 *
 * @deprecated use `flat` or `dflat` instead
 * @param a
 */
export function rangeOf<T>(...a: T[]): AsyncIterableIterator<PFlat<T>>;

/**
 * No Document
 *
 * @param supply
 * @param iter
 */
export function firstOrGet<T, Y>(supply: () => (Y | Promise<Y>)): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: () => Y): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Promise<() => (Y | Promise<Y>)>): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Promise<() => Y>): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Y | Promise<Y>): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Y): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: () => (Y | Promise<Y>), iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: () => Y, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Promise<() => (Y | Promise<Y>)>, iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Promise<() => Y>, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Y | Promise<Y>, iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Y, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#emptythen
 *
 * @param supply
 * @param iter
 */
export function emptyThen<T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>), iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#
 *
 * @param iter
 */
// export function collect<T>(iter: Iter<T | Promise<T>>): Promise<T[]>;
export function collect<T>(iter: Iter<T>): Promise<EP<T>[]>;

/**
 * https://github.com/rudty/nodekell#collectmap
 *
 * **Note**
 * - if want you high quality type, use type assertion
 * ```ts
 * const a = [['a', 0], ['b', 1]] as [string, number][];
 * const r = await collectMap(a); // Map<string, number>
 * ```
 *
 * @param iter
 */
export function collectMap<T extends any[]>(iter: Iter<T | Promise<T>>): Promise<Map<T[0], T[1]>>;
// export function collectMap<K, V>(iter: Iter<[K, V] | Promise<[K, V]>>): Promise<Map<K, V>>;

/**
 * https://github.com/rudty/nodekell#collectset
 *
 * @param iter
 */
export function collectSet<T>(iter: Iter<T | Promise<T>>): Promise<Set<T>>;
export function collectSet<T>(iter: Iter<T>): Promise<Set<EP<T>>>;

/**
 * https://github.com/rudty/nodekell#foreach
 *
 * @param f
 * @param iter
 */
export function forEach<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => Promise<R[]>;
export function forEach<T, R>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T>) => Promise<R[]>;

export function forEach<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): Promise<R[]>;
export function forEach<T, R>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T>): Promise<R[]>;

/**
 * https://github.com/rudty/nodekell#distinctby
 *
 * @param f
 * @param iter
 */
export function distinctBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function distinctBy<T>(f: (elem: EP<T>) => any): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function distinctBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function distinctBy<T>(f: (elem: EP<T>) => any, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#distinct
 *
 * @param iter
 */
export function distinct<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function distinct<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#some
 *
 * @param f
 * @param iter
 */
export function some<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
export function some<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => Promise<boolean>;

export function some<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<boolean>;
export function some<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<boolean>;

/**
 * https://github.com/rudty/nodekell#every
 *
 * @param f
 * @param iter
 */
export function every<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
export function every<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => Promise<boolean>;

export function every<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<boolean>;
export function every<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<boolean>;

/**
 * https://github.com/rudty/nodekell#maxby
 *
 * @param f
 * @param iter
 */
export function maxBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => Promise<T>;

export function maxBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#minby
 *
 * @param f
 * @param iter
 */
export function minBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => Promise<T>;

export function minBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#count
 *
 * @param iter
 */
export function count(iter: Iter<any>): Promise<number>;

/*
  about types of sum, max, min

  set type number or string, an bug occurs

  so use generic
*/

/**
 * https://github.com/rudty/nodekell#sum
 *
 * **Note**
 * - please use can summed value
 *
 * @param iter
 */
export function sum<T>(iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#max
 *
 * **Note**
 * - please use can ordered value
 *
 * @param iter
 */
export function max<T>(iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#min
 *
 * **Note**
 * - please use can ordered value
 *
 * @param iter
 */
export function min<T>(iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#average
 *
 * @param iter
 */
export function average(iter: Iter<number | Promise<number>>): Promise<number>;

/**
 * https://github.com/rudty/nodekell#splitby
 *
 * @param f
 * @param any
 */
export function splitBy<T, R>(f: (elem: T) => (Iter<R> | Promise<Iter<R>>)): (any: T) => AsyncIterableIterator<R>;

export function splitBy<T, R>(f: (elem: T) => (Iter<R> | Promise<Iter<R>>), any: T): AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#errorthen
 *
 * @param supply
 * @param iter
 */
export function errorThen<T, Y>(supply: (error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: (error: any) => (Iter<Y> | Promise<Iter<Y>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y> | Promise<Iter<Y>>)>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: (error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: (error: any) => (Iter<Y> | Promise<Iter<Y>>), iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y> | Promise<Iter<Y>>)>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#then
 *
 * @param f
 * @param t
 */
export function then<T, R>(f: (t: T) => R): (t: T) => R;

export function then<T, R>(f: (t: T) => R, t: T): R;

/**
 * https://github.com/rudty/nodekell#buffer
 *
 * @param supply
 * @param iter
 */
export function buffer<T>(supply: number | Promise<number>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<[T]>;
export function buffer<T>(supply: number | Promise<number>): (iter: Iter<T>) => AsyncIterableIterator<[EP<T>]>;

export function buffer<T>(supply: number | Promise<number>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<[T]>;
export function buffer<T>(supply: number | Promise<number>, iter: Iter<T>): AsyncIterableIterator<[EP<T>]>;

//
// tsql.js
//

/**
 * https://github.com/rudty/nodekell#groupby
 *
 * @param f
 * @param iter
 */
export function groupBy<K, V>(f: (elem: V) => (K | Promise<K>)): (iter: Iter<V | Promise<V>>) => Promise<Map<K, V[]>>;
export function groupBy<K, V>(f: (elem: EP<V>) => (K | Promise<K>)): (iter: Iter<V>) => Promise<Map<K, EP<V>[]>>;

export function groupBy<K, V>(f: (elem: V) => (K | Promise<K>), iter: Iter<V | Promise<V>>): Promise<Map<K, V[]>>;
export function groupBy<K, V>(f: (elem: EP<V>) => (K | Promise<K>), iter: Iter<V>): Promise<Map<K, EP<V>[]>>;

/**
 * https://github.com/rudty/nodekell#concat
 *
 * @param iter1
 * @param iter2
 */
export function concat<T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<T | Y>;
export function concat<T, Y>(iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function concat<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<T | Y>;
export function concat<T, Y>(iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#union
 *
 * @param iter1
 * @param iter2
 */
export function union<T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<T | Y>;
export function union<T, Y>(iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function union<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<T | Y>;
export function union<T, Y>(iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<EP<T> | EP<Y>>;

export type InnerJoinObject<T1 extends object, T2 extends object> = { [P in keyof T1 | keyof T2]: P extends keyof T1 ? T1[P] : P extends keyof T2 ? T2[P] : unknown };
export type InnerJoinMap<T1, T2> = Map<T1 extends Map<infer K1, infer V1> ? T2 extends Map<infer K2, infer V2> ? K1 | K2 : unknown : unknown, T1 extends Map<infer K1, infer V1> ? T2 extends Map<infer K2, infer V2> ? V1 | V2 : unknown : unknown>;
// export type InnerJoinCustomIterable<T1 extends { set: (...arg: any[]) => any; } & Iter<any>, T2 extends { set: (...arg: any[]) => any; } & Iter<any>> = AsyncIterableIterator<T1 | T2>;

// type InnerJoinObjectTest1 = InnerJoinObject<{ id: number; name: string; }, { id: number; length: number; }>;
// type InnerJoinObjectTest2 = InnerJoinObject<{ id: number; length: number; }, { id: number; name: string; }>;

// type InnerJoinMapTest1 = InnerJoinMap<Map<"string" | "number" | "object", (string | number | null)[]>, Map<"string" | "number", (string | number)[]>>;
// type InnerJoinMapTest2 = InnerJoinMap<Map<"string" | "number", (string | number)[]>, Map<"string" | "number" | "object", (string | number | null)[]>>;

/**
 * https://github.com/rudty/nodekell#innerjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function innerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinMap<T1, T2>>>;

export function innerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function innerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function innerJoin<T1 extends object, T2 extends object>(f: (elem1: T2, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinObject<T1, T2>>>;

export function innerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinObject<T1, T2>>;

export function innerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinObject<T1, T2>>;

/**
 * https://github.com/rudty/nodekell#leftinnerjoin
 *
 * as innerJoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function leftInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinMap<T1, T2>>>;

export function leftInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function leftInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function leftInnerJoin<T1 extends object, T2 extends object>(f: (elem1: T2, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinObject<T1, T2>>>;

export function leftInnerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinObject<T1, T2>>;

export function leftInnerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinObject<T1, T2>>;

/**
 * https://github.com/rudty/nodekell#rightinnerjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function rightInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2 | Promise<T2>, elem1: T1 | Promise<T1>) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinMap<T2, T1>>>;

export function rightInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2 | Promise<T2>, elem1: T1 | Promise<T1>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinMap<T2, T1>>;

export function rightInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2 | Promise<T2>, elem1: T1 | Promise<T1>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinMap<T2, T1>>;

export function rightInnerJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinObject<T2, T1>>>;

export function rightInnerJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinObject<T2, T1>>;

export function rightInnerJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinObject<T2, T1>>;

export type OuterJoinObject<T1 extends object, T2 extends object> = { [P in keyof T1 | keyof T2]: P extends keyof T1 ? T1[P] : P extends keyof T2 ? T2[P] | undefined : unknown };
/**
 * K2, V2 is optional, but I can't implementation that type.
 */
export type OuterJoinMap<T1, T2> = Map<T1 extends Map<infer K1, infer V1> ? T2 extends Map<infer K2, infer V2> ? K1 | K2 : unknown : unknown, T1 extends Map<infer K1, infer V1> ? T2 extends Map<infer K2, infer V2> ? V1 | V2 : unknown : unknown>;

// type OuterJoinObjectTest = OuterJoinObject<{ id: number; value: number; }, { id: number; name: string; }>;
// type OuterJoinMapTest = OuterJoinMap<Map<string | number, string | number>, Map<string, number>>;

/*
ExpectType OuterJoinObjectTest
{
  id: number;
  value: number;
  name: string | undefined;
}
*/

/**
 * https://github.com/rudty/nodekell#outerjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function outerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinMap<T1, T2>>>;

export function outerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function outerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function outerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinObject<T1, T2>>>;

export function outerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinObject<T1, T2>>;

export function outerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinObject<T1, T2>>;

/**
 * https://github.com/rudty/nodekell#leftouterjoin
 *
 * as outerJoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function leftOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinMap<T1, T2>>>;

export function leftOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function leftOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function leftOuterJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinObject<T1, T2>>>;

export function leftOuterJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinObject<T1, T2>>;

export function leftOuterJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinObject<T1, T2>>;

/**
 * https://github.com/rudty/nodekell#rightouterjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function rightOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinMap<T2, T1>>>;

export function rightOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinMap<T2, T1>>;

export function rightOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinMap<T2, T1>>;

export function rightOuterJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinObject<T2, T1>>>;

export function rightOuterJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinObject<T2, T1>>;

export function rightOuterJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinObject<T2, T1>>;

//
// timer.js
//

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
export function withTimeout<T>(duration: () => (number | Promise<number>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function withTimeout<T>(duration: () => (number | Promise<number>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function withTimeout<T>(duration: number | Promise<number>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function withTimeout<T>(duration: number | Promise<number>): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function withTimeout<T>(duration: () => (number | Promise<number>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function withTimeout<T>(duration: () => (number | Promise<number>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function withTimeout<T>(duration: number | Promise<number>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function withTimeout<T>(duration: number | Promise<number>, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#timeout
 *
 * @param duration
 * @param job
 */
export function timeout<T>(duration: number | Promise<number>): (job: Promise<T>) => Promise<T>;
export function timeout<T>(duration: number | Promise<number>): (job: () => Promise<T>) => Promise<T>;

export function timeout<T>(duration: () => (number | Promise<number>)): (job: Promise<T>) => Promise<T>;
export function timeout<T>(duration: () => (number | Promise<number>)): (job: () => Promise<T>) => Promise<T>;

export function timeout<T>(duration: number | Promise<number>, job: Promise<T>): Promise<T>;
export function timeout<T>(duration: number | Promise<number>, job: () => Promise<T>): Promise<T>;

export function timeout<T>(duration: () => (number | Promise<number>), job: Promise<T>): Promise<T>;
export function timeout<T>(duration: () => (number | Promise<number>), job: () => Promise<T>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#interval
 *
 * **Note**
 * - if you want stop interval, set false the run in return value
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
export function rangeInterval(duration: number | Promise<number>, end?: number): AsyncIterableIterator<number>;
export function rangeInterval(duration: () => (number | Promise<number>), end?: number): AsyncIterableIterator<number>;

export function rangeInterval(duration: number | Promise<number>, begin: number, end: number): AsyncIterableIterator<number>;
export function rangeInterval(duration: () => (number | Promise<number>), begin: number, end: number): AsyncIterableIterator<number>;

export function rangeInterval(duration: number | Promise<number>, begin: number, end: number, step: number): AsyncIterableIterator<number>;
export function rangeInterval(duration: () => (number | Promise<number>), begin: number, end: number, step: number): AsyncIterableIterator<number>;

///
/// generator.js
///

/**
 * https://github.com/rudty/nodekell#repeat
 *
 * @param supply
 */
export function repeat<T>(supply: Promise<() => T>): AsyncIterableIterator<EP<T>>;
export function repeat<T>(supply: () => T): AsyncIterableIterator<EP<T>>;
export function repeat<T>(supply: T): AsyncIterableIterator<EP<T>>;

export function repeat<T>(length: number | Promise<number>, supply: Promise<() => T>): AsyncIterableIterator<EP<T>>;
export function repeat<T>(length: number | Promise<number>, supply: () => T): AsyncIterableIterator<EP<T>>;
export function repeat<T>(length: number | Promise<number>, supply: T): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#range
 *
 * @param endOrBegin
 * @param end
 * @param step
 */
export function range(end?: number): IterableIterator<number>;
export function range(begin: number, end: number): IterableIterator<number>;
export function range(begin: number, end: number, step: number): IterableIterator<number>;

/**
 * https://github.com/rudty/nodekell#iterate
 *
 * @param f
 * @param value
 */
export function iterate<T>(f: (value: T) => (T | Promise<T>)): (value: T | Promise<T>) => AsyncIterableIterator<T>;

export function iterate<T>(f: (value: T) => (T | Promise<T>), value: T | Promise<T>): AsyncIterableIterator<T>;

//
// parallel.js
//

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
 * const a = await run(repeat(5, () => () => 1));
 * const b = await run(repeat(5, () => () => 'a'));
 * const c = await run(repeat(5, () => async () => 2));
 * const d = await run(repeat(5, () => async () => 'b'));
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
 * @param f
 * @param iter
 */
export function pfmap<T extends Iter<any>, R>(f: (elem: PFlat<T>) => (R | Promise<R>)): (iter: T) => AsyncIterableIterator<PFlat<R>>;

export function pfmap<T extends Iter<any>, R>(f: (elem: PFlat<T>) => (R | Promise<R>), iter: T): AsyncIterableIterator<PFlat<R>>;
