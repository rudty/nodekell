import {
    Iter,
    EP,
    PFlat,
} from './utils';

/**
 * https://github.com/rudty/nodekell#rangeof
 *
 * @deprecated use `flat` or `dflat` instead
 * @param a
 */
export function rangeOf<T>(...a: T[]): AsyncIterableIterator<PFlat<T>>;

/**
 * No Document
 *
 * @param supply
 * @param iter
 */
export function firstOrGet<T, Y>(supply: () => (Y | Promise<Y>)): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: () => Y): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Promise<() => (Y | Promise<Y>)>): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Promise<() => Y>): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Y | Promise<Y>): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Y): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: () => (Y | Promise<Y>), iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: () => Y, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Promise<() => (Y | Promise<Y>)>, iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Promise<() => Y>, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Y | Promise<Y>, iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Y, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#emptythen
 *
 * @param supply
 * @param iter
 */
export function emptyThen<T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>), iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#
 *
 * @param iter
 */
// export function collect<T>(iter: Iter<T | Promise<T>>): Promise<T[]>;
export function collect<T>(iter: Iter<T>): Promise<EP<T>[]>;

/**
 * https://github.com/rudty/nodekell#collectmap
 *
 * **Note**
 * - if want you high quality type, use type assertion
 * ```ts
 * const a = [['a', 0], ['b', 1]] as [string, number][];
 * const r = await collectMap(a); // Map<string, number>
 * ```
 *
 * @param iter
 */
export function collectMap<T extends any[]>(iter: Iter<T | Promise<T>>): Promise<Map<T[0], T[1]>>;
// export function collectMap<K, V>(iter: Iter<[K, V] | Promise<[K, V]>>): Promise<Map<K, V>>;

/**
 * https://github.com/rudty/nodekell#collectset
 *
 * @param iter
 */
// export function collectSet<T>(iter: Iter<T | Promise<T>>): Promise<Set<T>>;
export function collectSet<T>(iter: Iter<T>): Promise<Set<EP<T>>>;

/**
 * https://github.com/rudty/nodekell#foreach
 *
 * @param f
 * @param iter
 */
export function forEach<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => Promise<R[]>;
export function forEach<T, R>(f: (elem: EP<T>) => R): (iter: Iter<T>) => Promise<EP<R>[]>;

export function forEach<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): Promise<R[]>;
export function forEach<T, R>(f: (elem: EP<T>) => R, iter: Iter<T>): Promise<EP<R>[]>;

/**
 * https://github.com/rudty/nodekell#distinctby
 *
 * @param f
 * @param iter
 */
export function distinctBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function distinctBy<T>(f: (elem: EP<T>) => any): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

export function distinctBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function distinctBy<T>(f: (elem: EP<T>) => any, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#distinct
 *
 * @param iter
 */
// export function distinct<T>(iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function distinct<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#some
 *
 * @param f
 * @param iter
 */
export function some<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
export function some<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => Promise<boolean>;

export function some<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<boolean>;
export function some<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<boolean>;

/**
 * https://github.com/rudty/nodekell#every
 *
 * @param f
 * @param iter
 */
export function every<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
export function every<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => Promise<boolean>;

export function every<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<boolean>;
export function every<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<boolean>;

/**
 * https://github.com/rudty/nodekell#maxby
 *
 * @param f
 * @param iter
 */
export function maxBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => Promise<T>;

export function maxBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#minby
 *
 * @param f
 * @param iter
 */
export function minBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => Promise<T>;

export function minBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#count
 *
 * @param iter
 */
export function count(iter: Iter<any>): Promise<number>;
export function count(obj: object): Promise<number>;

/*
  about types of sum, max, min

  set type number or string, bug occurs

  so use generic
*/

/**
 * https://github.com/rudty/nodekell#sum
 *
 * **Note**
 * - please use can summed value
 *
 * @param iter
 */
export function sum<T>(iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#max
 *
 * **Note**
 * - please use can ordered value
 *
 * @param iter
 */
export function max<T>(iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#min
 *
 * **Note**
 * - please use can ordered value
 *
 * @param iter
 */
export function min<T>(iter: Iter<T | Promise<T>>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#average
 *
 * @param iter
 */
export function average(iter: Iter<number | Promise<number>>): Promise<number>;

/**
 * https://github.com/rudty/nodekell#splitby
 *
 * @param f
 * @param any
 */
export function splitBy<T, R>(f: (elem: T) => (Iter<R> | Promise<Iter<R>>)): (any: T) => AsyncIterableIterator<R>;

export function splitBy<T, R>(f: (elem: T) => (Iter<R> | Promise<Iter<R>>), any: T): AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#errorthen
 *
 * @param supply
 * @param iter
 */
export function errorThen<T, Y>(supply: (error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: (error: any) => (Iter<Y> | Promise<Iter<Y>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y> | Promise<Iter<Y>>)>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: (error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: (error: any) => (Iter<Y> | Promise<Iter<Y>>), iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Promise<(error: any) => (Iter<Y> | Promise<Iter<Y>>)>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function errorThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function errorThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#then
 *
 * @param f
 * @param t
 */
export function then<T, R>(f: (t: T) => R): (t: T) => R;

export function then<T, R>(f: (t: T) => R, t: T): R;


/**
 * https://github.com/rudty/nodekell#tap
 *
 * @param f
 * @param t
 */
// export function tap<T, R>(f: (t: T) => R): (t: T | Promise<T>) => Promise<T>;

// export function tap<T, R>(f: (t: T) => R, t: T): Promise<T>;
// export function tap<T, R>(f: (t: T) => R, t: Promise<T>): Promise<T>;

/**
 * https://github.com/rudty/nodekell#buffer
 *
 * @param supply
 * @param iter
 */
export function buffer<T>(supply: number | Promise<number>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T[]>;
export function buffer<T>(supply: number | Promise<number>): (iter: Iter<T>) => AsyncIterableIterator<EP<T>[]>;

export function buffer<T>(supply: number | Promise<number>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T[]>;
export function buffer<T>(supply: number | Promise<number>, iter: Iter<T>): AsyncIterableIterator<EP<T>[]>;
