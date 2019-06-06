'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const curry = fn => (...a) => {
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

const buffer = curry(async function*(supply, iter) {
    supply = await supply;
    if(supply <= 0) {
        throw new Error("arg supply > 0 required")
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

const collect = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};

const collectMap = async (iter) => new Map(await collect(iter));

const collectObject = async (iter) => {
    const c = await collect(iter);
    const o = {};
    for (const e of c) {
        if (!Array.isArray(e)) {
            throw new TypeError("value is not array");
        }
        o[e[0]] = e[1];
    }
    return o;
};

const collectSet = async (iter) => new Set(await collect(iter));

const compose = (...fns) => async (...args) => {
    const len = fns.length;
    let z = await fns[len - 1](...args);
    for (let i = len - 2; i >= 0; --i) {
        z = await fns[i](z);
    }
    return z;
};

const concat = curry(async function* (a, b) {
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
};

const count = async (iter) => {
    if (iter.length && Number.isInteger(iter.length)) {
        return iter.length;
    }
    if (iter.size && Number.isInteger(iter.size)) {
        return iter.size;
    }
    if (iter[Symbol.asyncIterator] || iter[Symbol.iterator]) {
        let c = 0;
        for await (const _ of iter) {
            ++c;
        }
        return c;
    }
    return Object.keys(iter).length;
};

const dec = a => a - 1;

const desc = (a, b) => a < b ? 1 : a > b ? -1 : 0;

const dflat = async function* (...iters) {
    for await (const it of iters) {
        if (it) {
            if (it.constructor === String) {
                yield* it;
                continue;
            } else if (it[Symbol.asyncIterator] || it[Symbol.iterator]) {
                for await (const e of it) {
                    yield* dflat(e);
                }
                continue;
            }
        }
        yield it;
    }
};

const distinctBy = curry(async function*(f, iter) {
    const s = new Set();
    for await (const e of iter) {
        const d = await f(e);
        if (!s.has(d)) {
            s.add(d);
            yield e;
        }
    }
});

const identity = e => e;

const distinct = (iter) => distinctBy(identity, iter);

const seq = async function* (iter) {
    for await (const e of iter) {
        yield e;
    }
};

const drop =  curry(async function* (count, iter) {
    const g =  seq(iter);
    for (let i = 0; i < count; i++) {
        const { done } = await g.next();
        if (done) {
            break;
        }
    }
    yield* g;
});

const dropWhile =  curry(async function* (f, iter) {
    const g =  seq(iter);
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

const emptyThen = curry(async function*(supply, iter) {
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

const enumerate = async function* (iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};

const equals = curry((a, b) => a === b);

const errorThen = curry(async function*(supply, iter){
    try{
        yield* iter;
    } catch(e) {
        supply = await supply;
        if (supply instanceof Function) {
            supply = await supply(e);
        }
        if(supply && (supply[Symbol.iterator] || supply[Symbol.asyncIterator])) {
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
    for await(const e of iter) {
        if (await fn(e)) {
            return e;
        }
    }
});

const findLast = curry(async (fn, iter) => {
    iter = Array.isArray(iter) ? iter : await collect(iter);
    for (let i = iter.length - 1; i >= 0; --i) {
        if (await fn(iter[i])) {
            return iter[i];
        }
    }
});

const first = a => a[0];

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

const flat = async function* (iter) {
    for await (const e of iter) {
        if (e && (e[Symbol.iterator] || e[Symbol.asyncIterator])) {
            yield* e;
        } else {
            yield e;
        }
    }
};

const fmap =  curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (e && (e[Symbol.iterator] || e[Symbol.asyncIterator])) {
            yield* await fn(e);
        } else {
            yield e;
        }
    }
});
const flatMap = fmap;

const fnothing = () => {};

const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});
const foldl1 = curry(async (f, iter) => {
    const g =  seq(iter);
    const h = await g.next();
    if (h.done) {
        throw new Error("empty iter");
    }
    return foldl(f, h.value, g);
});
const reduce = fold1;

const reverse = async function* (iter) {
    const a = [];
    for await (const e of iter) {
        a.push(e);
    }
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
const foldr =  curry((f, z, iter) => {
    return _foldr_internal(f, z, reverse(iter));
});
const foldr1 = curry(async (f, iter) => {
    const g = reverse(iter);
    const h = await g.next();
    if (h.done) {
        throw new Error("empty iter");
    }
    return foldr_internal(f, h.value, g);
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

const get = curry((key, a) => {
    if (a.get && a.get.constructor === Function) {
        const r = a.get(key);
        if (r !== undefined) {
            return r;
        }
    }
    return a[key];
});

const groupBy = curry(async (f, iter) => {
    const m = new Map();
    for await (const e of iter) {
        const k = await f(e);
        if (m.has(k)) {
            const v = m.get(k);
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
   return a[key] !== undefined;
});

const head = async (iter) => {
    const g =  seq(iter);
    const { value, done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    return value;
};

const inc = a => a + 1;

const sleep = (t) => new Promise(r => {
    setTimeout(r, t);
});

const interval = (timeout, timerHandler, ...param) => {
    if(!timeout || timeout < 10) {
        timeout = 10;
    }
    const k = { run: true };
    (async () =>{
        while (k.run) {
            try{
                const s = sleep(timeout);
                await timerHandler(...param);
                await s;
            } catch {
            }
        }
    })();
    return k;
};

const isNil = v => {
    if (v) {
        return false;
    }
    switch(v){
        case null: return true;
        case undefined: return true;
        default: return Number.isNaN(v);
    }
};

const iterate = curry(async function*(fn, v) {
    v = await v;
    yield v;
    while(true) {
        v = await fn(v);
        yield v;
    }
});

const map =  curry(async function* (fn, iter) {
    for await (const e of iter) {
        yield fn(e);
    }
});

const maxBy = curry(async (f, iter) => {
    const g = seq(iter);
    const head = await g.next();
    if (head.done) {
        throw new Error("empty iter");
    }
    let m = head.value;
    let c = await f(m);
    for await (const e of g) {
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
    }
};
const memoizeWithTimeout = curry((timeout, callFn) => memoizeWithTimeoutBy(timeout, (...a) => a, callFn));

const minBy = curry(async (f, iter) => {
    const g = seq(iter);
    const head = await g.next();
    if (head.done) {
        throw new Error("empty iter");
    }
    let m = head.value;
    let c = await f(m);
    for await (const e of g) {
        const k = await f(e);
        if (k < c) {
            m = e;
            c = k;
        }
    }
    return m;
});

const min = minBy(identity);

const notNil = (a) => !isNil(a);

const otherwise = () => true;

const peek = curry(async function*(f, iter) {
    for await (const e of iter) {
        await f(e);
        yield e;
    }
});

const pipe = (f, ...fns) => (...args) => foldl((z, fn) => fn(z), f(...args), fns);

const prop = curry((key, a) => a[key]);

const range = function* (...k) {
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

const getDuration = async duration => {
    duration = await duration;
    if (duration instanceof Function) {
        duration = await duration();
    }
    if (duration <= 0) {
        throw new Error("duration > 0 required")
    }
    return duration;
};
const errorSleep = t => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("timeout error"));
    }, t);
});

const rangeInterval = async function*(duration, ...k) {
    duration = await getDuration(duration);
    await sleep(duration);
    for (const e of range(...k)) {
        yield e;
        await sleep(duration);
    }
};

const rangeOf = (...a) => fmap(identity, a);

const repeat = async function* (a, ...b) {
    let supply = a;
    let len = Infinity;
    if (b.length > 0) {
        supply = b[0];
        len = await a;
    }
    supply = await supply;
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield await supply();
        }
    } else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};

const run = (iter, ...f) => foldl((z, fn) => fn(z), iter, f);

const scanl = curry(async function*(f, z, iter) {
    z = await z;
    yield z;
    for await (const e of iter) {
        z = await f(z, e);
        yield z;
    }
});
const scanl1 = curry(async function*(f, iter) {
    const g =  seq(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});

const second = a => a[1];

const some = curry(async (f, iter) => {
    for await (const e of iter) {
        if (await f(e)) {
            return true;
        }
    }
    return false;
});

const sortBy = curry(async function* (f, order, iter) {
    if (order.constructor === ''.constructor) {
        switch (order.trim().toLowerCase()) {
            case 'asc':
                order = asc;
                break;
            case 'desc':
                order = desc;
                break;
            default:
                throw new Error('please set order parameter to ASC or DESC or compare function');
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

const split = curry(async function*(fn, iter) {
    const g = seq(iter);
    let e;
    yield (async function* () {
        while (true) {
            e = await g.next();
            if ((e.done) || await fn(e.value)) {
                break;
            }
            yield e.value;
        }
    })();
    yield (async function* () {
        if (!e.done) {
            yield e.value;
            yield* g;
        }
    })();
});

const splitBy = curry(async function*(f, any) {
    yield* await f(any);
});

const combineMap = (a, b) => new Map([...b, ...a]);
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
const _outerJoin = async function* (f, iter1, iter2) {
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
const _innerJoin = async function* (f, iter1, iter2) {
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

const tail = async function* (iter) {
    const g = seq(iter);
    const { done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
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

const takeWhile =  curry(async function* (f, iter) {
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
    s.catch(C.fnothing);
    return e;
});

exports.withTimeout = C.curry(async function*(duration, iter) {
    duration = await getDuration(duration);
    const g = C.seq(iter);
    const s = errorSleep(duration);
    while(true) {
        const it = g.next();
        const e = await Promise.race([s, it]);
        if(e.done) {
            break;
        }
        yield e.value;
    }
    s.catch(C.fnothing);
});

const zipWith = curry(async function* (f, a, b) {
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

const zipWith3 = curry(async function*(f, a, b, c){
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

exports.add = add;
exports.asc = asc;
exports.average = average;
exports.buffer = buffer;
exports.collect = collect;
exports.collectMap = collectMap;
exports.collectObject = collectObject;
exports.collectSet = collectSet;
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
exports.leftInnerJoin = leftInnerJoin;
exports.leftOuterJoin = leftOuterJoin;
exports.map = map;
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
exports.peek = peek;
exports.pipe = pipe;
exports.prop = prop;
exports.range = range;
exports.rangeInterval = rangeInterval;
exports.rangeOf = rangeOf;
exports.reduce = reduce;
exports.repeat = repeat;
exports.reverse = reverse;
exports.rightInnerJoin = rightInnerJoin;
exports.rightOuterJoin = rightOuterJoin;
exports.run = run;
exports.scanl = scanl;
exports.scanl1 = scanl1;
exports.second = second;
exports.seq = seq;
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
exports.union = union;
exports.zip = zip;
exports.zip3 = zip3;
exports.zipWith = zipWith;
exports.zipWith3 = zipWith3;
