// TypeScript Version: 3.4

import {
    Iter,
    EP,
    FlatForInternalFn,
    ExtractPromise,
    AssociateMap,
    LiteralWrapper,
} from './utils';

/**
 * No Document
 *
 * @param supply
 * @param iter
 */
export function firstOrGet<T, Y>(supply: () => (Y | Promise<Y>), iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: () => Y, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Promise<() => (Y | Promise<Y>)>, iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Promise<() => Y>, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Y | Promise<Y>, iter: Iter<T | Promise<T>>): Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Y, iter: Iter<T>): Promise<EP<T> | EP<Y>>;

export function firstOrGet<T extends Iter<any>, Y>(supply: () => (Y | Promise<Y>)): (iter: T) => Promise<FlatForInternalFn<T> | EP<Y>>;
export function firstOrGet<T extends Iter<any>, Y>(supply: Promise<() => (Y | Promise<Y>)>): (iter: T) => Promise<FlatForInternalFn<T> | EP<Y>>;
export function firstOrGet<T extends Iter<any>, Y>(supply: Y): (iter: T) => Promise<FlatForInternalFn<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: () => (Y | Promise<Y>)): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: () => Y): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Promise<() => (Y | Promise<Y>)>): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Promise<() => Y>): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

export function firstOrGet<T, Y>(supply: Y | Promise<Y>): (iter: Iter<T | Promise<T>>) => Promise<T | Y>;
export function firstOrGet<T, Y>(supply: Y): (iter: Iter<T>) => Promise<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#emptythen
 *
 * @param supply
 * @param iter
 */
export function emptyThen<T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>), iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>), iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>, iter: Iter<T>): AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T extends Iter<any>, Y extends Iter<any>>(supply: () => (Y | Promise<Y>)): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
export function emptyThen<T extends Iter<any>, Y extends Iter<any>>(supply: Promise<() => (Y | Promise<Y>)>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;
export function emptyThen<T extends Iter<any>, Y extends Iter<any>>(supply: Y): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T> | FlatForInternalFn<Y>>;

export function emptyThen<T, Y>(supply: () => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: () => (Iter<Y> | Promise<Iter<Y>>)): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>)>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Promise<() => (Iter<Y> | Promise<Iter<Y>>)>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

export function emptyThen<T, Y>(supply: Iter<Y | Promise<Y>> | Promise<Iter<Y | Promise<Y>>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T | Y>;
export function emptyThen<T, Y>(supply: Iter<Y> | Promise<Iter<Y>>): (iter: Iter<T>) => AsyncIterableIterator<EP<T> | EP<Y>>;

/**
 * https://github.com/rudty/nodekell#
 *
 * @param iter
 */
// export function collect<T extends Iter<any>>(iter: T): Promise<FlatForInternalFn<T>[]>;

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
 * https://github.com/rudty/nodekell#collectobject
 *
 * @param iter
 */
export function collectObject(iter: Iter<any[] | Promise<any[]>>): Promise<any>;

/**
 * https://github.com/rudty/nodekell#foreach
 *
 * @param f
 * @param iter
 */
export function forEach<T, R>(f: (elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): Promise<R[]>;
// export function forEach<T, R>(f: (elem: EP<T>) => R, iter: Iter<T>): Promise<EP<R>[]>;

export function forEach<T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R, iter: T): Promise<EP<R>[]>;
export function forEach<T extends Iter<any>, R>(f: (elem: FlatForInternalFn<T>) => R): (iter: T) => Promise<EP<R>[]>;

export function forEach<T, R>(f: (elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => Promise<R[]>;
// export function forEach<T, R>(f: (elem: EP<T>) => R): (iter: Iter<T>) => Promise<EP<R>[]>;

/**
 * https://github.com/rudty/nodekell#foreachindexed
 *
 * @param f
 * @param iter
 */
export function forEachIndexed<T, R>(f: (idx: number, elem: T) => (R | Promise<R>), iter: Iter<T | Promise<T>>): Promise<R[]>;

export function forEachIndexed<T extends Iter<any>, R>(f: (idx: number, elem: FlatForInternalFn<T>) => R, iter: T): Promise<EP<R>[]>;
export function forEachIndexed<T extends Iter<any>, R>(f: (idx: number, elem: FlatForInternalFn<T>) => R): (iter: T) => Promise<EP<R>[]>;

export function forEachIndexed<T, R>(f: (idx: number, elem: T) => (R | Promise<R>)): (iter: Iter<T | Promise<T>>) => Promise<R[]>;

/**
 * https://github.com/rudty/nodekell#distinctby
 *
 * @param f
 * @param iter
 */
export function distinctBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
// export function distinctBy<T>(f: (elem: EP<T>) => any, iter: Iter<T>): AsyncIterableIterator<EP<T>>;

export function distinctBy<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => any, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function distinctBy<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => any): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;

export function distinctBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
// export function distinctBy<T>(f: (elem: EP<T>) => any): (iter: Iter<T>) => AsyncIterableIterator<EP<T>>;

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
export function some<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<boolean>;
// export function some<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<boolean>;

export function some<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): Promise<boolean>;
export function some<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => Promise<boolean>;

export function some<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
// export function some<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => Promise<boolean>;

/**
 * https://github.com/rudty/nodekell#every
 *
 * @param f
 * @param iter
 */
export function every<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<boolean>;
// export function every<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<boolean>;

export function every<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): Promise<boolean>;
export function every<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => Promise<boolean>;

