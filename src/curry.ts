
const _curry = (fn: (...a: any[]) => any) => (...a: any[]) => {
    if (fn.length <= a.length) {
        return fn(...a);
    } else {
        return (...b: any[]) => _curry(fn)(...a, ...b);
    }
};

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

/**
 * currying function wrapper
 *
 * @example
 *      var mySum = curry((a, b, c) => {
 *          return a + b + c;
 *      });
 *
 *      var mySum1 = mySum(1)
 *      var mySum2 = mySum1(2)
 *      var sum = mySum2(3) // <-- real call
 *
 * @param f currying function
 * @returns currying function or function call result
 */
export function curry<T1, R>(f: (t1: T1) => R): (t1: T1) => R;
export function curry<T1, T2, R>(f: (t1: T1, t2: T2) => R): CurriedFunction2<T1, T2, R>;
export function curry<T1, T2, T3, R>(f: (t1: T1, t2: T2, T3: T3) => R): CurriedFunction3<T1, T2, T3, R>;
export function curry<T1, T2, T3, T4, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4) => R): CurriedFunction4<T1, T2, T3, T4, R>;
export function curry<T1, T2, T3, T4, T5, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R): CurriedFunction5<T1, T2, T3, T4, T5, R>;
export function curry<T1, T2, T3, T4, T5, T6, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R): CurriedFunction6<T1, T2, T3, T4, T5, T6, R>;
export function curry<T1, T2, T3, T4, T5, T6, T7, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => R): CurriedFunction7<T1, T2, T3, T4, T5, T6, T7, R>;
export function curry<T1, T2, T3, T4, T5, T6, T7, T8, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8) => R): CurriedFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
export function curry (f: (...a: any[]) => any) { 
    return _curry(f);    
}
