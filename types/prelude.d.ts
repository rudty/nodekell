import {
    Iter,
    EP,
    Flat,
    PFlat,
    PDFlat,
    CurriedFunction2,
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
 * **Note**
 * - if use run or run like function and type error occurred, please use lambda expression or function
 * ```ts
 * const a = [[1], Promise.resolve(['a']), [4], [5]];
 * const r0 = await F.run(a, F.fmap(e => e)); // type error
 * const r1 = await F.run(a, e0 => F.fmap(e1 => e1, e0)); // AsyncIterableIterator<string | number>
 * ```
 *
 * @param f
 * @param iter
 */
export function fmap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;
export function fmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;

export function fmap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;
export function fmap<T, R = EP<T>>(f: (elem: EP<T>) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;

/**
 * https://github.com/rudty/nodekell#flatmap
 *
 * **Note**
 * - if use run or run like function and type error occurred, please use lambda expression or function
 * ```ts
 * const a = [[1], Promise.resolve(['a']), [4], [5]];
 * const r0 = await F.run(a, F.flatMap(e => e)); // type error
 * const r1 = await F.run(a, e0 => F.flatMap(e1 => e1, e0)); // AsyncIterableIterator<string | number>
 * ```
 *
 * as fmap
 *
 * @param f
 * @param iter
 */
export function flatMap<T, R = T>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<PFlat<R>>;
export function flatMap<T, R = T>(f: (elem: EP<T>) => R): (iter: Iter<T>) => AsyncIterableIterator<PFlat<EP<R>>>;

export function flatMap<T, R = T>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<PFlat<R>>;
export function flatMap<T, R = T>(f: (elem: EP<T>) => R, iter: Iter<T>): AsyncIterableIterator<PFlat<EP<R>>>;

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

export function zip<T, Y>(iter1: Iter<T | Promise<T>>, iter2: Iter<Y | Promise<Y>>): AsyncIterableIterator<[T, Y]>;
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