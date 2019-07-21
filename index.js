'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const arrayListDefaultSize = 32;

/**
 * arraylist using native array
 * 
 * like template vector<int>
 * 
 * const int8arr = new _ArrayList(Int8Array); // ArrayList<Int8>
 * const int16arr = new _ArrayList(Int16Array); // ArrayList<Int16>
 * const int32arr = new _ArrayList(Int32Array); // ArrayList<Int32>
 * 
 * internal only
 */
class _ArrayList {
    /**
     * native array constructor
     * support
     * 
     * Int8Array
     * Int16Array
     * Int32Array
     * 
     * Uint8ClampedArray
     * Uint8Array
     * Uint16Array
     * Uint32Array
     * 
     * @param {Function} ArrayCtor 
     */
    constructor(ArrayCtor) {
        const buf = new ArrayBuffer(ArrayCtor.BYTES_PER_ELEMENT * arrayListDefaultSize);
        this._data = new (ArrayCtor)(buf);
        this._ctor = ArrayCtor;
        this._length = 0;
    }

    /**
     * [1,2]
     * grow(4)
     * [1,2,0,0] <- new 
     */
    _grow(size) {
        const byteSize = this._ctor.BYTES_PER_ELEMENT;
        const buf = new ArrayBuffer(size * byteSize);
        const newData = new (this._ctor)(buf);
        const oldData = this._data;

        // //copy old elem
        // for (let i = oldData.length - 1; i >= 0; --i) {
        //     newData[i] = oldData[i];
        // }
        newData.set(oldData);
        this._data = newData;
    }

    add(v) {
        const len = this._length;
        if (len === this._data.length) {
            this._grow(len * 2);
        }

        this._data[len] = v;
        this._length += 1;
    }

    /**
     * get
     * arr[i]
     * @param {number} i index
     */
    get(i) {
        return this._data[i];
    }

    /**
     * set
     * arr[i] = e;
     * @param {number} i index
     * @param {T} e elem
     */
    set(i, e) {
        this._data[i] = e;
    }

    /**
     * @returns {number} length
     */
    get length() {
        return this._length;
    }

    /**
     * not really clear
     * set the length 0 only
     */
    clear() {
        this._length = 0;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this._length; ++i) {
            yield this._data[i];
        }
    }

    toArray() {
        return this._data.slice(0, this._length);
    }
}

/**
 * collection interface
 * like java Queue<T>
 * 
 * internal only
 */
class _Queue {
    constructor() {
        this.head = this.tail = null;
    }

    add(v) {
        const n = { value: v, next: null };
        if (this.head) {
            this.tail.next = n;
        } else {
            this.head = n;
        }
        this.tail = n;
    }

    _unsafePop() {
        const f = this.head;
        if (f !== this.tail) {
            this.head = f.next;
        } else {
            this.head = this.tail = null;
        }
        f.next = null;
        return f.value;
    }

    /**
     * remove head and return
     * return head or throw Error if empty
     */
    remove() {
        if (this.head === null) {
            throw new Error("no such element");
        }
        return this._unsafePop();
    }

    /**
     * remove head and return
     * return head or null if empty
     */
    poll() {
        if (this.head === null) {
            return null;
        }
        return this._unsafePop();
    }

    /**
     * not remove 
     * return head or throw Error if empty
     */
    element() {
        const f = this.head;
        if (f === null) {
            throw new Error("no such element");
        }
        return f.value;
    }

    /**
     * not remove 
     * return head or null if empty
     */
    peek() {
        const f = this.head;
        if (f === null) {
            return null;
        }
        return f.value;
    }

    isEmpty() {
        return this.head === null;
    }


    /**
     * clear all elements
     */
    clear() {
        //remove chain
        //help gc
        let it = this.head;
        while (it) {
            const n = it.next;
            it.value = it.next = null;
            it = n;
        }

        this.head = this.tail = null;
    }

    *[Symbol.iterator]() {
        let it = this.head;
        while (it) {
            yield it.value;
            it = it.next;
        }
    }

    /**
     * yields the value from head and then deletes the value
     * After the iterator ends, the size of the Queue is zero
     * 
     * same as
     * while (false === q.isEmpty()) {
     *     yield q.remove();
     * }
     * yield value and assign next to null
     * help gc
     */
    *removeIterator() {
        let it = this.head;
        while (it) {
            const p = it;
            yield p.value;
            it = p.next;

            p.value = null;
            p.next = null;
        }
    }
}

/**
 * empty object
 * it is always return true when used as an argument in `equals` and `match` function
 * @example
 * 
 *      F.equals(1, F._); // true
 *      F.equals({}, F._); // true
 *      F.equals({ a: 1 }, { a: F._ }); //true
 * 
 *      {} === F._; // false
 *      1 === F._; // false
 *      
 */
const underBar = Object.freeze({});
const _ = underBar;

/**
 * currying function wrapper
 * ex)
 * var mySum = curry((a,b,c) => {return a+b+c;});
 *
 * var mySum1 = mySum(1)
 * var mySum2 = mySum1(2)
 * var sum = mySum2(3) // <-- real call
 */
const curry = (fn) => (...a) => {
    if (fn.length <= a.length) {
        return fn(...a);
    } else {
        return (...b) => curry(fn)(...a, ...b);
    }
};

const add = curry((a, b) => a + b);

const asc = (a, b) => a > b ? 1 : a < b ? -1 : 0;

const average = async (iter) => {
    let c = 0;
    let sum = 0;
    for await (const e of iter) {
        ++c;
        sum += e;
    }
    return sum / c;
};

const buffer = curry(async function *(supply, iter) {
    supply = await supply;

    if(supply <= 0) {
        throw new Error("arg supply > 0 required");
    }

    let c = [];
    for await (const e of iter) {
        const len = c.push(e);
        if (len >= supply) {
            yield c;
            c = [];
        }
    }

    if (c.length !== 0) {
        yield c;
    }
});

