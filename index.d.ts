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
export function run<T, R>(iter: Iterable<T>, ...fn: ((f: any) => any)[]): Promise<any>
export function run<T, R>(iter: AsyncIterable<T>, ...fn: ((f: any) => any)[]): Promise<any>

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
export function emptyThen<T>(supply: () => Iterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => AsyncIterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => Iterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: () => AsyncIterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: Iterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: AsyncIterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: Iterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function emptyThen<T>(supply: AsyncIterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>

export function collectMap<K, V>(iter: AsyncIterable<[K, V]>): Map<K, V>
export function collectMap<K, V>(iter: Iterable<[K, V]>): Map<K, V>

export function collectSet<T>(iter: AsyncIterable<T>): Set<T>
export function collectSet<T>(iter: Iterable<T>): Set<T>

export function forEach<T, R>(action: (elem: T) => R, iter: AsyncIterable<T>): Promise<[R]>
export function forEach<T, R>(action: (elem: T) => R, iter: Iterable<T>): Promise<[R]>
export function forEach<T, R>(action: (elem: T) => R): (iter: AsyncIterable<T>) => Promise<[R]>
export function forEach<T, R>(action: (elem: T) => R): (iter: Iterable<T>) => Promise<[R]>

export function distinctBy<T>(fn: (elem: T) => boolean): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function distinctBy<T>(fn: (elem: T) => boolean): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function distinctBy<T>(fn: (elem: T) => boolean, iter: Iterable<T>): AsyncIterableIterator<T>
export function distinctBy<T>(fn: (elem: T) => boolean, iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function distinct<T>(iter: Iterable<T>): AsyncIterableIterator<T>
export function distinct<T>(iter: AsyncIterable<T>): AsyncIterableIterator<T>

export function some<T>(fn: (elem: T) => boolean, iter: Iterable<T>): Promise<boolean>
export function some<T>(fn: (elem: T) => boolean, iter: AsyncIterable<T>): Promise<boolean>
export function some<T>(fn: (elem: T) => boolean): (iter: Iterable<T>) => Promise<boolean>
export function some<T>(fn: (elem: T) => boolean): (iter: AsyncIterable<T>) => Promise<boolean>

export function every<T>(fn: (elem: T) => boolean, iter: Iterable<T>): Promise<boolean>
export function every<T>(fn: (elem: T) => boolean, iter: AsyncIterable<T>): Promise<boolean>
export function every<T>(fn: (elem: T) => boolean): (iter: Iterable<T>) => Promise<boolean>
export function every<T>(fn: (elem: T) => boolean): (iter: AsyncIterable<T>) => Promise<boolean>

export function maxBy<T, R>(fn: (elem: T) => R, iter: Iterable<T>): Promise<T>
export function maxBy<T, R>(fn: (elem: T) => R, iter: AsyncIterable<T>): Promise<T>
export function maxBy<T, R>(fn: (elem: T) => R): (iter: Iterable<T>) => Promise<T>
export function maxBy<T, R>(fn: (elem: T) => R): (iter: AsyncIterable<T>) => Promise<T>

export function minBy<T, R>(fn: (elem: T) => R, iter: Iterable<T>): Promise<T>
export function minBy<T, R>(fn: (elem: T) => R, iter: AsyncIterable<T>): Promise<T>
export function minBy<T, R>(fn: (elem: T) => R): (iter: Iterable<T>) => Promise<T>
export function minBy<T, R>(fn: (elem: T) => R): (iter: AsyncIterable<T>) => Promise<T>

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
export function errorThen<T>(supply: () => Iterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: () => AsyncIterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: () => Iterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: () => AsyncIterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: Iterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: AsyncIterable<T>): (iter: Iterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: Iterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function errorThen<T>(supply: AsyncIterable<T>): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>

export function then<T, R>(fn: (iter: Iterable<T>) => Iterable<R>): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: Iterable<T>) => AsyncIterable<R>): (iter: Iterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => Iterable<R>): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => AsyncIterable<R>): (iter: AsyncIterable<T>) => AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: Iterable<T>) => Iterable<R>, iter: Iterable<T>): AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: Iterable<T>) => AsyncIterable<R>, iter: Iterable<T>): AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => Iterable<R>, iter: AsyncIterable<T>): AsyncIterableIterator<R>
export function then<T, R>(fn: (iter: AsyncIterable<T>) => AsyncIterable<R>, iter: AsyncIterable<T>): AsyncIterableIterator<R>

export function buffer<T>(supply: number, iter: Iterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>, iter: Iterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: number, iter: AsyncIterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>, iter: AsyncIterable<T>): AsyncIterableIterator<[T]>
export function buffer<T>(supply: number): (iter: Iterable<T>) => AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>): (iter: Iterable<T>) => AsyncIterableIterator<[T]>
export function buffer<T>(supply: number): (iter: AsyncIterable<T>) => AsyncIterableIterator<[T]>
export function buffer<T>(supply: Promise<number>): (iter: AsyncIterable<T>) => AsyncIterableIterator<[T]>

export function groupBy<K, V>(group: (elem: V) => K, iter: Iterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>, iter: Iterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => K, iter: AsyncIterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>, iter: AsyncIterable<V>): Map<K, V>
export function groupBy<K, V>(group: (elem: V) => K): (iter: Iterable<V>) => Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>): (iter: Iterable<V>) => Map<K, V>
export function groupBy<K, V>(group: (elem: V) => K): (iter: AsyncIterable<V>) => Map<K, V>
export function groupBy<K, V>(group: (elem: V) => Promise<K>): (iter: AsyncIterable<V>) => Map<K, V>

export function concat<T>(iter1: Iterable<T>, iter2: Iterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: Iterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: AsyncIterable<T>, iter2: Iterable<T>): AsyncIterableIterator<T>
export function concat<T>(iter1: AsyncIterable<T>, iter2: AsyncIterable<T>): AsyncIterableIterator<T>

export function timeout<T>(time: number, fn: () => Promise<T>): Promise<T>
export function timeout<T>(time: number, fn: Promise<T>): Promise<T>
export function timeout<T>(time: number): (fn: () => Promise<T>) => Promise<T>
export function timeout<T>(time: number): (fn: Promise<T>) => Promise<T>

export function withTimeout<T>(time: number, iter: AsyncIterable<T>): AsyncIterableIterator<T>
export function withTimeout<T>(time: number, iter: Iterable<T>): AsyncIterableIterator<T>
export function withTimeout<T>(time: number): (iter: AsyncIterable<T>) => AsyncIterableIterator<T>
export function withTimeout<T>(time: number): (iter: Iterable<T>) => AsyncIterableIterator<T>

export function sleep(duration: number): Promise<void>
export function interval(timeout: number, timeHandler: (...params: any[]) => void, ...params: any[]): any