export function every<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<boolean>;
// export function every<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T>) => Promise<boolean>;

/**
 * https://github.com/rudty/nodekell#maxby
 *
 * @param f
 * @param iter
 */
export function maxBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): Promise<T>;

export function maxBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => Promise<T>;

/**
 * https://github.com/rudty/nodekell#minby
 *
 * @param f
 * @param iter
 */
export function minBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): Promise<T>;

export function minBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => Promise<T>;

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
export function splitBy<T, R>(f: (t: T) => (Iter<R> | Promise<Iter<R>>), any: T): AsyncIterableIterator<R>;

// export function splitBy<T, R extends Iter<any>>(f: (t: T) => (R | Promise<R>)): (any: T) => AsyncIterableIterator<FlatForInternalFn<R>>;

export function splitBy<T, R>(f: (t: T) => (Iter<R> | Promise<Iter<R>>)): (any: T) => AsyncIterableIterator<R>;

/**
 * https://github.com/rudty/nodekell#then
 *
 * @param f
 * @param t
 */
export function then<T, R>(f: (t: T) => R, t: T): R;

export function then<T, R>(f: (t: T) => R): (t: T) => R;

/**
 * https://github.com/rudty/nodekell#tap
 *
 * @param f
 * @param t
 */
export function tap<T>(f: (t: T) => any, t: T): Promise<EP<T>>;

export function tap<T>(f: (t: T) => any): (t: T) => Promise<EP<T>>;

/**
 * https://github.com/rudty/nodekell#buffer
 *
 * @param supply
 * @param iter
 */
export function buffer<T>(supply: number | Promise<number>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T[]>;
// export function buffer<T>(supply: number | Promise<number>, iter: Iter<T>): AsyncIterableIterator<EP<T>[]>;

export function buffer<T extends Iter<any>>(supply: number | Promise<number>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>[]>;
export function buffer<T extends Iter<any>>(supply: number | Promise<number>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>[]>;

export function buffer<T>(supply: number | Promise<number>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T[]>;
// export function buffer<T>(supply: number | Promise<number>): (iter: Iter<T>) => AsyncIterableIterator<EP<T>[]>;

/**
 *
 *
 * @param f
 * @param iter
 */
export function find<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<T | undefined>;
// export function find<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<EP<T> | undefined>;

export function find<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): Promise<FlatForInternalFn<T> | undefined>;
export function find<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => Promise<FlatForInternalFn<T> | undefined>;

export function find<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<T | undefined>;
// export function find<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<EP<T> | undefined>;

/**
 *
 *
 * @param f
 * @param iter
 */
export function findLast<T>(f: (elem: T) => (boolean | Promise<boolean>), iter: Iter<T | Promise<T>>): Promise<T | undefined>;
// export function findLast<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>), iter: Iter<T>): Promise<EP<T> | undefined>;

export function findLast<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>), iter: T): Promise<FlatForInternalFn<T> | undefined>;
export function findLast<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => (boolean | Promise<boolean>)): (iter: T) => Promise<FlatForInternalFn<T> | undefined>;