/**
 * iterable to array
 * and resolve promise elements
 * 
 * @param {Array | Iterable | AsyncIterable} iter
 * @returns {Array}
 */
const collect = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};

const collectMap = async (iter) => new Map(await collect(iter));

/**
 * Int32Array.from does not support async generator 
 * 
 * collect<T>
 * native number
 * 
 * @param {T} ctor 
 */
const _collectNativeArray = (ctor) => async (iter) => {
    const arr = new _ArrayList(ctor);
    for await (const e of iter) {
        arr.add(e);
    }
    return arr.toArray();
};

const collectInt8 = _collectNativeArray(Int8Array);
const collectInt16 = _collectNativeArray(Int16Array);
const collectInt32 = _collectNativeArray(Int32Array);
const collectUint8 = _collectNativeArray(Uint8Array);
const collectUint16 = _collectNativeArray(Uint16Array);
const collectUint32 = _collectNativeArray(Uint32Array);
const collectUint8Clamped = _collectNativeArray(Uint8ClampedArray);
const collectFloat32 = _collectNativeArray(Float32Array);
const collectFloat64 = _collectNativeArray(Float64Array);

/**
 * check 
 * 
 * Int8Array
 * Int16Array 
 * Int32Array
 * Uint8Array
 * Uint8ClampedArray
 * Uint16Array
 * Uint32Array
 * Float32Array
 * Float64Array
 * 
 * @param {any} a 
 * @returns {bool} true if isTypedArray else false
 */
const _isTypedArray = (a) => ArrayBuffer.isView(a) && !(a instanceof DataView);

/**
 * (a.hasOwnProperty) can be override 
 * call Object prototype 
 * @param {ArrayLike} a any object
 */
const _isObjectArrayCheckProps = (a) => {
    if (a.length === 0) {
        return Object.keys(a).length === 1; 
    }
    return Object.prototype.hasOwnProperty.call(a, (a.length - 1)); 
};

/**
 * const o = {
 *      0: 1,
 *      1: 2,
 *      2: 3,
 *      length: 3
 * };
 * console.log(Array.from(o)); 
 * //print [1,2,3]
 * 
 * @param {any} a 
 */
const _isObjectArray = (a) => {
    if (Number.isSafeInteger(a.length)) {
        return _isObjectArrayCheckProps(a);
    }
    return false;
};

const _isString = (a) => a.constructor === String;

const _isArrayLike = (a) => (Array.isArray(a) || _isTypedArray(a) || _isObjectArray(a));

/**
 * is array like object
 * @param {ArrayLike} any 
 */
const _isReadableArrayLike = (a) => _isString(a) || _isArrayLike(a);

const _hasIterator = (a) => a[Symbol.iterator] || a[Symbol.asyncIterator];


/**
 * function is 
 * () => {...}
 * or
 * (a) => {...} 
 */
const _isFunction = (a) => a && a.constructor === Function;

/**
 * any iterable to array
 * and resolve promise elements
 * 
 * @param {ArrayLike | Iterable | AsyncIterable} iter
 * @returns {Promise<Array> | ArrayLike}
 */
const _collectArray = (iter) => {
    if (Array.isArray(iter)) {
        return Promise.all(iter);
    }

    if (_isTypedArray(iter)){
        //typed array and string does not require await
        return iter;
    }

    if(_isString(iter)) {
        return Array.from(iter);
    }

    if (_isObjectArray(iter)) {
        return Promise.all(Array.from(iter));
    }

    return collect(iter);
};

/**
 * [a,1],[b,2],[c,3]]  => {a:1,b:2,c:3} 
 */
const collectObject = async (iter) => {
    const c = await _collectArray(iter);
    const o = {};
    for (const e of c) {
        if (!Array.isArray(e)) {
            throw new TypeError("collectObject value is not array require [k,v] ");
        }
        o[e[0]] = e[1];
    }
    return o;
};

const collectSet = async (iter) => new Set(await _collectArray(iter));

const compose = (...fns) => async (...args) => {
    const len = fns.length;
    let z = await fns[len - 1](...args);
    for (let i = len - 2; i >= 0; --i) {
        z = await fns[i](z);
    }
    return z;
};

const concat = curry(async function *(a, b) {
    yield* a;
    yield* b;
});
const union = concat;

const mustEvenArguments = (arr) => {
    if ((arr.length) & 1) {
        throw new Error("requires an even arguments");
    }
};

const cond = async (...cv) => {
    mustEvenArguments(cv);

    for (let i = 0; i < cv.length; i += 2) {

        if (await cv[i]) {
            return cv[i + 1];
        }
    }
    // return undefined
};

const count = async (iter) => {
    //array, string
    if (Number.isSafeInteger(iter.length)) {
        return iter.length;
    }

    //map, set, any collection
    if (Number.isSafeInteger(iter.size)) {
        return iter.size;
    }

    //iterators
    if (_hasIterator(iter)) {
        let c = 0;
        for await (const _ of iter) {
            ++c;
        }
        return c;
    }

    //object
    return Object.keys(iter).length;
};

const dec = (a) => a - 1;

const desc = (a, b) => a < b ? 1 : a > b ? -1 : 0;

const dflat = async function *(...iters) {
    for await (const it of iters) {
        if (it) {
            if (_isString(it)) {
                yield* it;
                continue;
            } else if (_hasIterator(it)) {
                for await (const e of it) {
                    yield* dflat(e);
                }
                continue;
            }
        }
        yield it;
    }
};

const distinctBy = curry(async function *(f, iter) {
    const s = new Set();
    for await (const e of iter) {
        const d = await f(e);
        if (!s.has(d)) {
            s.add(d);
            yield e;
        }
    }
});

const identity = (e) => e;

const distinct = (iter) => distinctBy(identity, iter);

const _seq = async function *(iter) {
    for await (const e of iter) {
        yield e;
    }
};

