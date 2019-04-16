//target ES2019 or ESNEXT
//if you are using an earlier version, uncomment code.
/*
interface AsyncIterator<T> {
    next(value?: any): IteratorResult<Promise<T>>;
    return?(value?: any): IteratorResult<Promise<T>>;
    throw?(e?: any): IteratorResult<Promise<T>>;
}

interface AsyncIterable<T> {
    [Symbol.iterator](): AsyncIterator<T>;
}

interface AsyncIterableIterator<T> extends AsyncIterator<T> {
    [Symbol.iterator](): AsyncIterableIterator<T>;
}
*/



/**
 * arg0: range 0 ~ Infinity 
 * arg1: range 0 ~ < b
 * arg2: range a ~ < b
 * arg3: range a ~ < b, a += n
 * @param a end or begin
 * @param b end
 * @param step increase or decrease
 */
export function range(a?: number, b?: number, step?: number): IterableIterator<number>;

export function rangeInterval(duration: number, a?: number, b?: number, step?: number): AsyncIterableIterator<number>;

/**
 * check nullable value
 * @param v any value
 * @returns false: null, NaN, undefined / true: other
 */
export function notNil(v: any): boolean

/**
 * make generator
 * do not need to check if iter 
 * AsyncIterable or Iterable 
 * @param a any iterable
 */
export function seq<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function seq<T>(iter: Iterable<T>): AsyncIterableIterator<T>

/**
 * like `$` or `.`
 * 
 *  let a = [1,2,3,4,5];
 *  let r = run(a, 
 *              map(e => e + 1), // a = [2,3,4,5,6]
 *              filter(e => e < 4), // a = [2,3]
 *              take(Infinity)); 
 * 
 * result:
 * [ 2 , 3 ]
 */
export function run<A>(iter: String, f1: (f: String) => A): A
export function run<A, B>(iter: String, f1: (f: String) => A, f2: (f: A) => B): B
export function run<A, B, C>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C): C
export function run<A, B, C, D>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D): D
export function run<A, B, C, D, E>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E): E
export function run<A, B, C, D, E, F>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F): F
export function run<A, B, C, D, E, F, G>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G): G
export function run<A, B, C, D, E, F, G, H>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H): H
export function run<A, B, C, D, E, F, G, H, I>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I): I
export function run<A, B, C, D, E, F, G, H, I, J>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J): J
export function run<A, B, C, D, E, F, G, H, I, J, K>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K): K
export function run<A, B, C, D, E, F, G, H, I, J, K, L>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L): L
export function run<A, B, C, D, E, F, G, H, I, J, K, L, M>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M): M
export function run<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M, f14: (f: M) => N): N
export function run<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(iter: String, f1: (f: String) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M, f14: (f: M) => N, f15: (f: N) => O): O
export function run<T, A>(iter: Iterable<T>, f1: (f: Iterable<T>) => A): A
export function run<T, A, B>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B): B
export function run<T, A, B, C>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C): C
export function run<T, A, B, C, D>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D): D
export function run<T, A, B, C, D, E>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E): E
export function run<T, A, B, C, D, E, F>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F): F
export function run<T, A, B, C, D, E, F, G>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G): G
export function run<T, A, B, C, D, E, F, G, H>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H): H
export function run<T, A, B, C, D, E, F, G, H, I>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I): I
export function run<T, A, B, C, D, E, F, G, H, I, J>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J): J
export function run<T, A, B, C, D, E, F, G, H, I, J, K>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K): K
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L): L
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L, M>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M): M
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L, M, N>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M, f14: (f: M) => N): N
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(iter: Iterable<T>, f1: (f: Iterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M, f14: (f: M) => N, f15: (f: N) => O): O
export function run<T, A>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A): A
export function run<T, A, B>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B): B
export function run<T, A, B, C>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C): C
export function run<T, A, B, C, D>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D): D
export function run<T, A, B, C, D, E>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E): E
export function run<T, A, B, C, D, E, F>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F): F
export function run<T, A, B, C, D, E, F, G>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G): G
export function run<T, A, B, C, D, E, F, G, H>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H): H
export function run<T, A, B, C, D, E, F, G, H, I>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I): I
export function run<T, A, B, C, D, E, F, G, H, I, J>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J): J
export function run<T, A, B, C, D, E, F, G, H, I, J, K>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K): K
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L): L
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L, M>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M): M
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L, M, N>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M, f14: (f: M) => N): N
export function run<T, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(iter: AsyncIterable<T>, f1: (f: AsyncIterable<T>) => A, f2: (f: A) => B, f3: (f: B) => C, f4: (f: C) => D, f5: (f: D) => E, f6: (f: E) => F, f7: (f: F) => G, f8: (f: G) => H, f9: (f: H) => I, f10: (f: I) => J, f11: (f: J) => K, f12: (f: K) => L, f13: (f: L) => M, f14: (f: M) => N, f15: (f: N) => O): O
export function run<T>(iter: AsyncIterable<T>, ...f1: ((f: any) => any)[]): any
export function run<T>(iter: Iterable<T>, ...f1: ((f: any) => any)[]): any

