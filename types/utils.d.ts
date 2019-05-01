export type Iter<T> = Iterable<T> | AsyncIterable<T>; // | IterableIterator<T> | AsyncIterableIterator<T> | T[];

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