/**
 * make async generator
 * do not need to check iter is any
 */
const seq = (iter) => {
    const it = iter[Symbol.asyncIterator];
    if (it) {
        return it.call(iter);
    }
    return _seq(iter);
};

const drop = curry(async function *(count, iter) {
    const g = seq(iter);
    for (let i = 0; i < count; i++) {
        const e = await g.next();
        if (e.done) {
            break;
        }
    }
    yield* g;
});

const addNext = async (q, g) => {
    const e = await g.next();
    if (e.done) {
        return false;
    }
    q.add(e.value);
    return true;
};

/**
 * drop last element
 * 
 * const a = [1,2,3,4,5];
 * const dropIter = F.dropLast(1, a);
 * for await (const e of dropIter) {
 *      console.log(e);
 * }
 * print 
 * 1
 * 2
 * 3
 * 4
 */
const dropLast = curry(async function *(count, iter) {
    const g = seq(iter);
    const q = new _Queue();
    
    for (let i = 0; i < count; i++) {
        if(!(await addNext(q, g))) {
            return;
        }
    }
    
    while ((await addNext(q, g))) {
        yield q.poll();
    }
});

const dropWhile = curry(async function *(f, iter) {
    const g = seq(iter);
    while (true) {
        const e = await g.next();
        if (e.done) {
            return;
        }

        if(!(await f(e.value))) {
            yield e.value;
            break;
        }
    }
    yield* g;
});

const emptyThen = curry(async function *(supply, iter) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }

    supply = await supply;
    if (supply instanceof Function) {
        yield* await supply();
    } else {
        yield* supply;
    }
});

/**
 * like python enumerate
 */
const enumerate = async function *(iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};

let _equals;

const map_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const kv of lhs) {
        if (!rhs.has(kv[0])) {
            return false;
        }

        if (!_equals(rhs.get(kv[0]), kv[1])) {
            return false;
        }
    }
    return true;
};

const set_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const e of lhs) {
        if (!rhs.has(e)) {
            return false;
        }
    }
    return true;
};

const regExp_internal = (lhs, rhs) => {
    if (lhs.sticky !== rhs.sticky) {
        return false;
    }

    if (lhs.unicode !== rhs.unicode) {
        return false;
    }

    if (lhs.ignoreCase !== rhs.ignoreCase) {
        return false;
    }

    if (lhs.global !== rhs.global) {
        return false;
    }

    if (lhs.multiline !== rhs.multiline) {
        return false;
    }

    if (lhs.source !== rhs.source) {
        return false;
    }
    return true;
};

const typedArray_internal = (lhs, rhs) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        // ignore this eslint duplicate warn
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }
    return true;
};

const array_internal = (lhs, rhs) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        // ignore this eslint duplicate warn
        if (!_equals(lhs[i], rhs[i])) {
            return false;
        }
    }
    return true;
};

const object_internal = (lhs, rhs) => {

    const kvl = Object.entries(lhs);

    if (kvl.length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [k, v] of kvl) {
        if (!rhs.hasOwnProperty(k)) {
            return false;
        }

        if (!_equals(v, rhs[k])) {
            return false;
        }
    }

    return true;
};

const toString_internal = (a) => Object.prototype.toString(a);

_equals = curry((lhs, rhs) => {
    if (lhs === rhs) {
        // undefined === undefined => true
        // null === null => true
        // 0 === 0 => true
        return true;
    }

    if (lhs === underBar || rhs === underBar) {
        //for pattern matching
        return true;
    } 

    if (lhs && rhs) {
        if (lhs.constructor !== rhs.constructor) {
            return false;
        }

        if (lhs instanceof String || 
            _isString(lhs) || 
            lhs instanceof Number || 
            lhs.constructor === Number ||
            lhs instanceof Boolean ||
            lhs.constructor === Boolean ||
            lhs instanceof Date) {
            return lhs.valueOf() === rhs.valueOf();
        }

        if (lhs instanceof Array) {
            return array_internal(lhs, rhs);
        }

        if (_isTypedArray(lhs)) {
            return typedArray_internal(lhs, rhs);
        }

        if (_isObjectArray(lhs)) {
            return array_internal(lhs, rhs);
        }

        if (lhs instanceof Map) {
            return map_internal(lhs, rhs);
        }

        if (lhs instanceof Set) {
            return set_internal(lhs, rhs);
        }

        if (lhs instanceof RegExp) {
            return regExp_internal(lhs, rhs);
        }

        if (lhs instanceof Promise) {
            // :(
            return false;
        }

        if (toString_internal(lhs) !== toString_internal(rhs)) {
            return false;
        }

        if (lhs instanceof Object) {
            return object_internal(lhs, rhs);
        }
    } else {
        //NaN === NaN => false
        if (Number.isNaN(lhs) && Number.isNaN(rhs)) {
            return true;
        }
    }
    return false;
});

const equals = _equals;

const errorThen = curry(async function *(supply, iter){
    try {
        yield* iter;
    } catch(e) {
        supply = await supply;

        if (supply instanceof Function) {
            supply = await supply(e);
        }

        if(supply && _hasIterator(supply)) {
            yield* supply;
        }
    }
});

const every = curry(async (f, iter) => {
    for await (const e of iter) {
        if (!(await f(e))) {
            return false;
        }
    }
    return true;
});

const filter = curry(async function *(fn, iter) {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});

const filterIndexed = curry(async function *(fn, iter) {
    let i = 0;
    for await (const e of iter) {
        if (await fn(i++, e)) {
            yield e;
        }
    }
});

const filterNot = curry(async function *(fn, iter) {
    for await (const e of iter) {
        if (!(await fn(e))) {
            yield e;
        }
    }
});

const find = curry(async (fn, iter) => {
    for await(const e of iter) {
        if (await fn(e)) {
            return e;
        }
    }
    //return undefined;
});

