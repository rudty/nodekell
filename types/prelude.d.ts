// TypeScript Version: 3.4

import {
    Iter,
    EP,
    Flat,
    PFlat,
    PDFlat,
    CurriedFunction2,
    FlatForInternalFn,
    CurriedFunction3,
    MergeObject,
    InnerJoinObject,
} from './utils';

/**
 * https://github.com/rudty/nodekell#head
 *
 * @param iter
 */
// export function head<T>(iter: Iter<T | Promise<T>>): Promise<T>;
export function head<T>(iter: Iter<T>): Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#tail
 *
 * @param iter
 */
// export function tail<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function tail<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#drop
 *
 * @param count
 * @param iter
 */
export function drop<T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function drop<T>(count: number, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function drop<T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function drop<T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function drop<T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function drop<T>(count: number): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#droplast
 *
 * @param count
 * @param iter
 */
export function dropLast<T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;

export function dropLast<T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function dropLast<T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function dropLast<T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#dropwhile
 *
 * @param f
 * @param iter
 */
export function dropWhile<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function dropWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function dropWhile<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function dropWhile<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function dropWhile<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function dropWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#filter
 *
 * @param f
 * @param iter
 */
export function filter<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function filter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function filter<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function filter<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function filter<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function filter<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#filterindexed
 *
 * @param f
 * @param iter
 */
export function filterIndexed<T>(f: (idx: number, elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;

export function filterIndexed<T extends Iter<any>>(f: (idx: number, elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function filterIndexed<T extends Iter<any>>(f: (idx: number, elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function filterIndexed<T>(f: (idx: number, elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#filternot
 *
 * @param f
 * @param iter
 */
export function filterNot<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;

export function filterNot<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function filterNot<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function filterNot<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#map
 *
 * @param f
 * @param iter
 */
export function map<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;
// export function map<T, R>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T>): AsyncIterableIterator<R>;

export function map<T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R, iter: T): AsyncIterableIterator<EP<R>>;
export function map<T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R): (iter: T) => AsyncIterableIterator<EP<R>>;

export function map<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;
// export function map<T, R>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T>) => AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#mapindexed
 *
 * @param f
 * @param iter
 */
export function mapIndexed<T, R>(f: (idx: number, elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<R>;

export function mapIndexed<T extends Iter<any>, R>(f: (idx: number, elem: FlatForInternalFn<T>) => R, iter: T): AsyncIterableIterator<EP<R>>;
export function mapIndexed<T extends Iter<any>, R>(f: (idx: number, elem: FlatForInternalFn<T>) => R): (iter: T) => AsyncIterableIterator<EP<R>>;

export function mapIndexed<T, R>(f: (idx: number, elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#fmap
 *
 * @param f
 * @param iter
 */
export function fmap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
export function fmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;

// export function fmap<T extends Iter<any>, R = PFlat<T>>(f: (elem: PFlat<T>) => R, iter: T): AsyncIterableIterator<PFlat<EP<R>>>;
// export function fmap<T extends Iter<any>, R = PFlat<T>>(f: (elem: PFlat<T>) => R): (iter: T) => AsyncIterableIterator<PFlat<EP<R>>>;

export function fmap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;
export function fmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;

/**
 * https://github.com/rudty/nodekell#flatmap
 *
 * as fmap
 *
 * @param f
 * @param iter
 */
export function flatMap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
export function flatMap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;

export function flatMap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;
export function flatMap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;

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
 *
 * @param t
 */
export function dflat<T extends any[]>(...a: T): AsyncIterableIterator<PDFlat<Flat<T>>>;

/**
 * https://github.com/rudty/nodekell#take
 *
 * @param count
 * @param iter
 */
export function take<T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function take<T>(count: number, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function take<T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function take<T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function take<T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function take<T>(count: number): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#takelast
 *
 * @param count
 * @param iter
 */
export function takeLast<T>(count: number, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function takeLast<T extends Iter<any>>(count: number, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function takeLast<T extends Iter<any>>(count: number): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
export function takeLast<T>(count: number): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#takewhile
 *
 * @param f
 * @param iter
 */
export function takeWhile<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function takeWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function takeWhile<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function takeWhile<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function takeWhile<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function takeWhile<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#foldl
 *
 * @param f
 * @param init
 * @param iter
 */

// export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>) => (iter: Iter<T | Promise<T>>) => Promise<T>;

// export function foldl<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>, iter: Iter<T | Promise<T>>) => Promise<T>;
export function foldl<T, U>(f: (acc: U, elem: T) => (U | Promise<U>), init: U | Promise<U>, iter: Iter<T | Promise<T>>): Promise<U>;
// export function foldl<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), init: T, iter: Iter<T>): Promise<EP<T>>;

export function foldl<T extends Iter<any>, U>(f: (acc: U, elem: FlatForInternalFn<T>) => (U | Promise<U>), init: U | Promise<U>, iter: T): Promise<U>;
export function foldl<T extends Iter<any>, U>(f: (acc: U, elem: FlatForInternalFn<T>) => (U | Promise<U>), init: U | Promise<U>): (iter: T) => Promise<U>;
export function foldl<T extends Iter<any>, U>(f: (acc: U, elem: FlatForInternalFn<T>) => (U | Promise<U>)): CurriedFunction2<U | Promise<U>, T, Promise<U>>;

export function foldl<T, U>(f: (acc: U, elem: T) => (U | Promise<U>), init: U | Promise<U>): (iter: Iter<T | Promise<T>>) => Promise<U>;
// export function foldl<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), init: T): (iter: Iter<T>) => Promise<EP<T>>;

export function foldl<T, U>(f: (acc: U, elem: T) => (U | Promise<U>)): CurriedFunction2<U | Promise<U>, Iter<T | Promise<T>>, Promise<U>>;
// export function foldl<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): CurriedFunction2<T, Iter<T>, Promise<EP<T>>>;

/**
 * https://github.com/rudty/nodekell#foldl1
 *
 * @param f
 * @param iter
 */
export function foldl1<T>(f: (acc: T, elem: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): Promise<T>;
// export function foldl1<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): Promise<EP<T>>;

export function foldl1<T extends Iter<any>>(f: (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>), iter: T): Promise<FlatForInternalFn<T>>;
export function foldl1<T extends Iter<any>>(f: (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>)): (iter: T) => Promise<FlatForInternalFn<T>>;

export function foldl1<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => Promise<T>;
// export function foldl1<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#reduce
 *
 * as foldl1
 *
 * @param f
 * @param iter
 */
export function reduce<T>(f: (acc: T, elem: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): Promise<T>;
// export function reduce<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): Promise<EP<T>>;

export function reduce<T extends Iter<any>>(f: (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>), iter: T): Promise<FlatForInternalFn<T>>;
export function reduce<T extends Iter<any>>(f: (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>)): (iter: T) => Promise<FlatForInternalFn<T>>;

export function reduce<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => Promise<T>;
// export function reduce<T>(f: (acc: EP<T>, elem: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#scanl
 *
 * @param f
 * @param init
 * @param iter
 */
// export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>)): (init: T | Promise<T>) => (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

// export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>)): (init: T | Promise<T>, iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>), init: T | Promise<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function scanl<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>), init: T, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function scanl<T extends Iter<any>>(f: (a: FlatForInternalFn<T>, b: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>), init: FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function scanl<T extends Iter<any>>(f: (a: FlatForInternalFn<T>, b: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>), init: FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
export function scanl<T extends Iter<any>>(f: (a: FlatForInternalFn<T>, b: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>)): CurriedFunction2<FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>, T, AsyncIterableIterator<FlatForInternalFn<T>>>;

export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>), init: T | Promise<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function scanl<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>), init: T): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function scanl<T>(f: (a: T, b: T) => (T | Promise<T>)): CurriedFunction2<T | Promise<T>, Iter<T | Promise<T>>, AsyncIterableIterator<T>>;
// export function scanl<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>)): CurriedFunction2<T, Iter<T>, AsyncIterableIterator<EP<T>>>;

/**
 * https://github.com/rudty/nodekell#scanl1
 *
 * @param f
 * @param iter
 */
export function scanl1<T>(f: (a: T, b: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function scanl1<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function scanl1<T extends Iter<any>>(f: (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>), iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function scanl1<T extends Iter<any>>(f: (acc: FlatForInternalFn<T>, elem: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function scanl1<T>(f: (a: T, b: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function scanl1<T>(f: (a: EP<T>, b: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#reverse
 *
 * @param iter
 */
export function reverse<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;
// export function reverse<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#foldr
 *
 * @param f
 * @param init
 * @param iter
 */
// export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>) => (iter: Iter<T | Promise<T>>) => Promise<T>;

// export function foldr<T>(f: (acc: T, elem: T) => (T | Promise<T>)): (init: T | Promise<T>, iter: Iter<T | Promise<T>>) => Promise<T>;

export function foldr<T, U>(f: (elem: T, acc: U) => (U | Promise<U>), init: U | Promise<U>, iter: Iter<T | Promise<T>>): Promise<U>;
// export function foldr<T>(f: (elem: EP<T>, acc: EP<T>) => (EP<T> | Promise<EP<T>>), init: T, iter: Iter<T>): Promise<EP<T>>;

export function foldr<T extends Iter<any>, U>(f: (elem: FlatForInternalFn<T>, acc: U) => (U | Promise<U>), init: U | Promise<U>, iter: T): Promise<U>;
export function foldr<T extends Iter<any>, U>(f: (elem: FlatForInternalFn<T>, acc: U) => (U | Promise<U>), init: U | Promise<U>): (iter: T) => Promise<U>;
export function foldr<T extends Iter<any>, U>(f: (elem: FlatForInternalFn<T>, acc: U) => (U | Promise<U>)): CurriedFunction2<U | Promise<U>, T, Promise<U>>;

export function foldr<T, U>(f: (elem: T, acc: U) => (U | Promise<U>), init: U | Promise<U>): (iter: Iter<T | Promise<T>>) => Promise<U>;
// export function foldr<T>(f: (elem: EP<T>, acc: EP<T>) => (EP<T> | Promise<EP<T>>), init: T): (iter: Iter<T>) => Promise<EP<T>>;

export function foldr<T, U>(f: (elem: T, acc: U) => (U | Promise<U>)): CurriedFunction2<U | Promise<U>, Iter<T | Promise<T>>, Promise<U>>;
// export function foldr<T>(f: (elem: EP<T>, acc: EP<T>) => (EP<T> | Promise<EP<T>>)): CurriedFunction2<T, Iter<T>, Promise<EP<T>>>;

/**
 * https://github.com/rudty/nodekell#foldr1
 *
 * @param f
 * @param iter
 */
export function foldr1<T>(f: (elem: T, acc: T) => (T | Promise<T>), iter: Iter<T | Promise<T>>): Promise<T>;
// export function foldr1<T>(f: (elem: EP<T>, acc: EP<T>) => (EP<T> | Promise<EP<T>>), iter: Iter<T>): Promise<EP<T>>;

export function foldr1<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>, acc: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>), iter: T): Promise<FlatForInternalFn<T>>;
export function foldr1<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>, acc: FlatForInternalFn<T>) => (FlatForInternalFn<T> | Promise<FlatForInternalFn<T>>)): (iter: T) => Promise<FlatForInternalFn<T>>;

export function foldr1<T>(f: (elem: T, acc: T) => (T | Promise<T>)): (iter: Iter<T | Promise<T>>) => Promise<T>;
// export function foldr1<T>(f: (elem: EP<T>, acc: EP<T>) => (EP<T> | Promise<EP<T>>)): (iter: Iter<T>) => Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#zip
 *
 * @param iter1
 * @param iter2
 */
export function zip<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<[T, Y]>;
// export function zip<T, Y>(iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<[EP<T>, EP<Y>]>;

export function zip<T extends Iter<any>, Y extends Iter<any>>(iter1: T, iter2: Y): AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>]>;
export function zip<T extends Iter<any>, Y extends Iter<any>>(iter1: T): (iter2: Y) => AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>]>;

export function zip<T, Y>(iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[T, Y]>;
// export function zip<T, Y>(iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<[EP<T>, EP<Y>]>;

/**
 * https://github.com/rudty/nodekell#zipwith
 *
 * **Note**
 * - if you want high quality type, use type assertion
 * ```ts
 * const a = [1, 2, 3, 4];
 * const b = 'abcd';
 * const r = F.zipWith((a, b) => [a, b] as [number, string]);
 * ```
 *
 * @param f
 * @param iter1
 * @param iter2
 */
// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => [R1, R2]): (a: Iter<T | Promise<T>>) => (b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;
// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => (Promise<[R1, R2]> | Promise<(R1 | R2)[]>)): (a: Iter<T | Promise<T>>) => (b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;

// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => [R1, R2]): (a: Iter<T | Promise<T>>, b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;
// export function zipWith<T, Y, R1, R2>(f: (a: T, b: Y) => (Promise<[R1, R2]> | Promise<(R1 | R2)[]>)): (a: Iter<T | Promise<T>>, b: Iter<Y | Promise<Y>>) => AsyncIterableIterator<[R1, R2]>;

export function zipWith<T, Y, R>(f: (elem1: T, elem2: Y) => (R | Promise<R>), iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<R>;
// export function zipWith<T, Y, R>(f: (a: EP<T>, b: EP<Y>) => R, iter1: Iter<T>, iter2: Iter<Y>): AsyncIterableIterator<EP<R>>;

export function zipWith<T extends Iter<any>, Y extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>) => R, iter1: T, iter2: Y): AsyncIterableIterator<EP<R>>;
export function zipWith<T extends Iter<any>, Y extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>) => R, iter1: T): (iter2: Y) => AsyncIterableIterator<EP<R>>;
export function zipWith<T extends Iter<any>, Y extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>) => R): CurriedFunction2<T, Y, AsyncIterableIterator<EP<R>>>;

export function zipWith<T, Y, R>(f: (elem1: T, elem2: Y) => (R | Promise<R>), iter1: Iter<T | Promise<T>>): (iter2: Iter<Y | Promise<Y>>) => AsyncIterableIterator<R>;
// export function zipWith<T, Y, R>(f: (a: EP<T>, b: EP<Y>) => R, iter1: Iter<T>): (iter2: Iter<Y>) => AsyncIterableIterator<EP<R>>;

export function zipWith<T, Y, R>(f: (elem1: T, elem2: Y) => (R | Promise<R>)): CurriedFunction2<Iter<T | Promise<T>>, Iter<Y | Promise<Y>>, AsyncIterableIterator<R>>;
// export function zipWith<T, Y, R>(f: (a: EP<T>, b: EP<Y>) => R): CurriedFunction2<Iter<T>, Iter<Y>, AsyncIterableIterator<EP<R>>>;

/**
 * https://github.com/rudty/nodekell#zip3
 *
 * @param iter1
 * @param iter2
 * @param iter3
 */
export function zip3<T, Y, Z>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>, iter3: Iter<Z | Promise<Z>>): AsyncIterableIterator<[T, Y, Z]>;

export function zip3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>>(iter1: T, iter2: Y, iter3: Z): AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>, FlatForInternalFn<Z>]>;
export function zip3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>>(iter1: T, iter2: Y): (iter3: Z) => AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>, FlatForInternalFn<Z>]>;
export function zip3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>>(iter1: T): CurriedFunction2<Y, Z, AsyncIterableIterator<[FlatForInternalFn<T>, FlatForInternalFn<Y>, FlatForInternalFn<Z>]>>;

export function zip3<T, Y, Z>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): (iter3: Iter<Z | Promise<Z>>) => AsyncIterableIterator<[T, Y, Z]>;

export function zip3<T, Y, Z>(iter1: Iter<T | Promise<T>>): CurriedFunction2<Iter<Y | Promise<Y>>, Iter<Z | Promise<Z>>, AsyncIterableIterator<[T, Y, Z]>>;

/**
 * https://github.com/rudty/nodekell#zipwith3
 *
 * **Note**
 * - if you want high quality type, use type assertion
 * ```ts
 * const a = [1, 2, 3, 4];
 * const b = 'abcd';
 * const c = [5, 6, 7, 8];
 * const r = F.zipWith3((a, b, c) => [a, b, c] as [number, string, number]);
 * ```
 *
 * @param f
 * @param iter1
 * @param iter2
 * @param iter3
 */
export function zipWith3<T, Y, Z, R>(f: (elem1: T, elem2: Y, elem3: Z) => (R | Promise<R>), iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>, iter3: Iter<Z | Promise<Z>>): AsyncIterableIterator<R>;

export function zipWith3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>, elem3: FlatForInternalFn<Z>) => R, iter1: T, iter2: Y, iter3: Z): AsyncIterableIterator<EP<R>>;
export function zipWith3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>, elem3: FlatForInternalFn<Z>) => R, iter1: T, iter2: Y): (iter3: Z) => AsyncIterableIterator<EP<R>>;
export function zipWith3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>, elem3: FlatForInternalFn<Z>) => R, iter1: T): CurriedFunction2<Y, Z, AsyncIterableIterator<EP<R>>>;
export function zipWith3<T extends Iter<any>, Y extends Iter<any>, Z extends Iter<any>, R>(f: (elem1: FlatForInternalFn<T>, elem2: FlatForInternalFn<Y>, elem3: FlatForInternalFn<Z>) => R): CurriedFunction3<T, Y, Z, AsyncIterableIterator<EP<R>>>;

export function zipWith3<T, Y, Z, R>(f: (elem1: T, elem2: Y, elem3: Z) => (R | Promise<R>), iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): (iter3: Iter<Z | Promise<Z>>) => AsyncIterableIterator<R>;

export function zipWith3<T, Y, Z, R>(f: (elem1: T, elem2: Y, elem3: Z) => (R | Promise<R>), iter1: Iter<T | Promise<T>>): CurriedFunction2<Iter<Y | Promise<Y>>, Iter<Z | Promise<Z>>, AsyncIterableIterator<R>>;

export function zipWith3<T, Y, Z, R>(f: (elem1: T, elem2: Y, elem3: Z) => (R | Promise<R>)): CurriedFunction3<Iter<T | Promise<T>>, Iter<Y | Promise<Y>>, Iter<Z | Promise<Z>>, AsyncIterableIterator<R>>;

/**
 * https://github.com/rudty/nodekell#run
 *
 * **Note**
 * - originally allow Promise wrapped functions. but that is complicated. so don't support Promise wrapped functions type.
 * - please use functions length 20 or less
 *
 * ```ts
 * // like `$` or `.`
 *
 *  let a = [1,2,3,4,5];
 *  let r = await F.run(a,
 *           F.map(e => e + 1), // a = [2,3,4,5,6]
 *           F.filter(e => e < 4), // a = [2,3]
 *           F.take(Infinity),
 *           F.collect);
 *
 *  console.log(r); // print [2,3]
 *
 * ```
 *
 * @param t
 * @param ...f
 */
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
 * https://github.com/rudty/nodekell#pipe
 * **Note**
 * - please use functions length 20 or less
 * - please specify argument type in first function
 * ```ts
 * const double1 = F.pipe(F.map((e: number) => e + e), F.collect);
 * const double2 = F.pipe((t: number[]) => t.map(e => e + e));
 * const a = [1,2,3,4];
 * const r1 = await double1(a);
 * const r2 = await double2(a);
 * console.log(r1); // [2,4,6,8]
 * console.log(r2); // [2,4,6,8]
 * ```
 *
 * @param ...f
 * @param t
 */
export function pipe<T extends any[], R0>(f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R0>;
export function pipe<T extends any[], R0, R1>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>)): (...t: T) => Promise<R1>;
export function pipe<T extends any[], R0, R1, R2>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>)): (...t: T) => Promise<R2>;
export function pipe<T extends any[], R0, R1, R2, R3>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>)): (...t: T) => Promise<R3>;
export function pipe<T extends any[], R0, R1, R2, R3, R4>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>)): (...t: T) => Promise<R4>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>)): (...t: T) => Promise<R5>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>)): (...t: T) => Promise<R6>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>)): (...t: T) => Promise<R7>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>)): (...t: T) => Promise<R8>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>)): (...t: T) => Promise<R9>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>)): (...t: T) => Promise<R10>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>)): (...t: T) => Promise<R11>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>)): (...t: T) => Promise<R12>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>)): (...t: T) => Promise<R13>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>)): (...t: T) => Promise<R14>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>)): (...t: T) => Promise<R15>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>)): (...t: T) => Promise<R16>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>), f17: (r16: R16) => (R17 | Promise<R17>)): (...t: T) => Promise<R17>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>), f17: (r16: R16) => (R17 | Promise<R17>), f18: (r17: R17) => (R18 | Promise<R18>)): (...t: T) => Promise<R18>;
export function pipe<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(f0: (...t: T) => (R0 | Promise<R0>), f1: (r0: R0) => (R1 | Promise<R1>), f2: (r1: R1) => (R2 | Promise<R2>), f3: (r2: R2) => (R3 | Promise<R3>), f4: (r3: R3) => (R4 | Promise<R4>), f5: (r4: R4) => (R5 | Promise<R5>), f6: (r5: R5) => (R6 | Promise<R6>), f7: (r6: R6) => (R7 | Promise<R7>), f8: (r7: R7) => (R8 | Promise<R8>), f9: (r8: R8) => (R9 | Promise<R9>), f10: (r9: R9) => (R10 | Promise<R10>), f11: (r10: R10) => (R11 | Promise<R11>), f12: (r11: R11) => (R12 | Promise<R12>), f13: (r12: R12) => (R13 | Promise<R13>), f14: (r13: R13) => (R14 | Promise<R14>), f15: (r14: R14) => (R15 | Promise<R15>), f16: (r15: R15) => (R16 | Promise<R16>), f17: (r16: R16) => (R17 | Promise<R17>), f18: (r17: R17) => (R18 | Promise<R18>), f19: (r18: R18) => (R19 | Promise<R19>)): (...t: T) => Promise<R19>;

