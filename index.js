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
     * @param ArrayCtor
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
     * @param i index
     */
    get(i) {
        return this._data[i];
    }
    /**
     * set
     * arr[i] = e;
     * @param i index
     * @param {T} e elem
     */
    set(i, e) {
        this._data[i] = e;
    }
    /**
     * @returns length
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
        this.head = null;
        this.tail = null;
    }
    add(v) {
        const n = { value: v, next: null };
        if (this.head) {
            this.tail.next = n;
        }
        else {
            this.head = n;
        }
        this.tail = n;
    }
    _unsafePop() {
        const f = this.head;
        this.head = f.next;
        if (this.tail === f) {
            this.head = null;
            this.tail = null;
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
        // remove chain
        // help gc
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
 * F.equals(1, F._); // true
 * F.equals({}, F._); // true
 * F.equals({ a: 1 }, { a: F._ }); //true
 *
 * {} === F._; // false
 * 1 === F._; // false
 */
const underBar = Object.freeze({});
const _ = underBar;

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
const curry = (fn) => (...a) => {
    if (fn.length <= a.length) {
        return fn(...a);
    }
    else {
        return (...b) => curry(fn)(...a, ...b);
    }
};

const add = curry((a, b) => a + b);

const asc = (a, b) => a > b ? 1 : a < b ? -1 : 0;

const assign = curry((target, source, ...sources) => {
    return Object.assign({}, target, source, ...sources);
});

const assignRight = curry((source1, source2, ...sources) => {
    return Object.assign.call(null, [source1, source2, ...sources].reverse());
});

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
 * @param a object
 * @returns {bool} true if isTypedArray else false
 */
const _isTypedArray = (a) => ArrayBuffer.isView(a) && !(a instanceof DataView);
const _isString = (a) => a.constructor === String;
/**
 * function is
 * () => {...}
 */
const _isFunction = (a) => a && a.constructor === Function;
/**
 * (a.hasOwnProperty) can be override
 * call Object prototype
 * @param a any object
 */
const _isObjectArrayCheckProps = (a) => {
    if (a.length === 0) {
        return true;
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
 * @param a any object
 */
const _isObjectArray = (a) => {
    if ((!_isFunction(a)) && Number.isSafeInteger(a.length)) {
        return _isObjectArrayCheckProps(a);
    }
    return false;
};
/**
 * real undefined
 * undefined = 1; // not error!
 */
const undefinedValue = ((v) => v)();
const _hasIterator = (a) => a[Symbol.iterator] || a[Symbol.asyncIterator];
const _isArrayLike = (a) => (Array.isArray(a) || _isTypedArray(a) || _isObjectArray(a));
/**
 * is array like object
 * @param {ArrayLike} any
 */
const _isReadableArrayLike = (a) => a && (_isString(a) || _isArrayLike(a));
const _isPairLike = (a) => _isReadableArrayLike(a) && a.length === 2;
/**
 * string, number, bigint, boolean, null, undefined, and symbol.
 */
const _isPrimitive = (a) => {
    if (a === null || a === undefinedValue) {
        return true;
    }
    return Object(a) !== a;
};
/**
 * for not support web browser
 */
const NodekellBigInt = (typeof BigInt !== "undefined") ? BigInt : {};
/**
 * String, Number, BigInt, Boolean, and Symbol.
 * and wrapper objects
 * @param a any object
 */
const _isPrimitiveWrapper = (a) => {
    const ctor = a.constructor;
    switch (ctor) {
        case Number:
        case NodekellBigInt:
        case Boolean:
        case Symbol:
        case String:
            return true;
    }
    return false;
};
const mustEvenArguments = (arr) => {
    if ((arr.length) & 1) {
        throw new Error("requires an even arguments");
    }
};

const associateBy = curry(async (fn, iter) => {
    const m = new Map();
    for await (const e of iter) {
        const v = await fn(e);
        if (_isReadableArrayLike(v)) {
            m.set(v[0], v[1]);
        }
        else {
            m.set(v, v);
        }
    }
    return m;
});

const average = async (iter) => {
    let c = 0;
    let sum = 0;
    for await (const e of iter) {
        ++c;
        sum += e;
    }
    return sum / c;
};

const _seq = async function* (iter) {
    for await (const e of iter) {
        yield e;
    }
};
/**
 * make iterable(array, set, map, any iteratorable object) to asyncIterator
 * @example
 * const a = [1,2,3,4,5];
 * for await(const e of F.seq(a)) {
 *     console.log(e);
 * }
 * @params iter any iterator
 * @returns async iterator
 */
const seq = (iter) => {
    const it = iter[Symbol.asyncIterator];
    if (it) {
        return it.call(iter);
    }
    return _seq(iter);
};

/**
 * object to iterator
 *
 * @param object any object
 */
const objectIterator = function* (object) {
    const keys = Object.keys(object);
    for (const k of keys) {
        yield [k, object[k]];
    }
};
/**
 * object to iterator if has Symbol.iterator or Symbol.asyncIterator
 * @param a object
 */
const _toStrictIterator = (a) => {
    if (a) {
        const it = a[Symbol.iterator];
        if (it) {
            return it.call(a);
        }
        const ait = a[Symbol.asyncIterator];
        if (ait) {
            return ait.call(a);
        }
    }
    // return undefined;
};
/**
 * object to iterator
 * if dont have Symbol.iterator or Symbol.asyncIterator
 * iterate [Object.key, Object.value]
 * @param a object
 */
const _toIterator = (a) => {
    if (a) {
        const s = _toStrictIterator(a);
        if (s) {
            return s;
        }
        return objectIterator(a);
    }
    // return undefined;
};
/**
 * Gets only the {index} value from the Collection object.
 */
const _arrayElementIterator = (index, onNotArrayError) => async function* (iter) {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[index];
        }
        else {
            onNotArrayError(e);
        }
    }
};
/**
 * If the argument is iterable, the elements are returned as iterable.
 * If not, return the argument iterable
 * @param a any object
 */