const findLast = curry(async (fn, iter) => {
    iter = await _collectArray(iter);
    for (let i = iter.length - 1; i >= 0; --i) {
        if (await fn(iter[i])) {
            return iter[i];
        }
    }
    //return undefined;
});

const first = (a) => a[0];

const firstOrGet = curry(async (supply, iter) => {
    for await (const e of iter) {
        return e;
    }
    supply = await supply;
    if (supply instanceof Function) {
        return await supply();
    }
    return supply;
});

const flat = async function *(iter) {
    for await (const e of iter) {
        if (e && _hasIterator(e)) {
            yield* e;
        } else {
            yield e;
        }
    }
};

const fmap = curry(async function *(fn, iter) {
    for await (const e of iter) {
        if (e && _hasIterator(e)) {
            yield* await fn(e);
        } else {
            yield e;
        }
    }
});
const flatMap = fmap;

const fnothing = () => {};

// import { undefinedValue } from "./undefinedValue";

// const emptyHeadTail = Object.freeze([undefinedValue, Object.freeze([])]);

const _throwEmpty = () => {
    throw new Error("empty iter");
};

const _headTailArray = async (arr) => {
    if (arr.length !== 0) {
        return [await arr[0], arr.slice(1)];
    }
    // return undefined;
};

const _headTailIterator = async (iter) => {
    const g = seq(iter);
    const head = await g.next();
    if (!head.done) {
        return [head.value, g];    
    }
    // return undefined;
};

const _headTailInternal = (iter) => {
    if (Array.isArray(iter) || _isTypedArray(iter) || _isString(iter)) {
        return _headTailArray(iter);
    }
    return _headTailIterator(iter);
};

/**
 * get head and tail
 * const [head, tail] = _headTailNoThrow(iterator);
 * 
 * head = value
 * tail = generator
 * not throw empty
 * return [undefined []] if iter is empty
 * 
 * @param {Array | Iterable | AsyncIterable} iter 
 * @returns {Array} [head, tail] value, iterable
 */
// export const _headTailNoThrow = async (iter) => {
//     const r = await _headTailInternal(iter);
//     if (!r) {
//         return emptyHeadTail;
//     }
//     return r;
// };

/**
 * get head and tail
 * const [head, tail] = _headTail(iterator);
 * 
 * head = value
 * tail = generator
 * 
 * @param {Array | Iterable | AsyncIterable} iter 
 * @returns {Array} [head, tail] value, iterable
 */
const _headTail = async (iter) => {
    const r = await _headTailInternal(iter);
    if (!r) {
        _throwEmpty();
    }
    return r;
};

const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});

const foldl1 = curry(async (f, iter) => {
    const [head, tail] = await _headTail(iter);
    return foldl(f, head, tail);
});
const reduce = foldl1;

const reverse = async function *(iter) {
    const a = await _collectArray(iter);
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};

const _foldr_internal = async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(e, z);
    }
    return z;
};

const foldr = curry((f, z, iter) => {
    return _foldr_internal(f, z, reverse(iter));
});

const foldr1 = curry(async (f, iter) => {
    const r = reverse(iter);
    const [head, tail] = await _headTail(r);
    return _foldr_internal(f, head, tail);
});

const forEach = curry(async (fn, iter) => {
    const wait = [];
    for await (const e of iter) {
        wait.push(fn(e));
    }
    return Promise.all(wait);
});

const forEachIndexed = curry(async (fn, iter) => {
    const wait = [];
    let i = 0;
    for await (const e of iter) {
        wait.push(fn(i++, e));
    }
    return Promise.all(wait);
});

/**
 * get frequency count by function
 * 
 *  (async () => {
 *      const arr = [{a:1},{a:2},{a:1}];
 *      const f = await frequenciesBy(e => e.a, arr);
 *      console.log(f);
 *  })();
 * 
 * //count by elem.a
 * //print Map { 1 => 2, 2 => 1 }
 * 
 * @param {Function} fn frequency_function
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Map>} frequencyMap
 */
const frequenciesBy = curry(async (fn, iter) => {
    const m = new Map();

    for await (const v of iter) {
        const e = await fn(v);
        const cnt = (m.get(e) || 0) + 1;
        m.set(e, cnt);
    }

    return m;
});

/**
 * frequency Count
 * 
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Map>} frequencyMap
 */
const frequencies = frequenciesBy(identity);

const undefinedValue = ((v) => v)();

/**
 * support Map, Set, any Object
 */
const get = curry((key, a) => {
    if (a.get && a.get.constructor === Function) {
        const r = a.get(key);
        if (r !== undefinedValue) {
            return r;
        }
    }
    return a[key];
});

const groupBy = curry(async (f, iter) => {
    const m = new Map();
    for await (const e of iter) {
        const k = await f(e);
        const v = m.get(k);
        if (v) {
            v.push(e);
        } else {
            m.set(k, [e]);
        }
    }
    return m;
});

const has = curry((key, a) => {
    if (a.has && a.has.constructor === Function) {
        if (a.has(key)) {
            return true;
        }
    }

   return a[key] !== undefinedValue;
});

const head = async (iter) => {
    const g = seq(iter);
    const e = await g.next();
    if (e.done) {
        throw new Error("empty iter");
    }
    return e.value;
};

const inc = (a) => a + 1;

const sleep = (t) => new Promise((r) => {
    setTimeout(r, t);
});

const interval = (timeout, timerHandler, ...param) => {

    if(!timeout || timeout < 10) {
        timeout = 10;
    }
    const k = { run: true };
    (async () => {
        while (k.run) {
            try {
                const s = sleep(timeout);
                await timerHandler(...param);
                await s;
            } catch {
                //ignore
            }
        }
    })();
    return k;
};

const isNil = (v) => {
    if (v) {
        return false;
    }

    switch(v){
        case null: return true;
        case undefinedValue: return true;
        default: return Number.isNaN(v);
    }
};

