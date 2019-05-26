'use strict';

const C = require("./core.js");

exports.head = async (iter) => {
    const g =  C.seq(iter);
    const { value, done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    return value;
};

exports.tail = async function* (iter) {
    const g = C.seq(iter);
    const { done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    yield* g;
};

exports.drop =  C.curry(async function* (count, iter) {
    const g =  C.seq(iter);
    for (let i = 0; i < count; i++) {
        const { done } = await g.next();
        if (done) {
            break;
        }
    }
    yield* g;
});

exports.dropWhile =  C.curry(async function* (f, iter) {
    const g =  C.seq(iter);
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

exports.filter =  C.curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});

exports.map =  C.curry(async function* (fn, iter) {
    for await (const e of iter) {
        yield fn(e);
    }
});

const fmap =  C.curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (e && (e[Symbol.iterator] || e[Symbol.asyncIterator])) {
            yield* await fn(e);
        } else {
            yield e;
        }
    }
});
exports.fmap = fmap;
exports.flatMap = fmap;

const flat = async function* (iter) {
    for await (const e of iter) {
        if (e && (e[Symbol.iterator] || e[Symbol.asyncIterator])) {
            yield* e;
        } else {
            yield e;
        }
    }
};
exports.flat = flat;

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

exports.dflat = dflat;

exports.take =  C.curry(async function* (count, iter) {
    let it = 0;
    for await (const e of iter) {
        ++it;
        if (it > count) {
            break;
        }
        yield e;
    }
});

exports.takeWhile =  C.curry(async function* (f, iter) {
    for await (const e of iter) {
        if (!(await f(e))) {
            break;
        }
        yield e;
    }
});

const foldl =  C.curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});
exports.foldl = foldl;

const foldl1 =  C.curry(async (f, iter) => {
    const g =  C.seq(iter);
    const h = await g.next();
    if (h.done) {
        throw new Error("empty iter");
    }
    return foldl(f, h.value, g);
});
exports.foldl1 = foldl1;
exports.reduce = foldl1;

const scanl = C.curry(async function*(f, z, iter) {
    z = await z;
    yield z;
    for await (const e of iter) {
        z = await f(z, e);
        yield z;
    }
});
exports.scanl = scanl;

exports.scanl1 = C.curry(async function*(f, iter) {
    const g =  C.seq(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});

const reverse = async function* (iter) {
    const a = [];
    for await (const e of iter) {
        a.push(e);
    }
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};
exports.reverse = reverse;

const foldr_internal = async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(e, z);
    }
    return z;
};

exports.foldr =  C.curry((f, z, iter) => {
    return foldr_internal(f, z, reverse(iter));
});

exports.foldr1 =  C.curry(async (f, iter) => {
    const g = reverse(iter);
    const h = await g.next();
    if (h.done) {
        throw new Error("empty iter");
    }
    return foldr_internal(f, h.value, g);
});

const zipWith =  C.curry(async function* (f, a, b) {
    a = C.seq(a);
    b = C.seq(b);

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

exports.zipWith = zipWith;
exports.zip = C.curry((iter1, iter2) => zipWith((elem1, elem2) => [elem1, elem2], iter1, iter2)); 

const zipWith3 = C.curry(async function*(f, a, b, c){
    a = C.seq(a);
    b = C.seq(b);
    c = C.seq(c);

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

exports.zipWith3 = zipWith3;
exports.zip3 = C.curry((iter1, iter2, iter3) => zipWith3((elem1, elem2, elem3) => [elem1, elem2, elem3], iter1, iter2, iter3));

/**
 * break is keyword..
 */
exports.split = C.curry(async function*(fn, iter) {
    const g = C.seq(iter);
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
exports.run = (iter, ...f) => foldl((z, fn) => fn(z), iter, f);

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
exports.pipe = (f, ...fns) => (...args) => foldl((z, fn) => fn(z), f(...args), fns); 

exports.compose = (...fns) => async (...args) => {
    const len = fns.length;
    let z = await fns[len - 1](...args);
    for (let i = len - 2; i >= 0; --i) {
        z = await fns[i](z);
    }
    return z;
};