const _flatOnce = async function* (a) {
    a = await a;
    if (a && _hasIterator(a)) {
        yield* a;
    }
    else {
        yield a;
    }
};
/**
 * fetch {fetchCount} elements and returns iterator
 *
 * @param fetchCount
 * @param iter iterable
 * @param fn callback
 * @returns next iter
 */
const _fetchAndGetIterator = async (fetchCount, iter, fn) => {
    fetchCount = Math.max(fetchCount, 0);
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

const parallel_default_fetch_count = 100;
let parallel_global_fetch_count = parallel_default_fetch_count;
/**
 * Iterator and AsyncIterator don't calculate until the value is fetched
 * take it {count} the effect of calculating in parallel.
 *
 * not parallel functions: Promise -> execute -> Promise -> execute
 *
 * parallel functions: Promise -> Promise -> Promise... (execute all)
 *
 * @param count take count
 */
const parallel_set_fetch_count_internal = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("parallel_fetch_count > 0 required");
    }
    parallel_global_fetch_count = count || parallel_default_fetch_count;
};
const parallel_get_fetch_count_internal = () => parallel_global_fetch_count;
/**
 * Get the value.
 * If it's a Promise, it gets its value from Promise
 * Then call the function if the value is a function.
 * @param v any
 */
const _takeValue = async (v) => {
    v = await v;
    if (_isFunction(v)) {
        v = await v();
    }
    return v;
};
/**
 * Remove N elements of iterator
 *
 * @param iter any iterator
 * @param count removeCount
 */
const _removeIteratorElements = async (iter, count = Infinity) => {
    if (!iter) {
        return;
    }
    const awaiter = [];
    for (let i = 0; i < count; ++i) {
        const e = await iter.next();
        if (e.done) {
            break;
        }
        awaiter.push(e.value);
    }
    return Promise.all(awaiter);
};
/**
 * throw if value is empty IteratorResult
 *
 * 1. { done: true }
 *  => throw
 *
 * 2. 1
 *  => pass
 *
 * 3. { value: undefined, done: false }
 *  => pass
 *
 * 4. undefined
 *  => pass
 *
 * @param a any object
 */
const _mustNotEmptyIteratorResult = (a) => {
    if (!a) {
        throw new Error("error iter result");
    }
    if (a.done) {
        throw new Error("empty iter");
    }
};

const block = async (...values) => {
    values = await Promise.all(values);
    for (const iter of values) {
        const it = _toStrictIterator(iter);
        await _removeIteratorElements(it);
    }
};