const iterate = curry(async function *(fn, v) {
    v = await v;
    yield v;
    while(true) {
        v = await fn(v);
        yield v;
    }
});

//juxtA([Math.max, Math.min], [1,2,3,4,5]);
//=>[1,5]

//juxtA([Math.max, Math.min], []);
//=>[undefined, undefined]
const juxtA = curry(async (af, iter) => {
    af = await _collectArray(af);

    const len = af.length;
    const g = seq(iter);
    const r = [];
    r.length = len;
    
    
    const firstElem = await g.next();
    if(firstElem.done) {
       //empty [undefined, undefined]
       return r; 
    }

    r.fill(firstElem.value);

    /**
     * same 
     * 
     * foldl(async (acc, e) => {
     *   for (let i = 0; i < len; ++i) {
     *       acc[i] = af[i](acc[i], e);
     *       return Promise.all(acc);
     *   }
     *}, r, g);
     */
    return foldl((acc, e) => forEachIndexed((i, x) => af[i](x, e), acc), r, g);
});

//juxtO(["A","C"], {A:1,B:2,C:3});
//=>[1,3]

//juxtO(["A","C"], {});
//=>[undefined, undefined]

//juxtO(["A","C"],  new Map([["A", 1], ["B", 2], ["C", 3]]));
//=>[1,2]
const juxtO = curry(async (ap, obj) => {
    ap = await _collectArray(ap);

    const r = [];
    for (const k of ap) {
        r.push(get(k, obj));
    }
    
    return r;
});

const map = curry(async function *(fn, iter) {
    for await (const e of iter) {
        yield fn(e);
    }
});

const mapIndexed = curry(async function *(fn, iter) {
    let i = 0;
    for await (const e of iter) {
        yield fn(i++, e);
    }
});

/**
 *  for pattern matching 
 *  F._ is any match 
 * 
 * @example
 * 
 *  const value = 1;
 * 
 *  F.match(value,
 *      0, () => console.log("value is 0"),
 *      1, () => console.log("value is 1"),
 *      2, () => console.log("value is 2")
 *  );
 * //print value is 1
 * 
 *  const value2 = [1, 2, 3, 4, 5];
 *  F.match(value2, 
 *      [1, 2], () => console.log("value is [1,2]"),
 *      [1, F._, F._, F._, F._], () => console.log("value is [1, any, any, any, any]")
 *  );
 *  //print value is [1, any, any, any, any]
 * 
 * @param {any} value match value
 * @param  {...any} cv must even [0]:compare, [1]: value, ...
 */
const match = (value, ...cv) => {
    for (let i = 0; i < cv.length; i += 2) {
        if (equals(value, cv[i])) {
            if (_isFunction(cv[i + 1])) {
                return cv[i + 1](value);
            }
            return cv[i + 1];
        }
    }
    //return undefined;
};

const maxBy = curry(async (f, iter) => {
    let [m, tail] = await _headTail(iter);
    
    let c = await f(m);
    for await (const e of tail) {
        const k = await f(e);
        if (k > c) {
            m = e;
            c = k;
        }
    }
    return m;
});

/**
 * Gets the max value in the range
 *
 * await F.max([1,2,3,4,5]);
 * 
 * => 5
 */
const max = maxBy(identity);

const memoizeBy = curry((keyFn, callFn) => {
    const cache = {};
    return async (...arg) => {
        let r;
        const key = await keyFn(...arg);
        if(!(key in cache)) {
            r = await callFn(...arg);
            cache[key] = r;
        } else {
            r = cache[key];
        }
        return r;
    };
});

const memoize = memoizeBy((...a) => a);

const memoizeWithTimeoutBy = (timeout, keyFn, callFn) => {
    const cache = {};
    return async (...arg) => {
        const now = Date.now();
        const key = await keyFn(...arg);
        const c = cache[key];
        if ((!c) || (now - c.time > timeout)) {
            const ret = await callFn(...arg);
            cache[arg] = { value: ret, time: now };
            return ret;
        }
        return c.value;
    };
};

const memoizeWithTimeout = curry((timeout, callFn) => memoizeWithTimeoutBy(timeout, (...a) => a, callFn));

const minBy = curry(async (f, iter) => {
    let [m, tail] = await _headTail(iter);
    
    let c = await f(m);
    for await (const e of tail) {
        const k = await f(e);
        if (k < c) {
            m = e;
            c = k;
        }
    }
    return m;
});

/**
 * Gets the min value in the range
 *
 * await F.min([1,2,3,4,5,0]);
 * 
 * => 0
 */
const min = minBy(identity);

//deprecated / use isNill instead.
const notNil = (a) => !isNil(a);

/**
 * if (F.otherwise) {
 *  // work
 * }
 * 
 * if (F.otherwise()) {
 *  // work
 * }
 */
const otherwise = () => true;

const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

const parallel_set_fetch_count_internal = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("count > 0 required");
    }
    global_fetch_count = count || default_fetch_count;
};

const parallel_fetch_map_internal = async (iter, fn) => {
    // fetch (n - 1) here
    const fetchCount = global_fetch_count - 1;
    const g = seq(iter);
    for (let i = fetchCount; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        fn(e.value);
    }
    return g;
};

const parallel_set_fetch_count = (count) =>
    parallel_set_fetch_count_internal(count);

const fetch_call_internal = (f, iter) =>
    parallel_fetch_map_internal(iter, (e) => f.add(e()));

const pcalls_internal = async function *(iter) {

    const f = new _Queue();
    const g = await fetch_call_internal(f, iter);
    
    for await(const e of g) {
        f.add(e());
        yield f.poll();
    } 

    yield* f.removeIterator();
};

const pcalls = curry(async function *(...a) {
    if (a.length === 1) {
        if (_hasIterator(a[0])) {
            yield* pcalls_internal(a[0]);
            return;
        }
    }
    yield* pcalls_internal(a);
});

