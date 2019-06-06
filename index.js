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

const compose = (...fns) => async (...args) => {
    const len = fns.length;
    let z = await fns[len - 1](...args);
    for (let i = len - 2; i >= 0; --i) {
        z = await fns[i](z);
    }
    return z;
};

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

const dec = a => a - 1;

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

const seq$1 = async function* (iter) {
    for await (const e of iter) {
        yield e;
    }
};

const drop =  curry(async function* (count, iter) {
    const g =  seq$1(iter);
    for (let i = 0; i < count; i++) {
        const { done } = await g.next();
        if (done) {
            break;
        }
    }
    yield* g;
});

const dropWhile =  curry(async function* (f, iter) {
    const g =  seq$1(iter);
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

const enumerate = async function* (iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};

const equals = curry((a, b) => a === b);

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

const first = a => a[0];

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

const get = curry((key, a) => {
    if (a.get && a.get.constructor === Function) {
        const r = a.get(key);
        if (r !== undefined) {
            return r;
        }
    }
    return a[key];
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
    const g =  seq$1(iter);
    const { value, done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    return value;
};

const identity = e => e;

const inc = a => a + 1;

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
exports.memoizeWithTimeout = curry((timeout, callFn) => memoizeWithTimeoutBy(timeout, (...a) => a, callFn));

const notNil = (a) => !isNil(a);

const otherwise = () => true;

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
    const g =  seq$1(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});

const second = a => a[1];

const split = curry(async function*(fn, iter) {
    const g = seq$1(iter);
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

const sub = curry((a, b) => a - b);

const tail = async function* (iter) {
    const g = seq$1(iter);
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

const zipWith = curry(async function* (f, a, b) {
    a = seq$1(a);
    b = seq$1(b);
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
    a = seq$1(a);
    b = seq$1(b);
    c = seq$1(c);
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

exports._foldr_internal = _foldr_internal;
exports.add = add;
exports.compose = compose;
exports.cond = cond;
exports.curry = curry;
exports.dec = dec;
exports.dflat = dflat;
exports.drop = drop;
exports.dropWhile = dropWhile;
exports.enumerate = enumerate;
exports.equals = equals;
exports.filter = filter;
exports.filterIndexed = filterIndexed;
exports.filterNot = filterNot;
exports.first = first;
exports.flat = flat;
exports.flatMap = flatMap;
exports.fmap = fmap;
exports.fnothing = fnothing;
exports.foldl = foldl;
exports.foldl1 = foldl1;
exports.foldr = foldr;
exports.foldr1 = foldr1;
exports.get = get;
exports.has = has;
exports.head = head;
exports.identity = identity;
exports.inc = inc;
exports.isNil = isNil;
exports.iterate = iterate;
exports.map = map;
exports.memoize = memoize;
exports.memoizeBy = memoizeBy;
exports.notNil = notNil;
exports.otherwise = otherwise;
exports.pipe = pipe;
exports.prop = prop;
exports.range = range;
exports.rangeOf = rangeOf;
exports.reduce = reduce;
exports.repeat = repeat;
exports.reverse = reverse;
exports.run = run;
exports.scanl = scanl;
exports.scanl1 = scanl1;
exports.second = second;
exports.seq = seq$1;
exports.split = split;
exports.sub = sub;
exports.tail = tail;
exports.take = take;
exports.takeWhile = takeWhile;
exports.zip = zip;
exports.zip3 = zip3;
exports.zipWith = zipWith;
exports.zipWith3 = zipWith3;