const buffer = curry(async function* (supply, iter) {
    supply = await supply;
    if (supply <= 0) {
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
 * @example
 * const mapped = F.map(e => e + 1, a);
 * console.log(mapped); // print asyncGenerator
 * const collected = await F.collect(mapped);
 * console.log(collected); //print [2,3,4,5,6]
 *
 * const v = await F.run(
 *   F.range(Infinity),//[0,1,2....]
 *   F.filter(e => (e % 3) === 0), //[0,3,6...]
 *   F.map(e => e + 1), //[1,4,7...]
 *   F.take(5), // generator([1,4,7,10,13])
 *   F.collect);  // generator => array
 * console.log(v); //[1,4,7,10,13]
 *
 * @param iter any iterable
 */
const collect = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};

/**
 * Int32Array.from does not support async generator
 *
 * collect<T>
 * native number
 *
 * @param ctor native array constructor
 */
const _collectNativeArray = (ctor) => async (iter) => {
    const arr = new _ArrayList(ctor);
    for await (const e of iter) {
        arr.add(e);
    }
    return arr.toArray();
};

const collectInt16 = _collectNativeArray(Int16Array);

const collectInt32 = _collectNativeArray(Int32Array);

const collectInt8 = _collectNativeArray(Int8Array);

/**
 * any iterable to array
 * and resolve promise elements
 *
 * @param iter any iter
 */
const _collectArray = (iter) => {
    if (Array.isArray(iter)) {
        return Promise.all(iter);
    }
    if (_isTypedArray(iter)) {
        // typed array and string does not require await
        return iter;
    }
    if (_isString(iter)) {
        return Array.from(iter);
    }
    if (_isObjectArray(iter)) {
        return Promise.all(Array.from(iter));
    }
    return collect(iter);
};

const collectMap = async (iter) => new Map((await _collectArray(iter)));

const collectObject = async (iter) => {
    const c = await _collectArray(iter);
    const o = {};
    for (const e of c) {
        if (!_isPairLike(e)) {
            throw new TypeError("collectObject value is not pair require [k,v] ");
        }
        o[e[0]] = e[1];
    }
    return o;
};

const collectSet = async (iter) => new Set((await _collectArray(iter)));

const collectUint16 = _collectNativeArray(Uint16Array);

const collectUint32 = _collectNativeArray(Uint32Array);

const collectUint8 = _collectNativeArray(Uint8Array);

const collectUint8Clamped = _collectNativeArray(Uint8ClampedArray);

/**
 *  if (a) {
 *      //less
 *      return -1;
 *  } else {
 *      //equal
 *      return 0;
 *  }
 * @param {Boolean} a
 */
const lessOrEqual = (a) => a ? -1 : 0;
const _compareRhs = (fn, a, b) => {
    const ab = fn(a, b);
    if (ab instanceof Promise) {
        return ab.then(lessOrEqual);
    }
    return lessOrEqual(ab);
};
const _compareLhsOrRhs = (fn, a, b) => (r) => {
    if (r) {
        return 1;
    }
    return _compareRhs(fn, a, b);
};
const _comparator = (fn, a, b) => {
    const ba = fn(b, a);
    if (ba instanceof Promise) {
        return ba.then(_compareLhsOrRhs(fn, a, b));
    }
    return _compareLhsOrRhs(fn, a, b)(ba);
};
const _comparatorAsync = async (fn, a, b) => {
    return _comparator(fn, (await a), (await b));
};
const comparator = curry((fn, a, b) => {
    if (a instanceof Promise || b instanceof Promise) {
        return _comparatorAsync(fn, a, b);
    }
    return _comparator(fn, a, b);
});

const compose = (...fns) => async (...args) => {
    const len = fns.length;
    let z = await fns[len - 1](...args);
    for (let i = len - 2; i >= 0; --i) {
        z = await fns[i](z);
    }
    return z;
};

const concat = curry(async function* (a, b) {
    yield* _flatOnce(a);
    yield* _flatOnce(b);
});

const cond = (async (...cv) => {
    mustEvenArguments(cv);
    for (let i = 0; i < cv.length; i += 2) {
        if (await cv[i]) {
            return cv[i + 1];
        }
    }
    // return undefined
});

const count = async (iter) => {
    // array, string
    if (Number.isSafeInteger(iter.length)) {
        return iter.length;
    }
    // map, set, any collection
    if (Number.isSafeInteger(iter.size)) {
        return iter.size;
    }
    // iterators
    if (_hasIterator(iter)) {
        let c = 0;
        for await (const _ of iter) {
            ++c;
        }
        return c;
    }
    // object
    return Object.keys(iter).length;
};

/**
 * @example
 * dec([1,2,3]);            // NaN
 * dec(NaN);                // NaN
 * dec(null);               // -1
 * dec(undefined);          // NaN
 * dec({});                 // NaN
 * dec(new Int32Array(1));  // -1
 * dec("hello");            // NaN
 * @param a any object
 * @returns a - 1
 */
const dec = (a) => a - 1;

const desc = (a, b) => a < b ? 1 : a > b ? -1 : 0;

const dflat = async function* (...iters) {
    for await (const it of iters) {
        if (it) {
            if (_isString(it)) {
                yield* it;
                continue;
            }
            else if (_hasIterator(it)) {
                for await (const e of it) {
                    yield* dflat(e);
                }
                continue;
            }
        }
        yield it;
    }
};

const distinctBy = curry(async function* (f, iter) {
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

const _headTailArray = async (arr) => {
    if (arr.length !== 0) {
        return [await arr[0], arr.slice(1)];
    }
    throw new Error("empty array");
};
const _headTailIterator = async (iter) => {
    const g = seq(iter);
    const head = await g.next();
    _mustNotEmptyIteratorResult(head);
    return [head.value, g];
};
/**
 * get head and tail
 * const [head, tail] = _headTail(iterator);
 *
 * head = value
 * tail = generator
 *
 * @param iter any iterable
 * @returns [head, tail]
 */
const _headTail = (iter) => {
    if (Array.isArray(iter) || _isTypedArray(iter) || _isString(iter)) {
        return _headTailArray(iter);
    }
    return _headTailIterator(iter);
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
const toPrimitive_call_internal = (a, toPrimitiveFunc, hint) => {
    try {
        const n = toPrimitiveFunc.call(a, hint);
        if (n !== null && n !== undefinedValue) {
            return n;
        }
    }
    catch (_) {
        // ignore
    }
    // return undefined
};
const toPrimitiveHints = ["number", "string", "default"];
const toPrimitive_internal = (a) => {
    const c = a[Symbol.toPrimitive];
    if (c) {
        for (const hint of toPrimitiveHints) {
            const e = toPrimitive_call_internal(a, c, hint);
            if (e !== undefinedValue) {
                return e;
            }
        }
    }
    // return undefined;
};
const toString_internal = (a) => ((Object.prototype.toString.call)(a));
_equals = curry((lhs, rhs) => {
    if (lhs === rhs) {
        // undefined === undefined => true
        // null === null => true
        // 0 === 0 => true
        // Primitive types
        return true;
    }
    if (lhs === underBar || rhs === underBar) {
        // for pattern matching
        return true;
    }
    if (lhs && rhs) {
        if (lhs.constructor !== rhs.constructor) {
            return false;
        }
        if (_isPrimitiveWrapper(lhs)) {
            return lhs.valueOf() === rhs.valueOf();
        }
        const lp = toPrimitive_internal(lhs);
        if (lp) {
            return lp === toPrimitive_internal(rhs);
        }
        if (lhs.valueOf() === rhs.valueOf()) {
            // extends PrimitiveWrapper
            return true;
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
        if (lhs instanceof Promise ||
            _isFunction(lhs)) {
            // :(
            return false;
        }
        if (toString_internal(lhs) !== toString_internal(rhs)) {
            return false;
        }
        return object_internal(lhs, rhs);
    }
    else {
        // NaN === NaN => false
        if (Number.isNaN(lhs) && Number.isNaN(rhs)) {
            return true;
        }
    }
    return false;
});
const equals = _equals;

const distinctUntilChangedBy = curry(async function* (f, iter) {
    const [h, g] = await _headTail(iter);
    let head = h;
    yield head;
    head = await f(head);
    for await (const e of g) {
        const v = await f(e);
        if (!equals(head, v)) {
            head = v;
            yield e;
        }
    }
});

const distinctUntilChanged = distinctUntilChangedBy(identity);

const drop = curry(async function* (count, iter) {
    const g = seq(iter);
    await _removeIteratorElements(g, count);
    yield* g;
});

const dropLast = curry(async function* (count, iter) {
    const q = new _Queue();
    const g = await _fetchAndGetIterator(count, iter, q.add.bind(q));
    while (true) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        q.add(e.value);
        yield q.poll();
    }
});

const dropWhile = curry(async function* (f, iter) {
    const g = seq(iter);
    while (true) {
        const e = await g.next();
        if (e.done) {
            return;
        }
        if (!(await f(e.value))) {
            yield e.value;
            break;
        }
    }
    yield* g;
});

const emptyThen = curry(async function* (supply, iter) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }
    yield* _flatOnce(_takeValue(supply));
});

const enumerate = async function* (iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};

const every = curry(async (f, iter) => {
    for await (const e of iter) {
        if (!(await f(e))) {
            return false;
        }
    }
    return true;
});

const filter = curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});

const filterIndexed = curry(async function* (fn, iter) {
    let i = 0;
    for await (const e of iter) {
        if (await fn(i++, e)) {
            yield e;
        }
    }
});

const filterNot = curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (!(await fn(e))) {
            yield e;
        }
    }
});