export function findLast<T>(f: (elem: T) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<T | undefined>;
// export function findLast<T>(f: (elem: EP<T>) => (boolean | Promise<boolean>)): (iter: Iter<T | Promise<T>>) => Promise<EP<T> | undefined>;

/**
 * https://github.com/rudty/nodekell#peek
 *
 * @param f
 * @param iter
 */
export function peek<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function peek<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => any, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function peek<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => any): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
export function peek<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#collectint8
 *
 * @param iter iterator or async iterator
 */
export function collectInt8(iter: Iter<number | Promise<number>>): Promise<Int8Array>;

/**
 * https://github.com/rudty/nodekell#collectint16
 *
 * @param iter iterator or async iterator
 */
export function collectInt16(iter: Iter<number | Promise<number>>): Promise<Int16Array>;

/**
 * https://github.com/rudty/nodekell#collectint32
 *
 * @param iter iterator or async iterator
 */
export function collectInt32(iter: Iter<number | Promise<number>>): Promise<Int32Array>;

/**
 * https://github.com/rudty/nodekell#collectuint8
 *
 * @param iter iterator or async iterator
 */
export function collectUint8(iter: Iter<number | Promise<number>>): Promise<Uint8Array>;

/**
 * https://github.com/rudty/nodekell#collectuint16
 *
 * @param iter iterator or async iterator
 */
export function collectUint16(iter: Iter<number | Promise<number>>): Promise<Uint16Array>;

/**
 * https://github.com/rudty/nodekell#collectuint32
 *
 * @param iter iterator or async iterator
 */
export function collectUint32(iter: Iter<number | Promise<number>>): Promise<Uint32Array>;

/**
 * https://github.com/rudty/nodekell#collectuint8clamped
 *
 * @param iter iterator or async iterator
 */
export function collectUint8Clamped(iter: Iter<number | Promise<number>>): Promise<Uint8ClampedArray>;

/**
 *
 * https://github.com/rudty/nodekell#frequencies
 *
 * @param iter iterable or async iterable
 */
// export function frequencies<T>(iter: Iter<T>): Promise<Map<EP<T>, number>>;
export function frequencies<T extends Iter<any>>(iter: T): Promise<Map<FlatForInternalFn<T>, number>>;

/**
 *
 * https://github.com/rudty/nodekell#frequenciesby
 *
 * @param f key function
 * @param iter iterable or async iterable
 */
export function frequenciesBy<K, T>(f: (elem: T) => (K | Promise<K>), iter: Iter<T | Promise<T>>): Promise<Map<K, number>>;

export function frequenciesBy<K, T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => K, iter: T): Promise<Map<EP<K>, number>>;
export function frequenciesBy<K, T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => K): (iter: T) => Promise<Map<EP<K>, number>>;

export function frequenciesBy<K, T>(f: (elem: T) => (K | Promise<K>)): (iter: Iter<T | Promise<T>>) => Promise<Map<K, number>>;

/**
 * https://github.com/rudty/nodekell#distinctuntilchangedby
 *
 * @param f
 * @param iter
 */
