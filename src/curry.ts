
import * as C from "./internal/typeTraits";

const _curry = (fn: (...a: any[]) => any) => (...a: any[]) => {
    if (fn.length <= a.length) {
        return fn(...a);
    } else {
        return (...b: any[]) => _curry(fn)(...a, ...b);
    }
};

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
export function curry<T1, T2, R>(f: (t1: T1, t2: T2) => R): C.CurriedFunction2<T1, T2, R>;
export function curry<T1, T2, T3, R>(f: (t1: T1, t2: T2, T3: T3) => R): C.CurriedFunction3<T1, T2, T3, R>;
export function curry<T1, T2, T3, T4, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4) => R): C.CurriedFunction4<T1, T2, T3, T4, R>;
export function curry<T1, T2, T3, T4, T5, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R): C.CurriedFunction5<T1, T2, T3, T4, T5, R>;
export function curry<T1, T2, T3, T4, T5, T6, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R): C.CurriedFunction6<T1, T2, T3, T4, T5, T6, R>;
export function curry<T1, T2, T3, T4, T5, T6, T7, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => R): C.CurriedFunction7<T1, T2, T3, T4, T5, T6, T7, R>;
export function curry<T1, T2, T3, T4, T5, T6, T7, T8, R>(f: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8) => R): C.CurriedFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
export function curry (f: (...a: any[]) => any) { 
    return _curry(f);    
}