/**
 * https://github.com/rudty/nodekell#compose
 * **Note**
 * - please use functions length 20 or less
 * - please specify argument type in first function
 * ```ts
 * const double1 = F.compose(F.collect, F.map((e: number) => e + e));
 * const double2 = F.compose((t: number[]) => t.map(e => e + e));
 * const a = [1,2,3,4];
 * const r1 = await double1(a);
 * const r2 = await double2(a);
 * console.log(r1); // [2,4,6,8]
 * console.log(r2); // [2,4,6,8]
 * ```
 *
 * @param ...f
 * @param t
 */
export function compose<T extends any[], R0>(f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R0>;
export function compose<T extends any[], R0, R1>(f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R1>;
export function compose<T extends any[], R0, R1, R2>(f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R2>;
export function compose<T extends any[], R0, R1, R2, R3>(f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R3>;
export function compose<T extends any[], R0, R1, R2, R3, R4>(f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R4>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5>(f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R5>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6>(f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R6>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7>(f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R7>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8>(f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R8>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9>(f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R9>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R10>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R11>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R12>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R13>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(f14: (r13: R13) => (R14 | Promise<R14>), f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R14>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(f15: (r14: R14) => (R15 | Promise<R15>), f14: (r13: R13) => (R14 | Promise<R14>), f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R15>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(f16: (r15: R15) => (R16 | Promise<R16>), f15: (r14: R14) => (R15 | Promise<R15>), f14: (r13: R13) => (R14 | Promise<R14>), f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R16>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(f17: (r16: R16) => (R17 | Promise<R17>), f16: (r15: R15) => (R16 | Promise<R16>), f15: (r14: R14) => (R15 | Promise<R15>), f14: (r13: R13) => (R14 | Promise<R14>), f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R17>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(f18: (r17: R17) => (R18 | Promise<R18>), f17: (r16: R16) => (R17 | Promise<R17>), f16: (r15: R15) => (R16 | Promise<R16>), f15: (r14: R14) => (R15 | Promise<R15>), f14: (r13: R13) => (R14 | Promise<R14>), f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R18>;
export function compose<T extends any[], R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(f19: (r18: R18) => (R19 | Promise<R19>), f18: (r17: R17) => (R18 | Promise<R18>), f17: (r16: R16) => (R17 | Promise<R17>), f16: (r15: R15) => (R16 | Promise<R16>), f15: (r14: R14) => (R15 | Promise<R15>), f14: (r13: R13) => (R14 | Promise<R14>), f13: (r12: R12) => (R13 | Promise<R13>), f12: (r11: R11) => (R12 | Promise<R12>), f11: (r10: R10) => (R11 | Promise<R11>), f10: (r9: R9) => (R10 | Promise<R10>), f9: (r8: R8) => (R9 | Promise<R9>), f8: (r7: R7) => (R8 | Promise<R8>), f7: (r6: R6) => (R7 | Promise<R7>), f6: (r5: R5) => (R6 | Promise<R6>), f5: (r4: R4) => (R5 | Promise<R5>), f4: (r3: R3) => (R4 | Promise<R4>), f3: (r2: R2) => (R3 | Promise<R3>), f2: (r1: R1) => (R2 | Promise<R2>), f1: (r0: R0) => (R1 | Promise<R1>), f0: (...t: T) => (R0 | Promise<R0>)): (...t: T) => Promise<R19>;

/**
 * https://github.com/rudty/nodekell#random
 * max: 4294967295
 * random() => 0 ~ 4294967295 (unsigned int max)
 * random(10) => 0 ~ 9 [begin end) max: 4294967295
 * random(1, 42) => 1 ~ 41 [begin end) max: 429496729
 * @param endOrBegin
 * @param end
 * @param step
 */
export function random(end?: number): number;
export function random(begin: number, end?: number): number;

/**
 *
 * first argument is the calling function. from the second argument,
 * the argument is entered as the first argument.
 * returns a function calls first argument,
 * if a function has a argument, it acts as a substitute for an existing argument.
 *
 * @example
 *      function sayHello(who: any) {
 *          console.log("hello " + who);
 *      }
 *
 *      const sayHelloWithDefault = F.fnil(sayHello, "javascript");
 *      sayHelloWithDefault(); // print hello javascript
 *      sayHelloWithDefault("leanne"); // print hello leanne
 *
 * @param fn call function
 * @param dArgs defaultArguments
 * @return function that calls fn
 */
export function fnil<P extends any[], R>(fn: (...args: P) => R, ...dArgs: P): ((...args: Partial<P>) => R);

// export function fnil<R>(fn: (...args: any) => R, ...dArgs: any): (...args: any) => R;

/**
 * curry with Object.assign
 * Returns the target object.
 *
 * @param {Object} target target object to copy to
 * @param {Object} source source objects from which to copy properties
 */
export function assign<T extends object, S1 extends object, S extends object[] = []>(target: T, source1: S1, ...sources: S): MergeObject<MergeObject<T, [S1]>, S>;

// tslint:disable-next-line: no-unnecessary-generics
export function assign<T extends object, S1 extends object, S extends object[] = []>(target: T): <_S1 extends object = S1, _S extends object[] = S>(source1: _S1, ...sources: _S) => MergeObject<MergeObject<T, [_S1]>, _S>;

// export function assign<T extends object, S1 extends object, S extends object[]>(target: T): CurriedFunction2<S1, S, MergeObject<MergeObject<T, [S1]>, S>>;

/**
 * curry with Object.assign
 * Returns the target object.
 * must have at least 3 arguments
 *
 * @param {Object} target target object to copy to
 * @param {Object} source source objects from which to copy properties
 */
export function assign3<T extends object, S1 extends object, S2 extends object, S extends object[] = []>(target: T, source1: S1, source2: S2, ...sources: S): MergeObject<MergeObject<T, [S1, S2]>, S>;

// tslint:disable-next-line: no-unnecessary-generics
export function assign3<T extends object, S1 extends object, S2 extends object, S extends object[] = []>(target: T, source1: S1): <_S2 extends object = S2, _S extends object[] = S>(source2: _S2, ...sources: _S) => MergeObject<MergeObject<T, [S1, _S2]>, _S>;

// tslint:disable-next-line: no-unnecessary-generics
export function assign3<T extends object, S1 extends object, S2 extends object, S extends object[] = []>(target: T): <_S1 extends object = S1, _S2 extends object = S2, _S extends object[] = S>(source1: _S1, source2: _S2, ...sources: _S) => MergeObject<MergeObject<T, [_S1, _S2]>, _S>;

// tslint:disable-next-line: no-unnecessary-generics
export function assign3<T extends object, S1 extends object, S2 extends object, S extends object[] = []>(target: T): <_S1 extends object = S1>(source1: S1) => <_S2 extends object = S2, _S extends object[] = S>(source2: _S2, ...sources: _S) => MergeObject<MergeObject<T, [_S1, _S2]>, _S>;

// export function assign3<T extends object, S1 extends object, S2 extends object, S extends object[]>(target: T, source1: S1): CurriedFunction2<S2, S, MergeObject<MergeObject<T, [S1, S2]>, S>>;

// export function assign3<T extends object, S1 extends object, S2 extends object, S extends object[]>(target: T): CurriedFunction3<S1, S2, S, MergeObject<MergeObject<T, [S1, S2]>, S>>;