export function distinctUntilChangedBy<T>(f: (elem: T) => any, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function distinctUntilChangedBy<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => any, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
export function distinctUntilChangedBy<T extends Iter<any>>(f: (elem: FlatForInternalFn<T>) => any): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
export function distinctUntilChangedBy<T>(f: (elem: T) => any): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * https://github.com/rudty/nodekell#distinctuntilchangedby
 *
 * @param iter
 */
export function distinctUntilChanged<T>(iter: Iter<T>): AsyncIterableIterator<EP<T>>;

/**
 * https://github.com/rudty/nodekell#associateby
 *
 * returns a Map using iterator.
 * when the function returns Array
 * it uses the first argument as key and the second argument as value.
 * when not in an array, the key and value are both return values.
 *
 * **Note**
 * - if want you high quality type, use type assertion
 *
 * @example
 *      const arr0 = [1, 2, 3];
 *      const m0 = await F.associateBy(e => [e, e * 2], arr0);
 *      console.log(m0);
 *      // => Map { 1 => 2, 2 => 4, 3 => 6 }
 *
 *      const arr1 = [1, 2, 3];
 *      const m1 = await F.associateBy(e => e + 1, arr1);
 *      console.log(m1);
 *      // => Map { 2 => 2, 3 => 3, 4 => 4 }
 *
 * @param fn convert function
 * @param iter any iterator
 */
export function associateBy<T, R>(fn: (arg: T) => R, iter: Iter<T | Promise<T>>): Promise<AssociateMap<R>>;
export function associateBy<T extends Iter<any>, R>(fn: (arg: FlatForInternalFn<T>) => R, iter: T): Promise<AssociateMap<R>>;
export function associateBy<T extends Iter<any>, R>(fn: (arg: FlatForInternalFn<T>) => R): (iter: T) => Promise<AssociateMap<R>>;

/**
 * Use regular expression
 * return first matching in str
 * @example
 *      const r = F.reFind(/H(\d)/, "H1ello H2World");
 *      console.log(r); // print H1
 *
 *
 *
 * @param re find regex
 * @param str find String
 * @returns first matching string
 */
export function reFind(re: RegExp | string, str: string): string;
export function reFind(re: RegExp | string): (str: string) => string;

/**
 * Use regular expression
 * return first matching in str and groups
 * @example
 *      const r = F.reFindSubmatch(/H(\d)/, "H1ello H2World");
 *      console.log(r[0]); // print H1
 *      console.log(r[1]); // print 1
 *
 *
 *
 * @param re find regex
 * @param str find String
 * @returns Array<String> matching strings and groups
 */
export function reFindSubmatch(re: RegExp | string, str: string): string[];
export function reFindSubmatch(re: RegExp | string): (str: string) => string[];

/**
 * Use regular expression
 * return all matching in str
 * @example
 *      const r = F.reFindAll(/H(\d)/, "H1ello H2World");
 *      console.log(r);
 *      //print ['H1', 'H2']
 *
 * @param re find regex
 * @param str find String
 * @returns matching strings
 */
export function reFindAll(re: RegExp | string, str: string): string[];
export function reFindAll(re: RegExp | string): (str: string) => string[];

/**
 * Use regular expression
 * return all matching in str and groups
 * @example
 *      const r = F.reFindAllSubmatch(/H(\d)/, "H1ello H2World");
 *      console.log(r[0][0]); // print H1
 *      console.log(r[0][1]); // print 1
 *
 *      console.log(r[1][0]); // print H2
 *      console.log(r[1][1]); // print 2
 *
 *
 * @param re find regex
 * @param str find String
 * @returns Array<Array<String>> matching strings and groups
 */
export function reFindAllSubmatch(re: RegExp | string, str: string): string[][];
export function reFindAllSubmatch(re: RegExp | string): (str: string) => string[][];

/**
 * 1. await promise
 * 2. Fetch all the elements of type iterator.
 *    When an element returns a promise, it waits for it to finish.
 * 3. Fetch all elements of async iterator type.
 * @example
 *      const r = await F.run([1,2,3,4,5],
 *          F.map(SomethingNetworkJob),
 *          F.map(console.log),
 *          F.block);
 */
export function block(...value: any[]): Promise<void>;

/**
 * Sort the values in ascending order.
 */
export function sort<T>(iter: Iter<T | Promise<T>>): Promise<ArrayLike<ExtractPromise<T>>>;

/**
 * Sort the values by the return value of the function.
 * iterator or asyncIterator take all the values and sorts them.
 *
 * @example
 *      const arr = [4, 3, 2, 5, 1];
 *      const res = await F.sortBy((a, b) => a - b, arr);
 *      console.log(res); // print [1,2,3,4,5]
 *
 * @param comparator compareator function
 * @param iter any iterable
 * @returns new sorted array
 */
export function sortBy<T>(comparator: (lhs: ExtractPromise<T>, rhs: ExtractPromise<T>) => number | Promise<number>, iter: Iter<T | Promise<T>>): Promise<ArrayLike<ExtractPromise<T>>>;
export function sortBy<T>(comparator: (lhs: T, rhs: T) => number | Promise<number>): (iter: Iter<T | Promise<T>>) => Promise<ArrayLike<T>>;

/**
 * Can be used with sort function
 * @example
 *      const cmp = F.comparator((a: number, b: number) => a < b);
 *      console.log(cmp(1, 2)); // print -1
 *
 *      const cmp2 = F.comparator<number>((a, b) => a < b);
 *      console.log(cmp2(1, 2)); // print -1
 * @see sort
 * @see sortBy
 */
export function comparator(fn: (lhs: any, rhs: any) => boolean): (lhs: any, rhs: any) => number;
export function comparator(fn: (lhs: any, rhs: any) => Promise<boolean>): (lhs: any, rhs: any) => Promise<number>;
export function comparator<L, R>(fn: (lhs: ExtractPromise<L>, rhs: ExtractPromise<R>) => boolean, lhs: L, rhs: R): L extends Promise<any> ? Promise<number> : R extends Promise<any> ? Promise<number>: number;
export function comparator<L, R = L>(fn: (lhs: L, rhs: R) => boolean): (lhs: L, rhs: R) => number;
export function comparator<L, R = L>(fn: (lhs: L, rhs: R) => Promise<boolean>): (lhs: L | Promise<L>, rhs: R | Promise<R>) => Promise<number>;
export function comparator<L, R = L>(fn: (lhs: L, rhs: R) => Promise<boolean>, lhs: L | Promise<L>, rhs: R | Promise<R>): Promise<number>;
export function comparator<L, R = L>(fn: (lhs: ExtractPromise<L>, rhs: R) => boolean, lhs: L): (rhs: R) => L extends Promise<any> ? Promise<number>: number;
export function comparator<L, R = L>(fn: (lhs: L, rhs: R) => Promise<boolean>, lhs: L | Promise<L>): (rhs: R | Promise<R>) => Promise<number>;

/**
 * Add {iter} to the {index} position of {iter} received as an argument.
 * If {index} is greater than the length of {iter}, it is added to the end of {iter}.
 * @param value add value
 * @param index add index
 * @param iter any iterable
 */
export function insertAt<T>(value: T | Promise<T>, index: number, iter: Iter<T>): AsyncIterableIterator<T>;
export function insertAt<T>(value: T, index: number): (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
export function insertAt<T>(value: T): (index: number) => (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;

/**
 * Iterates through A and removes the first element that satisfies the condition.
 *
 * @example
 *      for await (const e of F.removeFirst(1, [1,2,3,4])) {
 *          console.log(e);
 *      }
 *      // print
 *      // 2
 *      // 3
 *      // 4
 *
 *      const r = F.removeFirst((e) => e % 2 === 0, [1,2,3,4]);
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      // print
 *      // 1
 *      // 3
 *      // 4
 *
 * @param {*} x remove value or find function
 * @param {Iterable | AsyncIterable} iter any iterable
 */
export function removeFirst<T>(predicate: (value: T) => boolean | Promise<boolean>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function removeFirst<T>(predicate: (value: T) => boolean | Promise<boolean>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function removeFirst<T>(predicate: Promise<(value: T) => boolean | Promise<boolean>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function removeFirst<T>(predicate: Promise<(value: T) => boolean | Promise<boolean>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function removeFirst<T>(value: T | Promise<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function removeFirst<T>(value: T | Promise<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;

/**
 * Update {iter} to the {index} position of {iter} received as an argument.
 *
 * @example
 *      const arr = [1,2,3,4,5];
 *      const u = F.updateAt(
 *          99, // update value
 *          0,  // index
 *          arr // iterator
 *      );
 *      for await (const e of u) {
 *          console.log(e);
 *      }
 *      //print
 *      // 99
 *      // 2
 *      // 3
 *      // 4
 *      // 5
 * @param {any} value add value
 * @param {Number} index add index
 * @param {Iterable | AsyncIterable} iter any iterable
 * @returns new AsyncIterator
 */
export function updateAt<T>(value: T | Promise<T>, index: number, iter: Iter<T>): AsyncIterableIterator<T>;
export function updateAt<T>(value: T, index: number): (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;
export function updateAt<T>(value: T): (index: number) => (iter: Iter<ExtractPromise<T>>) => AsyncIterableIterator<ExtractPromise<T>>;

/**
 * In {iter}, update the first value that matches {x} to {value}.
 * @example
 *      const arr = [1, 2, 3];
 *      const r = F.updateFirst(
 *          99, // update value
 *          1,  // find value
 *          arr);
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      // print
 *      // 99
 *      // 2
 *      // 3
 *
 * @param value update value
 * @param predicate update value or find function
 * @param iter any iterable
 */
export function updateFirst<T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: (value: T) => boolean | Promise<boolean>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function updateFirst<T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: (value: T) => boolean | Promise<boolean>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function updateFirst<T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: Promise<(value: T) => boolean | Promise<boolean>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function updateFirst<T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: Promise<(value: T) => boolean | Promise<boolean>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
export function updateFirst<T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: T | Promise<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
export function updateFirst<T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: T | Promise<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