const find = curry(async (fn, iter) => {
    for await (const e of iter) {
        if (await fn(e)) {
            return e;
        }
    }
    // return undefined;
});

const findLast = curry(async (fn, iter) => {
    const arr = await _collectArray(iter);
    for (let i = arr.length - 1; i >= 0; --i) {
        if (await fn(arr[i])) {
            return arr[i];
        }
    }
    // return undefined;
});

const first = (a) => a[0];

const flat = async function* (iter) {
    for await (const e of iter) {
        yield* _flatOnce(e);
    }
};

const fmap = curry(async function* (fn, iter) {
    for await (const e of iter) {
        yield* await fn(e);
    }
});

const flatMap = fmap;

const fnil = (fn, ...dArgs) => (...args) => {
    return fn(...Object.assign([], dArgs, args));
};

/**
 * do nothing function
 */
const fnothing = () => { };

/**
 * Call function for all the elements in an iterator
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = foldl((acc, e) => acc + e, 0, a);
 * console.log(sum); // print 15
 *
 * @param f (acc: T1, elem: T2) => (T1 | Promise<T1>)
 * @param z initial value
 * @param iter any iterable
 */
const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});

/**
 * take 1 items and call foldl
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = await F.foldl1((acc, e) => acc + e, a);
 * console.log(sum); // print 15;
 *
 * @param f (acc: T, elem: T) => (T | Promise<T>)
 * @param iter any iterator
 */
const foldl1 = curry(async (f, iter) => {
    const [head, tail] = await _headTail(iter);
    return foldl(f, head, tail);
});

/**
 * works concurrency
 *
 * @example
 * const beginTime = Date.now();
 * await F.run(
 *   F.range(100),
 *   F.forEach(async e => {
 *       await F.sleep(100)
 *   }));
 * const endTime = Date.now();
 * console.log(endTime - beginTime);
 * // print 121
 *
 * @param f each function
 * @param iter any iterator
 */
const forEach = curry(async (f, iter) => {
    const wait = [];
    for await (const e of iter) {
        wait.push(f(e));
    }
    return Promise.all(wait);
});