export function drop<T>(count: Number): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function drop<T>(count: Number, iter: Iterable<T>): AsyncIterableIterator<T>
export function drop<T>(count: Number, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function dropWhile<T>(fn: (predicate: T) => boolean): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function dropWhile<T>(fn: (predicate: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function dropWhile<T>(fn: (predicate: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function take<T>(count: Number): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function take<T>(count: Number, iter: Iterable<T>): AsyncIterableIterator<T>
export function take<T>(count: Number, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function takeWhile<T>(fn: (predicate: T) => boolean): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function takeWhile<T>(fn: (predicate: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function takeWhile<T>(fn: (predicate: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function filter<T>(fn: (predicate: T) => boolean): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function filter<T>(fn: (predicate: T) => boolean): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function filter<T>(fn: (predicate: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function filter<T>(fn: (predicate: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function map<T, R>(fn: (predicate: T) => R): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function map<T, R>(fn: (predicate: T) => R, iter: Iterable<T>): AsyncIterableIterator<R>
export function map<T, R>(fn: (predicate: T) => R, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function fmap<T, E, R>(fn: (predicate: T) => E): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function fmap<T, E, R>(fn: (predicate: T) => E, iter: Iterable<T>): AsyncIterableIterator<R>
export function fmap<T, E, R>(fn: (predicate: T) => E, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function flatMap<T, E, R>(fn: (predicate: T) => E): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function flatMap<T, E, R>(fn: (predicate: T) => E, iter: Iterable<T>): AsyncIterableIterator<R>
export function flatMap<T, E, R>(fn: (predicate: T) => E, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function foldl<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: Iterable<T>): Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: AsyncIterable<T>): Promise<R>

export function foldl1<T>(fn: (acc: T, elem: T) => T): (iter: Iterable<T> | AsyncIterable<T>) => Promise<T>
export function foldl1<T>(fn: (acc: T, elem: T) => T, iter: Iterable<T>): Promise<T>
export function foldl1<T>(fn: (acc: T, elem: T) => T, iter: AsyncIterable<T>): Promise<T>

export function reduce<T>(fn: (acc: T, elem: T) => T): (iter: Iterable<T> | AsyncIterable<T>) => Promise<T>
export function reduce<T>(fn: (acc: T, elem: T) => T, iter: Iterable<T>): Promise<T>
export function reduce<T>(fn: (acc: T, elem: T) => T, iter: AsyncIterable<T>): Promise<T>

export function scanl<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: Iterable<T>): AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function scanl1<T, R>(fn: (acc: R, elem: T) => R): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl1<T, R>(fn: (acc: R, elem: T) => R, iter: Iterable<T>): AsyncIterableIterator<R>
export function scanl1<T, R>(fn: (acc: R, elem: T) => R, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function foldr<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: Iterable<T>): Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: AsyncIterable<T>): Promise<R>

export function foldr1<T, R>(fn: (acc: R, elem: T) => R): (iter: Iterable<T> | AsyncIterable<T>) => Promise<R>
export function foldr1<T, R>(fn: (acc: R, elem: T) => R, iter: Iterable<T>): Promise<R>
export function foldr1<T, R>(fn: (acc: R, elem: T) => R, iter: AsyncIterable<T>): Promise<R>

export function reverse<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function reverse<T>(iter: Iterable<T>): AsyncIterableIterator<T>

export function zip<T, R>(iter1: Iterable<T>): (iter2: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>): (iter2: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: Iterable<T>, iter2: Iterable<T>): AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: Iterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>, iter2: Iterable<T>): AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<[T, R]>

export function repeat<T>(supply: () => T): AsyncIterableIterator<T>
export function repeat<T>(supply: () => Promise<T>): AsyncIterableIterator<T>
export function repeat<T>(supply: T): AsyncIterableIterator<T>
export function repeat<T>(supply: Promise<T>): AsyncIterableIterator<T>

export function collect<T>(iter: Iterable<T>): Promise<[T]>
export function collect<T>(iter: AsyncIterable<T>): Promise<[T]>

export function head<T>(iter: Iterable<T>): Promise<T>
export function head<T>(iter: AsyncIterable<T>): Promise<T>

export function tail<T>(iter: Iterable<T>): AsyncIterableIterator<T>
export function tail<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function rangeOf<T>(...iter: Iterable<T>[]): AsyncIterableIterator<T>
export function rangeOf<T>(...iter: AsyncIterable<T>[]): AsyncIterableIterator<T>

export function emptyThen<T>(supply: () => Iterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => AsyncIterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => Iterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => AsyncIterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: Iterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: AsyncIterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: Iterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: AsyncIterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => Iterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => AsyncIterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: Iterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: AsyncIterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>

export function collectMap<K, V>(iter: AsyncIterable<[K, V]>): Map<K, V>
export function collectMap<K, V>(iter: Iterable<[K, V]>): Map<K, V>

export function collectSet<T>(iter: AsyncIterable<T>): Set<T>
export function collectSet<T>(iter: Iterable<T>): Set<T>

export function forEach<T, R>(action: (elem: T) => R, iter: AsyncIterable<T>): Promise<[R]>
export function forEach<T, R>(action: (elem: T) => R, iter: Iterable<T>): Promise<[R]>
export function forEach<T, R>(action: (elem: T) => R): (iter: AsyncIterable<T>) => Promise<[R]>
export function forEach<T, R>(action: (elem: T) => R): (iter: Iterable<T>) => Promise<[R]>

export function distinctBy<T>(fn: (elem: T) => boolean): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function distinctBy<T>(fn: (elem: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function distinctBy<T>(fn: (elem: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function distinct<T>(iter: Iterable<T>): AsyncIterableIterator<T>
export function distinct<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function some<T>(fn: (elem: T) => boolean, iter: Iterable<T>): Promise<boolean>
export function some<T>(fn: (elem: T) => boolean, iter: AsyncIterable<T>): Promise<boolean>
export function some<T>(fn: (elem: T) => boolean): (iter: Iterable<T> | AsyncIterable<T>) => Promise<boolean>

export function every<T>(fn: (elem: T) => boolean, iter: Iterable<T>): Promise<boolean>
export function every<T>(fn: (elem: T) => boolean, iter: AsyncIterable<T>): Promise<boolean>
export function every<T>(fn: (elem: T) => boolean): (iter: Iterable<T> | AsyncIterable<T>) => Promise<boolean>

export function maxBy<T, R>(fn: (elem: T) => R, iter: Iterable<T>): Promise<T>
export function maxBy<T, R>(fn: (elem: T) => R, iter: AsyncIterable<T>): Promise<T>
export function maxBy<T, R>(fn: (elem: T) => R): (iter: Iterable<T> | AsyncIterable<T>) => Promise<T>

export function minBy<T, R>(fn: (elem: T) => R, iter: Iterable<T>): Promise<T>
export function minBy<T, R>(fn: (elem: T) => R, iter: AsyncIterable<T>): Promise<T>
export function minBy<T, R>(fn: (elem: T) => R): (iter: Iterable<T> | AsyncIterable<T>) => Promise<T>

export function count<T>(iter: Iterable<T>): Promise<number>
export function count<T>(iter: AsyncIterable<T>): Promise<number>

export function sum<T>(iter: Iterable<T>): Promise<T>
export function sum<T>(iter: AsyncIterable<T>): Promise<T>

export function max<T>(iter: Iterable<T>): Promise<number>
export function max<T>(iter: AsyncIterable<T>): Promise<number>

export function average<T>(iter: Iterable<T>): Promise<number>
export function average<T>(iter: AsyncIterable<T>): Promise<number>

export function splitBy<T, R>(fn: (elem: T) => Iterable<R>): (dist: T) => AsyncIterableIterator<R>
export function splitBy<T, R>(fn: (elem: T) => AsyncIterable<R>): (dist: T) => AsyncIterableIterator<R>
export function splitBy<T, R>(fn: (elem: T) => Iterable<R>, dist: T): AsyncIterableIterator<R>
export function splitBy<T, R>(fn: (elem: T) => AsyncIterable<R>, dist: T): AsyncIterableIterator<R>

export function errorThen<T>(supply: () => Iterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: () => AsyncIterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: () => Iterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: () => AsyncIterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: Iterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: AsyncIterable<T>, iter: Iterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: Iterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: AsyncIterable<T>, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function errorThen<T>(supply: () => Iterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: () => AsyncIterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: Iterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: AsyncIterable<T>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>

export function then<T, R>(fn: (iter: Iterable<T>) => Iterable<R>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: Iterable<T>) => AsyncIterable<R>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => Iterable<R>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => AsyncIterable<R>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: Iterable<T>) => Iterable<R>, iter: Iterable<T>): AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: Iterable<T>) => AsyncIterable<R>, iter: Iterable<T>): AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => Iterable<R>, iter: AsyncIterable<T>): AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => AsyncIterable<R>, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function buffer<T>(supply: number, iter: Iterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>, iter: Iterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: number, iter: AsyncIterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>, iter: AsyncIterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: number): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<[T]>

export function groupBy<K, V>(group: (elem: V) => K, iter: Iterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>, iter: Iterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => K, iter: AsyncIterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>, iter: AsyncIterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => K): (iter: Iterable<V> | AsyncIterable<V>) => Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>): (iter: Iterable<V> | AsyncIterable<V>) => Map<K, V>

export function concat<T>(iter1: Iterable<T>, iter2: Iterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: Iterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: AsyncIterable<T>, iter2: Iterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: AsyncIterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: Iterable<T>): (iter2: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
export function concat<T>(iter1: AsyncIterable<T>): (iter2: Iterable<T>) => AsyncIterableIterator<T>

export function timeout<T>(time: number, fn: () => Promise<T>): Promise<T>
export function timeout<T>(time: number, fn: Promise<T>): Promise<T>
export function timeout<T>(time: number): (fn: any) => Promise<T>

export function withTimeout<T>(time: number, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function withTimeout<T>(time: number, iter: Iterable<T>): AsyncIterableIterator<T>
export function withTimeout<T>(time: number): (iter: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>

export function sleep(duration: number): Promise<void>
export function interval(timeout: number, timeHandler: (...params: any[]) => void, ...params: any[]): any

export function add(a: number, b: number): number
export function add(a: string, b: string): string
export function add(a: string, b: number): string
export function add(a: number, b: string): string

export function sub(a: number, b: number): number

export function inc(a: number): number

export function dec(a: number): number

export function iterate<T>(fn: (elem: T) => T, init: T): AsyncIterableIterator<T>
export function iterate<T>(fn: (elem: T) => T): (init: T) => AsyncIterableIterator<T>