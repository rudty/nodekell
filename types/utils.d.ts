// TypeScript Version: 3.4

export type Nullable<T, U extends null | undefined = null> = T | U;

export type Length<T extends any[]> = T["length"];

export type Pos<I extends any[]> = Length<I>;

export type Next<I extends any[]> = Prepend<any, I>;

export type Cast<T, Y> = T extends Y ? T : Y;

export type Head<T extends any[]> =
    T extends [any, ...any[]] ?
        T[0] : never;

export type Second<T extends any[]> =
    T extends [any, any, ...any[]] ?
        T[1] : never;

export type Tail<T extends any[]> =
    ((...a: T) => any) extends ((h: any, ...a: infer U) => any) ?
        U : never;

export type HasTail<T extends any[]> =
    T extends ([] | [any]) ?
        false : true;

export type IsEmpty<T extends any[]> =
    T extends [] ?
        false : true;

export type Last<T extends any[]> = {
    0: Last<Tail<T>>;
    1: Head<T>;
}[
    HasTail<T> extends true ?
        0 : 1
];

export type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>;
    1: R;
}[
    Pos<I> extends Length<T> ?
        1 :
        0
];

export type Prepend<E, T extends any[]> =
    ((e: E, ...a: T) => any) extends ((...a: infer U) => any) ?
        U : never;

export type Drop<N extends number, T extends any[], I extends any[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, I>>;
    1: T;
}[
    Length<I> extends N ?
        1 : 0
];

export type Find<E, T extends any[]> = {
    0: Find<E, Tail<T>>;
    1: Head<T>;
}[
    Head<T> extends E ?
        1 : Length<T> extends 0 ? never : 0
];

// type ft = Find<true, [1, 2, 3, 4, 5, true]>;

export type Iter<T> = Iterable<T> | AsyncIterable<T>; // | IterableIterator<T> | AsyncIterableIterator<T> | T[];

export type ExtractPromise<T> = T extends Promise<infer PT> ? PT : T;
export type EP<T> = ExtractPromise<T>;

export type ExtractMap<T> = T extends Map<infer K, infer V> ? [K, V] : unknown;
export type ExtractMapKey<T> = T extends Map<infer K, any> ? K : unknown;
export type ExtractMapValue<T> = T extends Map<any, infer V> ? V : unknown;

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

/**
 * Internal Type
 */
export type FlatForInternalFn<T> =
    T extends Iter<infer E> ?
        E extends Promise<infer PE> ?
            PE
        : E
    : unknown;

export type PickElements<N extends 0 | 1, T extends any[], I extends any[] = []> = {
    0: PickElements<N, Drop<2, T>, Prepend<N extends 0 ? Head<T> : Second<T>, I>>;
    1: Head<T> | Flat<I>;
    2: Second<T> | Flat<I>;
}[
    Length<T> extends 0 ?
        N extends 0 ?
            1 : 2 : 0
];

export type ReturnTypeIfFunction<T> = T extends (...args: any) => any ? ReturnType<T> : T;

/**
 * if PickElements is () => string | () => number
 * ReturnType<PickElements<...>> error
 */
export type ReturnTypePickElements<N extends 0 | 1, T extends any[], I extends any[] = []> = {
    0: ReturnTypePickElements<N, Drop<2, T>, Prepend<N extends 0 ? ReturnTypeIfFunction<Head<T>> : ReturnTypeIfFunction<Second<T>>, I>>;
    1: ReturnTypeIfFunction<Head<T>> | Flat<I>;
    2: ReturnTypeIfFunction<Second<T>> | Flat<I>;
}[
    Length<T> extends 0 ?
        N extends 0 ?
            1 : 2 : 0
];

export type PairRepeat<N extends number, T, Y, I extends any[] = []> = {
    0: PairRepeat<N, T, Y, Prepend<T, Prepend<Y, I>>>;
    1: I;
}[
    Length<I> extends N ? 1 : 0
];

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

export type Accumulator<T> = (acc: T, elem: T) => any;
export type FlatAccumulator<T> = (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => any;

export type ArrayN<N extends number, T> = T extends any[] ? T[N] : T;
export type AssociateMap<T> = Map<ArrayN<0, ExtractPromise<T>>, ArrayN<1, ExtractPromise<T>>>;

export type InnerJoinObject<T1 extends object, T2 extends object> = { [P in keyof T1 | keyof T2]: P extends keyof T1 ? T1[P] : P extends keyof T2 ? T2[P] : unknown };
export type InnerJoinMap<T1, T2> = Map<T1 extends Map<infer K1, infer V1> ? T2 extends Map<infer K2, infer V2> ? K1 | K2 : unknown : unknown, T1 extends Map<infer K1, infer V1> ? T2 extends Map<infer K2, infer V2> ? V1 | V2 : unknown : unknown>;
// export type InnerJoinCustomIterable<T1 extends { set: (...arg: any[]) => any; } & Iter<any>, T2 extends { set: (...arg: any[]) => any; } & Iter<any>> = AsyncIterableIterator<T1 | T2>;

// type InnerJoinObjectTest1 = InnerJoinObject<{ id: number; name: string; }, { id: number; length: number; }>;
// type InnerJoinObjectTest2 = InnerJoinObject<{ id: number; length: number; }, { id: number; name: string; }>;

// type InnerJoinMapTest1 = InnerJoinMap<Map<"string" | "number" | "object", (string | number | null)[]>, Map<"string" | "number", (string | number)[]>>;
// type InnerJoinMapTest2 = InnerJoinMap<Map<"string" | "number", (string | number)[]>, Map<"string" | "number" | "object", (string | number | null)[]>>;

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

export type MergeObject<T extends object, P extends object[]> = {
    0: MergeObject<InnerJoinObject<Head<P>, T>, Drop<1, P>>;
    1: T;
}[
    IsEmpty<P> extends true ?
        0 :
        1
];

export type LiteralWrapper<T> = T extends number ? number : T extends string ? string : T;