const peek = curry(async function *(f, iter) {
    for await (const e of iter) {
        await f(e);
        yield e;
    }
});

const fetch_filter_internal = (f, v, fn, iter) =>
    parallel_fetch_map_internal(iter, (e) => {
        f.add(fn(e));
        v.add(e);
    });

const pfilter = curry(async function *(fn, iter) {
    const f = new _Queue();
    const v = new _Queue();
    const g = await fetch_filter_internal(f, v, fn, iter);
    for await (const e of g) {
        f.add(fn(e));
        v.add(e);

        const c = v.poll();
        if (await f.poll()) {
            yield c;
        }
    }

    while (!v.isEmpty()) {
        const c = v.poll(); 
        if (await f.poll()) {
            yield c;
        }
    }
});

/**
 * like `.` or `->>`
 *      let r = await F.pipe(
 *              F.map(e => e + 1), // a = [2,3,4,5,6]
 *              F.filter(e => e < 4), // a = [2,3]
 *              F.take(Infinity));
 * 
 *      let a = [1,2,3,4,5];
 *      for await (const e of await r(a)) {
 *          console.log(e);
 *      }
 * //result
 * //2
 * //3
 */
const pipe = (f, ...fns) => (...args) => foldl((z, fn) => fn(z), f(...args), fns);

const fetch_map_internal = (f, fn, iter) =>
    parallel_fetch_map_internal(iter, (e) => f.add(fn(e)));

const pmap = curry(async function *(fn, iter) {
    const f = new _Queue();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield f.poll();
    }

    yield* f.removeIterator();
});

const pfmap = curry(async function *(fn, iter) {
    const f = new _Queue();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield* await f.poll();
    }

    while(!f.isEmpty()) {
        yield* await f.poll();
    }
});

const pflatMap = pfmap;

const prop = curry((key, a) => a[key]);

const crypto = require("crypto");

const randomUintInternal = (size) => {
    const buf = crypto.randomBytes(size);
    const n = buf.readUIntBE(0, size);
    return n;
};

const randomInternal = (begin, end) => {
    const randomRange = end - begin - 1;

    /**
     * mask: binary digit, equal or greater than randomRange
     * bit: multiple of 2 greater than randomRange
     * 
     * randomRange: 0~255 byteSize:1
     * randomRange: 256~65535 byteSize:2
     * randomRange: 65536~16777215 byteSize:3
     * ...
     * ...
     */

    let step = 0;
    let bit = 1;
    for (;randomRange >= bit; ++step) {
        bit <<= 1;
    }

    const mask = bit - 1;
    const byteSize = Math.floor(step / 8) + 1;

    const v = randomUintInternal(byteSize) & mask;
    const randomValue = v / bit;

    return Math.ceil(randomValue * randomRange) + begin;
};

/**
 * random() => 0 ~ 4294967295 (unsigned int max)
 * random(10) => 0 ~ 9 [begin end) max: 4294967295
 * random(1, 42) => 1 ~ 41 [begin end) max: 4294967295
 * 
 * maximum value is uint max
 * 
 * @param  {...any} k 0 ~ 2 argument
 */
const random = (...k) => {
    const len = k.length;

    switch (len) {
    case 0:
        return randomUintInternal(4);
    case 1:
        return randomInternal(0, k[0]);
    case 2:
        return randomInternal(k[0], k[1]);
    default:
        throw new Error("function random: argument must <= 2");
    }
};

const range = function *(...k) {
    let begin = 0;
    let end = Infinity;
    let n = 1;
    const len = k.length;

    switch(len) {
    case 1:
        end = k[0];
        break;
    case 2:
        begin = k[0];
        end = k[1];
        break;
    case 3:
        begin = k[0];
        end = k[1];
        n = k[2];
        break;
    }

    for (let i = begin; i !== end; i += n) {
        yield i;
    }
};

const getDuration = async (duration) => {
    duration = await duration;

    if (duration instanceof Function) {
        duration = await duration();
    }

    if (duration <= 0) {
        throw new Error("duration > 0 required");
    }
    return duration;
};

const errorSleep = (t) => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("timeout error"));
    }, t);
});

const rangeInterval = async function *(duration, ...k) {
    duration = await getDuration(duration);

    await sleep(duration);
    for (const e of range(...k)) {
        yield e;
        await sleep(duration);
    }
};

/**
 * **deprecated** 
 * deprecated. use flat or dflat instead.
 * 
 * @param  {...any} a any range
 */
const rangeOf = (...a) => fmap(identity, a);

/**
 * arity 1 : [Infinity, arg1]
 * arity 2 : [arg1, arg2]
 */
const repeatFetchArgument = async (a, b) => {
    a = await a;
    if (b.length > 0) {
        return [a, await b[0]];
    }
    return [Infinity, a];
};

/**
 * supply
 * F.repeat(5) => [5,5,5,....]
 * 
 * count and supply
 * F.repeat(3, 5) => [5,5,5]
 * 
 * 
 * @param {Number | any} a  count or supply
 * @param  {any?} b supply
 */
const repeat = async function *(a, ...b) {
    const [len, supply] = await repeatFetchArgument(a, b);
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield supply();
        }
    } else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};

/**
 * like `$` or `.`
 *  let a = [1,2,3,4,5];
 *  let r = await F.run(a,
 *           F.map(e => e + 1), // a = [2,3,4,5,6]
 *           F.filter(e => e < 4), // a = [2,3]
 *           F.take(Infinity),
 *           F.collect);
 * 
 *  console.log(r); // print [2,3]
 * 
 */
const run = (iter, ...f) => foldl((z, fn) => fn(z), iter, f);

const _sampleArray = (arr) => arr[random(arr.length)];

const _sampleNotArray = async (iter) => {
    const r = await collect(iter);
    return _sampleArray(r);
};

/**
 * get random element from iterator
 * @param {Iterable | AsyncIterable} iter any iterator
 */
