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

export type ExtractPromise<T> = T extends Promise<infer PT> ? PT : T;
export type Iter<T> = Iterable<T> | AsyncIterable<T>; // | IterableIterator<T> | AsyncIterableIterator<T> | T[];
export type FlatForInternalFn<T> =
    T extends Iter<infer E> ?
        E extends Promise<infer PE> ?
            PE
        : E
    : unknown;

export interface IsTypedArrayFunction {
    (a: Int8Array): true;
    (a: Uint8Array): true;
    (a: Int16Array): true;
    (a: Uint16Array): true;
    (a: Int32Array): true;
    (a: Uint32Array): true;
    (a: Float32Array): true;
    (a: Float64Array): true;
    (a: Uint8ClampedArray): true;
    (a: any): boolean;
}

/**
 * check
 *
 * Int8Array
 * Int16Array
 * Int32Array
 * Uint8Array
 * Uint8ClampedArray
 * Uint16Array
 * Uint32Array
 * Float32Array
 * Float64Array
 *
 * @param a object
 * @returns {bool} true if isTypedArray else false
 */
export const _isTypedArray: IsTypedArrayFunction = (a: any): any =>
    ArrayBuffer.isView(a) && !(a instanceof DataView);

export interface IsStringFunction {
        (a: string): true;
        (a: any): boolean;
}

export const _isString: IsStringFunction = (a: any): any => a.constructor === String;

/**
 * function is
 * () => {...}
 */
export const _isFunction = (a: any): boolean => a && a.constructor === Function;

export type _Predicate<T> = (elem: T) => (boolean | Promise<boolean>);
export type _FlatPredicate<T> = (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>);
export type _IndexedPredicate<T> = (idx: number, elem: T) => (boolean | Promise<boolean>);
export type _IndexedFlatPredicate<T> = (idx: number, elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>);

export type _Func1<T, R> = (elem: T) => (R | Promise<R>);
export type _FlatFunc1<T, R> = (elem: FlatForInternalFn<T>) => (R | Promise<R>);
export type _IndexedFunc1<T, R> = (idx: number, elem: T) => (R | Promise<R>);
export type _IndexedFlatFunc1<T, R> = (idx: number, elem: FlatForInternalFn<T>) => (R | Promise<R>);