/**
 * forEach with loop counter
 * works concurrency
 *
 * @example
 * const beginTime = Date.now();
 * const arr = ['a','b','c','d','e'];
 * await F.forEachIndexed(async (i, e) => {
 *     await F.sleep(100);
 *     console.log(i, e);
 * }, arr);
 * const endTime = Date.now();
 * console.log(endTime - beginTime);
 * // print
 * // 0 'a'
 * // 1 'b'
 * // 2 'c'
 * // 3 'd'
 * // 4 'e'
 *
 * @param f each function
 * @param iter any iterator
 */
const forEachIndexed = curry(async (f, iter) => {
    const wait = [];
    let i = 0;
    for await (const e of iter) {
        wait.push(f(i++, e));
    }
    return Promise.all(wait);
});

/**
 * get the properties of that object.
 * if there is no value, it returns undefined.
 *
 * @example
 *      const arr = [1, 2, 3];
 *      const r = F.prop("0", arr);
 *      console.log(r); // print 1
 *
 * @param key any key value
 * @param target any object
 * @returns (a[key]) || (undefined if object is null or undefined)
 */
const prop = curry((key, target) => {
    if (target === undefinedValue || target === null) {
        return undefinedValue;
    }
    return target[key];
});

/**
 * if object have a get function,
 * call it or get the properties of that object.
 * if there is no value, it returns undefined.
 *
 * support Map, Set, any Object
 *
 * @example
 *      const m = new Map([
 *          ["name", "hello map"],
 *          ["value", 84]
 *      ]);
 *      const r = F.get("name", m);
 *      console.log(r); // print hello map
 *
 * @param key any key value
 * @param target any object
 * @returns target.get or target[key] or undefined
 */
const get = curry((key, a) => {
    if (a && _isFunction(a.get)) {
        const r = a.get(key);
        if (r !== undefinedValue) {
            return r;
        }
    }
    return prop(key, a);
});

/**
 * if object have a get function,
 * call it or get the properties of that object.
 * if there is no value, it returns defaultValue.
 *
 * support Map, Set, any Object
 *
 * @example
 *      const m = new Map([
 *          ["name", "hello map"],
 *          ["value", 84]
 *      ]);
 *      const r0 = F.getOrElse("name", "world", m);
 *      console.log(r0); // print hello map
 *
 *      const r1 = F.getOrElse("foo", "world", m);
 *      console.log(r1); // print world
 *
 * @param key any key value
 * @param defaultValue if target.get and target[key] is undefined return defaultValue
 * @param target any object
 * @returns target.get or target[key] or defaultValue
 */
const getOrElse = curry((key, defaultValue, target) => {
    const r = get(key, target);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});

/**
 * returns a Map that is aggregated through a function.
 * key is the return value of the function, and value is the source.
 *
 * @example
 * const a = [
 *    {type: "tea",
 *       price: 1},
 *   {type: "tea",
 *       price: 2},
 *   {type: "phone",
 *       price: 3},
 *   {type: "phone",
 *       price: 4},
 * ];
 * //returns new Map(... )
 * const r = await F.groupBy(e => e.type, a);
 * console.log(r.get("tea"));
 * //print [ { type: 'tea', price: 1 }, { type: 'tea', price: 2 } ]
 * console.log(r.get("phone"));
 * //print [ { type: 'phone', price: 3 }, { type: 'phone', price: 4 } ]
 */
const groupBy = curry(async (f, iter) => {
    const m = new Map();
    for await (const e of iter) {
        const k = await f(e);
        const v = m.get(k);
        if (v) {
            v.push(e);
        }
        else {
            m.set(k, [e]);
        }
    }
    return m;
});

const has = curry((key, target) => {
    if (target) {
        if (_isFunction(target.has) && target.has(key)) {
            return true;
        }
        return target[key] !== undefinedValue;
    }
    return false;
});

const head = async (iter) => {
    const g = seq(iter);
    const e = await g.next();
    _mustNotEmptyIteratorResult(e);
    return e.value;
};

/**
 * @example
 * inc([1,2,3]);            // '1,2,31'
 * inc(NaN);                // NaN
 * inc(null);               // 1
 * inc(undefined + 1);      // NaN
 * inc({});                 // 1
 * inc(new Int32Array(1));  // "01"
 * inc("hello");            // "hello1"
 * @param a any object
 * @returns a + 1
 */
const inc = (a) => a + 1;

const isNil = (v) => {
    if (v) {
        return false;
    }
    switch (v) {
        case null: return true;
        case undefinedValue: return true;
        default: return Number.isNaN(v);
    }
};

const isPrimitive = _isPrimitive;

const iterate = curry(async function* (fn, v) {
    v = await v;
    yield v;
    while (true) {
        v = await fn(v);
        yield v;
    }
});

const juxtA = curry(async (af, iter) => {
    af = await (_collectArray(af));
    const len = af.length;
    const g = seq(iter);
    const r = [];
    r.length = len;
    const firstElem = await g.next();
    if (firstElem.done) {
        // empty [undefined, undefined]
        return r;
    }
    r.fill(firstElem.value);
    //   same
    //   foldl(async (acc, e) => {
    //     for (let i = 0; i < len; ++i) {
    //         acc[i] = af[i](acc[i], e);
    //         return Promise.all(acc);
    //     }
    //  }, r, g);
    return foldl((acc, e) => forEachIndexed((i, x) => af[i](x, e), acc), r, g);
});