const sample = (iter) => {
    if (_isReadableArrayLike(iter)) {
        return _sampleArray(iter);
    } 
    return _sampleNotArray(iter);
};

const scanl = curry(async function *(f, z, iter) {
    z = await z;
    yield z;
    for await (const e of iter) {
        z = await f(z, e);
        yield z;
    }
});

const scanl1 = curry(async function *(f, iter) {
    const g = seq(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});

const second = (a) => a[1];

const shuffleInternal = (arr) => {
    const len = arr.length;
    for (let i = len - 1; i >= 0; --i) {
        const where = random(len);
        if (i !== where) {
            const tmp = arr[i];
            arr[i] = arr[where];
            arr[where] = tmp;
        }
    }
    return arr;
};

//for Iterable, AsyncIterable
const shuffleAsync = async (iter) => {
    iter = await collect(iter);
    return shuffleInternal(iter);
};

/**
 * return a random permutation Array
 * 
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Array>} new shuffle Array
 */
const shuffle = (iter) => {
    if (_isReadableArrayLike(iter)) {
        return shuffleInternal(Array.from(iter));    
    }
    return shuffleAsync(iter);
};

const some = curry(async (f, iter) => {
    for await (const e of iter) {
        if (await f(e)) {
            return true;
        }
    }
    return false;
});

const sortBy = curry(async function *(f, order, iter) {
    if (order.constructor === "".constructor) {
        switch (order.trim().toLowerCase()) {
            case "asc":
                order = asc;
                break;
            case "desc":
                order = desc;
                break;
            default:
                throw new Error("please set order parameter to ASC or DESC or compare function");
        }
    }

    const t = [];
    const m = new Map();

    for await (const e of iter) {
        t.push(e);
        if (!m.has(e)) {
            m.set(e, await f(e));
        }
    }

    yield* t.sort((a, b) => {
        const ma = m.get(a);
        const mb = m.get(b);

        return order(ma, mb);
    });
});

const orderBy = sortBy;

const order = sortBy(identity);
const sort = sortBy(identity);

/**
 * break is keyword..
 * 
 */
const split = curry(async function *(fn, iter) {
    const g = seq(iter);
    let e;
    const lhs = async function *() {
        while (true) {
            e = await g.next();
            if ((e.done) || await fn(e.value)) {
                break;    
            }
            yield e.value;
        }
    };
    yield lhs();

    const rhs = async function *() {
        if (!e.done) {
            yield e.value;
            yield* g;
        }
    };
    yield rhs();
});

const splitBy = curry(async function *(f, any) {
    yield* await f(any);
});

const combineMap = (a, b) => new Map([...b, ...a]);


/**
 * support iterable + set method
 * a is overwrite b value
 */
const combineCollection = (a, b) => {
    const r = new a.constructor();
    for (const e of b) {
        r.set(...e);
    }
    for (const e of a) {
        r.set(...e);
    }
    return r;
};

const combineObject = (a, b) => Object.assign({}, b, a);

const combine = (a, b) => {
    if (a.constructor !== b.constructor) {
        throw new Error("join/combine object: object is not same");
    }

    if (a instanceof Map) {
        return combineMap(a, b);
    }

    if (a[Symbol.iterator] && a.set && typeof (a.set) === "function") {
        return combineCollection(a, b);
    }

    if (a instanceof Object) {
        return combineObject(a, b);
    }

    throw new Error("join/combine object: not support type");
};

const _outerJoin = async function *(f, iter1, iter2) {
    const leftCache = [];
    const rightCache = [];
    const it = seq(iter2);
    start: for await (const e of iter1) {
        leftCache.push(e);
        for (const c of rightCache) {
            if (await f(e, c)) {
                yield combine(e, c);
                continue start;
            }
        }

        while (true) {
            const { value, done } = await it.next();
            if (done) {
                break;
            }
            rightCache.push(value);
            if (await f(e, value)) {
                yield combine(e, value);
                continue start;
            }
        }

        yield e;
    }

    for await (const e of it) {
        for (const c of leftCache) {
            if (await f(c, e)) {
                yield combine(c, e);
            }
        }
    }
};

const _innerJoin = async function *(f, iter1, iter2) {
    const leftCache = [];
    const rightCache = [];
    const it = seq(iter2);
    start: for await (const e of iter1) {
        leftCache.push(e);
        for (const c of rightCache) {
            if (await f(e, c)) {
                yield combine(e, c);
                continue start;
            }
        }

        while (true) {
            const { value, done } = await it.next();
            if (done) {
                break;
            }
            rightCache.push(value);
            if (await f(e, value)) {
                yield combine(e, value);
                continue start;
            }
        }
    }

    for await (const e of it) {
        for (const c of leftCache) {
            if (await f(c, e)) {
                yield combine(c, e);
            }
        }
    }
};

const leftInnerJoin = curry(_innerJoin);
const innerJoin = curry(_innerJoin);
const rightInnerJoin = curry((f, a, b) => _innerJoin(f, b, a));

const leftOuterJoin = curry(_outerJoin);
const outerJoin = curry(_outerJoin);
const rightOuterJoin = curry((f, a, b) => _outerJoin(f, b, a));

const sub = curry((a, b) => a - b);

const sum = foldl1(add);

const tail = async function *(iter) {
    const g = seq(iter);
    const { done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    yield* g;
};

const take = curry(async function *(count, iter) {
    let it = 0;
    for await (const e of iter) {
        ++it;
        if (it > count) {
            break;
        }
        yield e;
    }
});

const takeWhile = curry(async function *(f, iter) {
    for await (const e of iter) {
        if (!(await f(e))) {
            break;
        }
        yield e;
    }
});

const tap = curry(async (f, arg) => {
    await f(arg);
    return arg;
});

const then = curry((f, arg) => f(arg));

const timeout = curry(async (duration, a) => {
    duration = await getDuration(duration);

    const s = errorSleep(duration);

    if (a instanceof Function) {
        a = a();
    }

    const r = Promise.race([s, a]);
    const e = await r;
    s.catch(fnothing);
    return e;
});

const withTimeout = curry(async function *(duration, iter) {
    duration = await getDuration(duration);

    const g = seq(iter);
    const s = errorSleep(duration);

    while(true) {
        const it = g.next();
        const e = await Promise.race([s, it]);
        if(e.done) {
            break;
        }
        yield e.value;
    }
    s.catch(fnothing);
});

const zipWith = curry(async function *(f, a, b) {
    a = seq(a);
    b = seq(b);

    while (true) {
        const ap = a.next();
        const bp = b.next();

        const ae = await ap;
        const be = await bp;

        if (ae.done || be.done) {
            break;
        }

        yield f(ae.value, be.value);
    }
});

const zip = curry((iter1, iter2) => zipWith((elem1, elem2) => [elem1, elem2], iter1, iter2));

const zipWith3 = curry(async function *(f, a, b, c) {
    a = seq(a);
    b = seq(b);
    c = seq(c);

    while (true) {
        const ap = a.next();
        const bp = b.next();
        const cp = c.next();

        const ae = await ap;
        const be = await bp;
        const ce = await cp;

        if (ae.done || be.done || ce.done) {
            break;
        }

        yield f(ae.value, be.value, ce.value);
    }
});

const zip3 = curry((iter1, iter2, iter3) => zipWith3((elem1, elem2, elem3) => [elem1, elem2, elem3], iter1, iter2, iter3));

exports._ = _;
exports._ArrayList = _ArrayList;
exports._Queue = _Queue;
exports.add = add;
exports.asc = asc;
exports.average = average;
exports.buffer = buffer;
exports.collect = collect;
exports.collectFloat32 = collectFloat32;
exports.collectFloat64 = collectFloat64;
exports.collectInt16 = collectInt16;
exports.collectInt32 = collectInt32;
exports.collectInt8 = collectInt8;
exports.collectMap = collectMap;
exports.collectObject = collectObject;
exports.collectSet = collectSet;
exports.collectUint16 = collectUint16;
exports.collectUint32 = collectUint32;
exports.collectUint8 = collectUint8;
exports.collectUint8Clamped = collectUint8Clamped;
exports.compose = compose;
exports.concat = concat;
exports.cond = cond;
exports.count = count;
exports.curry = curry;
exports.dec = dec;
exports.desc = desc;
exports.dflat = dflat;
exports.distinct = distinct;
exports.distinctBy = distinctBy;
exports.drop = drop;
exports.dropLast = dropLast;
exports.dropWhile = dropWhile;
exports.emptyThen = emptyThen;
exports.enumerate = enumerate;
exports.equals = equals;
exports.errorThen = errorThen;
exports.every = every;
exports.filter = filter;
exports.filterIndexed = filterIndexed;
exports.filterNot = filterNot;
exports.find = find;
exports.findLast = findLast;
exports.first = first;
exports.firstOrGet = firstOrGet;
exports.flat = flat;
exports.flatMap = flatMap;
exports.fmap = fmap;
exports.fnothing = fnothing;
exports.foldl = foldl;
exports.foldl1 = foldl1;
exports.foldr = foldr;
exports.foldr1 = foldr1;
exports.forEach = forEach;
exports.forEachIndexed = forEachIndexed;
exports.frequencies = frequencies;
exports.frequenciesBy = frequenciesBy;
exports.get = get;
exports.groupBy = groupBy;
exports.has = has;
exports.head = head;
exports.identity = identity;
exports.inc = inc;
exports.innerJoin = innerJoin;
exports.interval = interval;
exports.isNil = isNil;
exports.iterate = iterate;
exports.juxtA = juxtA;
exports.juxtO = juxtO;
exports.leftInnerJoin = leftInnerJoin;
exports.leftOuterJoin = leftOuterJoin;
exports.map = map;
exports.mapIndexed = mapIndexed;
exports.match = match;
exports.max = max;
exports.maxBy = maxBy;
exports.memoize = memoize;
exports.memoizeBy = memoizeBy;
exports.memoizeWithTimeout = memoizeWithTimeout;
exports.min = min;
exports.minBy = minBy;
exports.notNil = notNil;
exports.order = order;
exports.orderBy = orderBy;
exports.otherwise = otherwise;
exports.outerJoin = outerJoin;
exports.parallel_set_fetch_count = parallel_set_fetch_count;
exports.pcalls = pcalls;
exports.peek = peek;
exports.pfilter = pfilter;
exports.pflatMap = pflatMap;
exports.pfmap = pfmap;
exports.pipe = pipe;
exports.pmap = pmap;
exports.prop = prop;
exports.random = random;
exports.range = range;
exports.rangeInterval = rangeInterval;
exports.rangeOf = rangeOf;
exports.reduce = reduce;
exports.repeat = repeat;
exports.reverse = reverse;
exports.rightInnerJoin = rightInnerJoin;
exports.rightOuterJoin = rightOuterJoin;
exports.run = run;
exports.sample = sample;
exports.scanl = scanl;
exports.scanl1 = scanl1;
exports.second = second;
exports.seq = seq;
exports.shuffle = shuffle;
exports.sleep = sleep;
exports.some = some;
exports.sort = sort;
exports.sortBy = sortBy;
exports.split = split;
exports.splitBy = splitBy;
exports.sub = sub;
exports.sum = sum;
exports.tail = tail;
exports.take = take;
exports.takeWhile = takeWhile;
exports.tap = tap;
exports.then = then;
exports.timeout = timeout;
exports.underBar = underBar;
exports.union = union;
exports.withTimeout = withTimeout;
exports.zip = zip;
exports.zip3 = zip3;
exports.zipWith = zipWith;
exports.zipWith3 = zipWith3;
