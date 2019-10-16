// TypeScript Version: 3.4

import {
    Iter,
    EP,
    ExtractMap,
    CurriedFunction2,
    FlatForInternalFn,
    OuterJoinMap,
    InnerJoinObject,
    OuterJoinObject,
    InnerJoinMap,
    PairRepeat,
} from './utils';

/**
 * https://github.com/rudty/nodekell#groupby
 *
 * @param f
 * @param iter
 */
export function groupBy<K, V>(f: (elem: V) => (K | Promise<K>), iter: Iter<V | Promise<V>>): Promise<Map<K, V[]>>;
// export function groupBy<K, V>(f: (elem: EP<V>) => K, iter: Iter<V>): Promise<Map<EP<K>, EP<V>[]>>;

export function groupBy<K, V extends Iter<any>>(f: (elem: FlatForInternalFn<V>) => K, iter: V): Promise<Map<EP<K>, FlatForInternalFn<V>[]>>;
export function groupBy<K, V extends Iter<any>>(f: (elem: FlatForInternalFn<V>) => K): (iter: V) => Promise<Map<EP<K>, FlatForInternalFn<V>[]>>;

export function groupBy<K, V>(f: (elem: V) => (K | Promise<K>)): (iter: Iter<V | Promise<V>>) => Promise<Map<K, V[]>>;
// export function groupBy<K, V>(f: (elem: EP<V>) => K): (iter: Iter<V>) => Promise<Map<EP<K>, EP<V>[]>>;

/**
 * https://github.com/rudty/nodekell#concat
 *
 * @param iter1
 * @param iter2
 */
export function concat<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<T | Y>;
// export function concat<T, Y>(iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function concat<T extends Iter<any>, Y extends Iter<any>>(iter1: T, iter2: Y): AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
export function concat<T extends Iter<any>, Y extends Iter<any>>(iter1: T): (iter2: Y) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;

export function concat<T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<T | Y>;
// export function concat<T, Y>(iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#union
 *
 * @param iter1
 * @param iter2
 */
export function union<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<T | Y>;
// export function union<T, Y>(iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function union<T extends Iter<any>, Y extends Iter<any>>(iter1: T, iter2: Y): AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
export function union<T extends Iter<any>, Y extends Iter<any>>(iter1: T): (iter2: Y) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;

export function union<T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<T | Y>;
// export function union<T, Y>(iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export type CompareFn<T> = (a: T, b: T) => 1 | 0 | -1 | number;
export type OrderType = 'ASC' | 'DESC' | 'asc' | 'desc';

/**
 * ascending compare function
 *
 * @param a
 * @param b
 */
export function asc<T>(a: T, b: T): 1 | 0 | -1;

/**
 * descending compare function
 *
 * @param a
 * @param b
 */
export function desc<T>(a: T, b: T): 1 | 0 | -1;

/**
 * https://github.com/rudty/nodekell#orderby
 *
 * @param f
 * @param order
 * @param iter
 */
export function orderBy<T, S = T>(f: (e: T) => (S | Promise<S>), order: OrderType | CompareFn<S>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;

export function orderBy<T, S = T>(f: (e: T) => (S | Promise<S>), order: OrderType | CompareFn<S>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

export function orderBy<T, S = T>(f: (e: T) => (S | Promise<S>)): CurriedFunction2<OrderType | CompareFn<S>, Iter<T | Promise<T>>, AsyncIterableIterator<T>>;

/**
 * https://github.com/rudty/nodekell#order
 *
 * ```ts
 * F.order(F.asc, iter);
 * // same as
 * F.orderBy(e => e, F.asc, iter);
 * ```
 *
 * @param order
 * @param iter
 */
export function order<T>(order: OrderType | CompareFn<EP<T>>, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function order<T>(order: OrderType | CompareFn<EP<T>>): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#innerjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function innerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function innerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function innerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinMap<T1, T2>>>;

export function innerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinObject<T1, T2>>;

export function innerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinObject<T1, T2>>;

export function innerJoin<T1 extends object, T2 extends object>(f: (elem1: T2, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinObject<T1, T2>>>;

/**
 * https://github.com/rudty/nodekell#leftinnerjoin
 *
 * as innerJoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function leftInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function leftInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinMap<T1, T2>>;

export function leftInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1 | Promise<T1>, elem2: T2 | Promise<T2>) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinMap<T1, T2>>>;

export function leftInnerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinObject<T1, T2>>;

export function leftInnerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinObject<T1, T2>>;

export function leftInnerJoin<T1 extends object, T2 extends object>(f: (elem1: T2, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinObject<T1, T2>>>;

/**
 * https://github.com/rudty/nodekell#rightinnerjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function rightInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2 | Promise<T2>, elem1: T1 | Promise<T1>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinMap<T2, T1>>;

export function rightInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2 | Promise<T2>, elem1: T1 | Promise<T1>) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinMap<T2, T1>>;

export function rightInnerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2 | Promise<T2>, elem1: T1 | Promise<T1>) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinMap<T2, T1>>>;

export function rightInnerJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<InnerJoinObject<T2, T1>>;

export function rightInnerJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<InnerJoinObject<T2, T1>>;

export function rightInnerJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<InnerJoinObject<T2, T1>>>;

/**
 * https://github.com/rudty/nodekell#outerjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function outerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function outerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function outerJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinMap<T1, T2>>>;

export function outerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinObject<T1, T2>>;

export function outerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinObject<T1, T2>>;

export function outerJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinObject<T1, T2>>>;

/**
 * https://github.com/rudty/nodekell#leftouterjoin
 *
 * as outerJoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function leftOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function leftOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinMap<T1, T2>>;

export function leftOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinMap<T1, T2>>>;

export function leftOuterJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinObject<T1, T2>>;

export function leftOuterJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinObject<T1, T2>>;

export function leftOuterJoin<T1 extends object, T2 extends object>(f: (elem1: T1, elem2: T2) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinObject<T1, T2>>>;

/**
 * https://github.com/rudty/nodekell#rightouterjoin
 *
 * @param f
 * @param iter1
 * @param iter2
 */
export function rightOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinMap<T2, T1>>;

export function rightOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinMap<T2, T1>>;

export function rightOuterJoin<T1 extends Map<ExtractMap<T1>[0], ExtractMap<T1>[1]>, T2 extends Map<ExtractMap<T2>[0], ExtractMap<T2>[1]>>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinMap<T2, T1>>>;

export function rightOuterJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>, iter2: Iter<T2 | Promise<T2>>): AsyncIterableIterator<OuterJoinObject<T2, T1>>;

export function rightOuterJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>), iter1: Iter<T1 | Promise<T1>>): (iter2: Iter<T2 | Promise<T2>>) => AsyncIterableIterator<OuterJoinObject<T2, T1>>;

export function rightOuterJoin<T1 extends object, T2 extends object>(f: (elem2: T2, elem1: T1) => (boolean | Promise<boolean>)): CurriedFunction2<Iter<T1 | Promise<T1>>, Iter<T2 | Promise<T2>>, AsyncIterableIterator<OuterJoinObject<T2, T1>>>;

export function innerJoin2<T1, T2>(joinFunc: (l: T1, r: T2) => boolean | Promise<boolean>, left: Iter<T1 | Promise<T1>>, right: Iter<T2 | Promise<T2>>): Promise<AsyncIterableIterator<PairRepeat<2, T1, T2>>>;