const juxtO = curry(async (ap, obj) => {
    const r = [];
    for await (const k of ap) {
        r.push(get(k, obj));
    }
    return r;
});

const keys = _arrayElementIterator(0, (e) => { throw new Error(`keys / ${e} is not array`); });

const map = curry(async function* (fn, iter) {
    for await (const e of iter) {
        yield fn(e);
    }
});

/**
 * map with loop counter
 * @example
 * const a = ['a','b','c','d','e'];
 * const mapped = F.mapIndexed((i, e) => {
 *     return e + i;
 * }, a);
 *
 * for await (const e of mapped) {
 *     console.log(e);
 * }
 * //print
 * //a0
 * //b1
 * //c2
 * //d3
 * //34
 * @param fn function (a) => b
 * @param iter any iterator
 * @returns mapped async iterator
 */
const mapIndexed = curry(async function* (fn, iter) {
    let i = 0;
    for await (const e of iter) {
        yield fn(i++, e);
    }
});

const match = (value, ...cv) => {
    mustEvenArguments(cv);
    for (let i = 0; i < cv.length; i += 2) {
        if (equals(value, cv[i])) {
            if (_isFunction(cv[i + 1])) {
                return cv[i + 1](value);
            }
            return cv[i + 1];
        }
    }
    // return undefined;
};

const maxBy = curry(async (f, iter) => {
    const h = await _headTail(iter);
    let m = h[0];
    let c = await f(m);
    for await (const e of h[1]) {
        const k = await f(e);
        if (k > c) {
            m = e;
            c = k;
        }
    }
    return m;
});

const max = maxBy(identity);

const memoizeBy = curry((keyFn, callFn) => {
    const cache = {};
    return async (...arg) => {
        let r;
        const key = await keyFn(...arg);
        if (!(key in cache)) {
            r = await callFn(...arg);
            cache[key] = r;
        }
        else {
            r = cache[key];
        }
        return r;
    };
});

const memoize = memoizeBy((...a) => a);

/**
 * combination left to right functions
 * first arguments received second functions argument
 * from second received combine functions
 * returns promise
 *
 * **Note**
 * - originally allow Promise wrapped functions. but that is complicated. so don't support Promise wrapped functions type.
 * - please use functions length 20 or less
 *
 * @example
 * let a = [1,2,3,4,5];
 * let r = await F.run(a,
 *          F.map(e => e + 1), // a = [2,3,4,5,6]
 *          F.filter(e => e < 4), // a = [2,3]
 *          F.take(Infinity),
 *          F.collect);
 * console.log(r); // print [2,3]
 *
 * @param iter any iterator
 * @param f combination functions
 */
const run = (iter, ...f) => foldl((z, fn) => fn(z), iter, f);

const mergeMap = curry(async (source1, source2, ...sources) => run([source1, source2, ...sources], map(_toIterator), flat, collectMap));

const mergeMapRight = curry((source1, source2, ...sources) => mergeMap.apply(null, [source1, source2, ...sources].reverse()));

const mergeObject = curry(async (source1, source2, ...sources) => run([source1, source2, ...sources], map(_toIterator), flat, collectObject));

const mergeObjectRight = curry((source1, source2, ...sources) => mergeObject.apply(null, [source1, source2, ...sources].reverse()));

const minBy = curry(async (f, iter) => {
    const h = await _headTail(iter);
    let m = h[0];
    let c = await f(m);
    for await (const e of h[1]) {
        const k = await f(e);
        if (k < c) {
            m = e;
            c = k;
        }
    }
    return m;
});

const min = minBy(identity);

/**
 * if (F.otherwise) {
 *  // work
 * }
 *
 * if (F.otherwise()) {
 *  // work
 * }
 */
const otherwise = (() => true);

const parallel_set_fetch_count = (count) => parallel_set_fetch_count_internal(count);

const peek = curry(async function* (f, iter) {
    for await (const e of iter) {
        await f(e);
        yield e;
    }
});

const _fetchMapInternal = (f, fn, iter) => {
    const fetchCount = parallel_get_fetch_count_internal() - 1;
    return _fetchAndGetIterator(fetchCount, iter, (e) => f.add(fn(e)));
};

const pfmap = curry(async function* (fn, iter) {
    const f = new _Queue();
    const g = await _fetchMapInternal(f, fn, iter);
    for await (const e of g) {
        f.add(fn(e));
        yield* await f.poll();
    }
    while (!f.isEmpty()) {
        yield* await f.poll();
    }
});

const pflatMap = pfmap;

const pipe = (f, ...fns) => (...args) => foldl((z, fn) => fn(z), f(...args), fns);

const pmap = curry(async function* (fn, iter) {
    const f = new _Queue();
    const g = await _fetchMapInternal(f, fn, iter);
    for await (const e of g) {
        f.add(fn(e));
        yield f.poll();
    }
    yield* f.removeIterator();
});

