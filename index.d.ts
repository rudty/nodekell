//target ES2019 or ESNEXT
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

/**
 * make generator
 * do not need to check if iter 
 * AsyncIterable or Iterable 
 * @param a any iterable
 */
export function seq<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function seq<T>(iter: Iterable<T>): AsyncIterableIterator<T>

export function drop<T>(count: Number): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function drop<T>(count: Number): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function drop<T>(count: Number, iter: Iterable<T>): AsyncIterableIterator<T>
export function drop<T>(count: Number, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function dropWhile<T>(fn: (predicate: T) => boolean): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function dropWhile<T>(fn: (predicate: T) => boolean): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function dropWhile<T>(fn: (predicate: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function dropWhile<T>(fn: (predicate: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function take<T>(count: Number): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function take<T>(count: Number): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function take<T>(count: Number, iter: Iterable<T>): AsyncIterableIterator<T>
export function take<T>(count: Number, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function takeWhile<T>(fn: (predicate: T) => boolean): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function takeWhile<T>(fn: (predicate: T) => boolean): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function takeWhile<T>(fn: (predicate: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function takeWhile<T>(fn: (predicate: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function filter<T>(fn: (predicate: T) => boolean): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function filter<T>(fn: (predicate: T) => boolean): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function filter<T>(fn: (predicate: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function filter<T>(fn: (predicate: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function map<T, R>(fn: (predicate: T) => R): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function map<T, R>(fn: (predicate: T) => R): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function map<T, R>(fn: (predicate: T) => R, iter: Iterable<T>): AsyncIterableIterator<R>
export function map<T, R>(fn: (predicate: T) => R, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function fmap<T, E, R>(fn: (predicate: T) => E): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function fmap<T, E, R>(fn: (predicate: T) => E): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function fmap<T, E, R>(fn: (predicate: T) => E, iter: Iterable<T>): AsyncIterableIterator<R>
export function fmap<T, E, R>(fn: (predicate: T) => E, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function flatMap<T, E, R>(fn: (predicate: T) => E): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function flatMap<T, E, R>(fn: (predicate: T) => E): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function flatMap<T, E, R>(fn: (predicate: T) => E, iter: Iterable<T>): AsyncIterableIterator<R>
export function flatMap<T, E, R>(fn: (predicate: T) => E, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function foldl<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: Iterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: AsyncIterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: Iterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: AsyncIterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: Iterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: AsyncIterable<T>) => Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: Iterable<T>): Promise<R>
export function foldl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: AsyncIterable<T>): Promise<R>

export function foldl1<T, R>(fn: (acc: R, elem: T) => R): (iter: Iterable<T>) => Promise<R>
export function foldl1<T, R>(fn: (acc: R, elem: T) => R): (iter: AsyncIterable<T>) => Promise<R>
export function foldl1<T, R>(fn: (acc: R, elem: T) => R, iter: Iterable<T>): Promise<R>
export function foldl1<T, R>(fn: (acc: R, elem: T) => R, iter: AsyncIterable<T>): Promise<R>

export function reduce<T, R>(fn: (acc: R, elem: T) => R): (iter: Iterable<T>) => Promise<R>
export function reduce<T, R>(fn: (acc: R, elem: T) => R): (iter: AsyncIterable<T>) => Promise<R>
export function reduce<T, R>(fn: (acc: R, elem: T) => R, iter: Iterable<T>): Promise<R>
export function reduce<T, R>(fn: (acc: R, elem: T) => R, iter: AsyncIterable<T>): Promise<R>

export function scanl<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: Iterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: Iterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: Iterable<T>): AsyncIterableIterator<R>
export function scanl<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function scanl1<T, R>(fn: (acc: R, elem: T) => R): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function scanl1<T, R>(fn: (acc: R, elem: T) => R): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function scanl1<T, R>(fn: (acc: R, elem: T) => R, iter: Iterable<T>): AsyncIterableIterator<R>
export function scanl1<T, R>(fn: (acc: R, elem: T) => R, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function foldr<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: Iterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R): (init: R, iter: AsyncIterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: Iterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R): (init: R) => (iter: AsyncIterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: Iterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R): (iter: AsyncIterable<T>) => Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: Iterable<T>): Promise<R>
export function foldr<T, R>(fn: (acc: R, elem: T) => R, init: R, iter: AsyncIterable<T>): Promise<R>

export function foldr1<T, R>(fn: (acc: R, elem: T) => R): (iter: Iterable<T>) => Promise<R>
export function foldr1<T, R>(fn: (acc: R, elem: T) => R): (iter: AsyncIterable<T>) => Promise<R>
export function foldr1<T, R>(fn: (acc: R, elem: T) => R, iter: Iterable<T>): Promise<R>
export function foldr1<T, R>(fn: (acc: R, elem: T) => R, iter: AsyncIterable<T>): Promise<R>

export function reverse<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function reverse<T>(iter: Iterable<T>): AsyncIterableIterator<T>

export function zip<T, R>(iter1: Iterable<T>): (iter2: Iterable<T>) => AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>): (iter2: Iterable<T>) => AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>): (iter2: AsyncIterable<T>) => AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: Iterable<T>, iter2: Iterable<T>): AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: Iterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>, iter2: Iterable<T>): AsyncIterableIterator<[T, R]>
export function zip<T, R>(iter1: AsyncIterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<[T, R]>

export function run<T, R>(iter: Iterable<T>, ...fn: ((f: Iterable<any>) => any)[]): Promise<AsyncIterableIterator<R>>
export function run<T, R>(iter: Iterable<T>, ...fn: ((f: Iterable<any>) => any)[]): Promise<R>
export function run<T, R>(iter: Iterable<T>, ...fn: ((f: AsyncIterable<any>) => any)[]): Promise<AsyncIterableIterator<R>>
export function run<T, R>(iter: Iterable<T>, ...fn: ((f: AsyncIterable<any>) => any)[]): Promise<R>

export function repeat<T>(supply: () => T): AsyncIterableIterator<T>
export function repeat<T>(supply: T): AsyncIterableIterator<T>

export function collect<T>(iter: Iterable<T>): Promise<[T]>
export function collect<T>(iter: AsyncIterable<T>): Promise<[T]>