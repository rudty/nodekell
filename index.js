'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

const identity = (e) => e;

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

exports.collect = collect;
exports.curry = curry;
exports.dec = dec;
exports.filter = filter;
exports.filterIndexed = filterIndexed;
exports.filterNot = filterNot;
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
exports.map = map;
exports.mapIndexed = mapIndexed;
exports.prop = prop;
exports.random = random;
exports.range = range;
exports.reduce = reduce;
exports.reverse = reverse;
exports.run = run;
exports.seq = seq;