const propOrElse = curry((key, defaultValue, target) => {
    const r = prop(key, target);
    if (r === undefinedValue) {
        return defaultValue;
    }
    return r;
});

/// <reference types="node" />
let randomUintInternal;
if (typeof exports === "object" &&
    typeof module !== "undefined" &&
    typeof crypto === "undefined") {
    const crypto = require("crypto");
    randomUintInternal = (size) => {
        const buf = crypto.randomBytes(size);
        const n = buf.readUIntBE(0, size);
        return n;
    };
}
else {
    randomUintInternal = (size) => {
        const buf = new ArrayBuffer(4);
        const ar = new Uint8Array(buf);
        const v = new DataView(buf);
        crypto.getRandomValues(ar);
        switch (size) {
            case 1: return v.getUint8(0);
            case 2: return v.getUint16(0);
            case 3: return v.getUint32(0) & 16777215;
            default: return v.getUint32(0);
        }
    };
}
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
    for (; randomRange >= bit; ++step) {
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
 * maximum value is uint max
 * internally use crypto.randomBytes
 *
 * @example
 * const r0 = F.random(); // print 0 ~ 4294967295
 * const r1 = F.random(10); // print 0 ~ 9
 * const r2 = F.random(1, 42); // print 1 ~ 41, maximum range: 4294967295
 *
 * @param begin range [begin
 * @param end range end)
 * @returns random number
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

const range = function* (...k) {
    let begin = 0;
    let end = Infinity;
    let n = 1;
    const len = k.length;
    switch (len) {
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
    if (begin > end) {
        for (let i = begin; i > end; i += n) {
            yield i;
        }
    }
    else {
        for (let i = begin; i < end; i += n) {
            yield i;
        }
    }
};

const getDuration = async (duration) => {
    duration = await _takeValue(duration);
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

const sleep = (t) => new Promise((r) => {
    setTimeout(r, t);
});

const rangeInterval = async function* (duration, ...k) {
    duration = await getDuration(duration);
    await sleep(duration);
    for (const e of range(...k)) {
        yield e;
        await sleep(duration);
    }
};

const reFindSubmatch = curry((re, str) => {
    if (re.constructor !== RegExp) {
        re = new RegExp(re);
    }
    const m = re.exec(str);
    return m || [];
});

const reFind = curry((re, str) => {
    const r = reFindSubmatch(re, str);
    return r[0] || "";
});

const toGlobalRegex = (r) => {
    if (r.constructor === RegExp) {
        if (!r.global) {
            r = new RegExp(r, r.flags + "g");
        }
        r.lastIndex = 0;
        return r;
    }
    return new RegExp(r, "g");
};
const findAllSubMatch = (re, str, callback) => {
    re = toGlobalRegex(re);
    while (true) {
        const m = re.exec(str);
        if (!m) {
            break;
        }
        callback(m);
    }
};

const reFindAll = curry((re, str) => {
    const r = [];
    findAllSubMatch(re, str, (e) => r.push(e[0]));
    return r;
});

const reFindAllSubmatch = curry((re, str) => {
    const r = [];
    findAllSubMatch(re, str, (e) => r.push(e));
    return r;
});

/**
 * same as fold1
 * take 1 items and call foldl
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = await F.reduce((acc, e) => acc + e, a);
 * console.log(sum); // print 15;
 *
 * @param f (acc: T, elem: T) => (T | Promise<T>)
 * @param iter any iterator
 */
const reduce = foldl1;

const _removeFirstFunction = async function* (comp, iter) {
    const g = seq(iter);
    for await (const e of g) {
        if (await comp(e)) {
            yield* g;
            return;
        }
        else {
            yield e;
        }
    }
};
const removeFirst = curry(async function* (x, iter) {
    x = await x;
    if (_isFunction(x)) {
        yield* _removeFirstFunction(x, iter);
    }
    else {
        const compareFunction = equals(x);
        yield* _removeFirstFunction(compareFunction, iter);
    }
});

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
 */
const repeat = async function* (a, ...b) {
    const [len, supply] = await repeatFetchArgument(a, b);
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield supply();
        }
    }
    else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};

/**
 * reverse iterator
 * @example
 * const a = [1,2,3,4,5];
 * const t = F.reverse(a);
 * console.log(await F.collect(t)); // print 5,4,3,2,1
 * @param iter any iterator
 */
const reverse = async function* (iter) {
    const a = await _collectArray(iter);
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};

const _sampleArray = (arr) => arr[random(arr.length)];
const _sampleNotArray = async (iter) => {
    const r = await _collectArray(iter);
    return _sampleArray(r);
};
const sample = (iter) => {
    if (_isReadableArrayLike(iter)) {
        return _sampleArray(iter);
    }
    return _sampleNotArray(iter);
};

const scanl = curry(async function* (f, z, iter) {
    z = await z;
    yield z;
    for await (const e of iter) {
        z = await f(z, e);
        yield z;
    }
});

const scanl1 = curry(async function* (f, iter) {
    const g = seq(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});

/**
 * get second elem
 * a => a[1]
 * @param a any array
 */
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
// for Iterable, AsyncIterable
const shuffleAsync = async (iter) => {
    iter = await collect(iter);
    return shuffleInternal(iter);
};
const shuffle = ((iter) => {
    if (_isReadableArrayLike(iter)) {
        return shuffleInternal(Array.from(iter));
    }
    return shuffleAsync(iter);
});

const some = curry(async (f, iter) => {
    for await (const e of iter) {
        if (await f(e)) {
            return true;
        }
    }
    return false;
});

const splitBy = curry(async function* (f, v) {
    yield* await f(v);
});

const sub = curry((a, b) => a - b);

const sum = foldl1(add);

const tail = async function* (iter) {
    const g = seq(iter);
    const f = await g.next();
    _mustNotEmptyIteratorResult(f);
    yield* g;
};

const take = curry(async function* (count, iter) {
    let it = 0;
    for await (const e of iter) {
        ++it;
        if (it > count) {
            break;
        }
        yield e;
    }
});

const takeLast = curry(async function* (count, iter) {
    const q = new _Queue();
    const g = await _fetchAndGetIterator(count, iter, (e) => q.add(e));
    for await (const e of g) {
        q.add(e);
        q.poll();
    }
    yield* q.removeIterator();
});

const takeWhile = curry(async function* (f, iter) {
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

const union = concat;

const updateAt = curry(async function* (value, index, iter) {
    let i = 0;
    const g = seq(iter);
    for await (const e of g) {
        if (i++ === index) {
            yield value;
            yield* g;
            return;
        }
        else {
            yield e;
        }
    }
});

const values = _arrayElementIterator(1, (e) => { throw new Error(`values / ${e} is not array`); });

exports._ = _;
exports._ArrayList = _ArrayList;
exports._Queue = _Queue;
exports.add = add;
exports.asc = asc;
exports.assign = assign;
exports.assignRight = assignRight;
exports.associateBy = associateBy;
exports.average = average;
exports.block = block;
exports.buffer = buffer;
exports.collect = collect;
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
exports.comparator = comparator;
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
exports.distinctUntilChanged = distinctUntilChanged;
exports.distinctUntilChangedBy = distinctUntilChangedBy;
exports.drop = drop;
exports.dropLast = dropLast;
exports.dropWhile = dropWhile;
exports.emptyThen = emptyThen;
exports.enumerate = enumerate;
exports.equals = equals;
exports.every = every;
exports.filter = filter;
exports.filterIndexed = filterIndexed;
exports.filterNot = filterNot;
exports.find = find;
exports.findLast = findLast;
exports.first = first;
exports.flat = flat;
exports.flatMap = flatMap;
exports.fmap = fmap;
exports.fnil = fnil;
exports.fnothing = fnothing;
exports.foldl = foldl;
exports.foldl1 = foldl1;
exports.forEach = forEach;
exports.forEachIndexed = forEachIndexed;
exports.get = get;
exports.getOrElse = getOrElse;
exports.groupBy = groupBy;
exports.has = has;
exports.head = head;
exports.identity = identity;
exports.inc = inc;
exports.isNil = isNil;
exports.isPrimitive = isPrimitive;
exports.iterate = iterate;
exports.juxtA = juxtA;
exports.juxtO = juxtO;
exports.keys = keys;
exports.map = map;
exports.mapIndexed = mapIndexed;
exports.match = match;
exports.max = max;
exports.maxBy = maxBy;
exports.memoize = memoize;
exports.memoizeBy = memoizeBy;
exports.mergeMap = mergeMap;
exports.mergeMapRight = mergeMapRight;
exports.mergeObject = mergeObject;
exports.mergeObjectRight = mergeObjectRight;
exports.min = min;
exports.minBy = minBy;
exports.otherwise = otherwise;
exports.parallel_set_fetch_count = parallel_set_fetch_count;
exports.peek = peek;
exports.pflatMap = pflatMap;
exports.pfmap = pfmap;
exports.pipe = pipe;
exports.pmap = pmap;
exports.prop = prop;
exports.propOrElse = propOrElse;
exports.random = random;
exports.range = range;
exports.rangeInterval = rangeInterval;
exports.reFind = reFind;
exports.reFindAll = reFindAll;
exports.reFindAllSubmatch = reFindAllSubmatch;
exports.reFindSubmatch = reFindSubmatch;
exports.reduce = reduce;
exports.removeFirst = removeFirst;
exports.repeat = repeat;
exports.reverse = reverse;
exports.run = run;
exports.sample = sample;
exports.scanl = scanl;
exports.scanl1 = scanl1;
exports.second = second;
exports.seq = seq;
exports.shuffle = shuffle;
exports.sleep = sleep;
exports.some = some;
exports.splitBy = splitBy;
exports.sub = sub;
exports.sum = sum;
exports.tail = tail;
exports.take = take;
exports.takeLast = takeLast;
exports.takeWhile = takeWhile;
exports.tap = tap;
exports.then = then;
exports.timeout = timeout;
exports.underBar = underBar;
exports.union = union;
exports.updateAt = updateAt;
exports.values = values;
