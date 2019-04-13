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
    let drop = true;
    for await (const e of g) {
        if (drop && (await f(e))) {
            continue;
        } else {
            drop = false;
        }
        yield e;
    }
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
        yield await fn(e);
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
exports.flat = fmap(C.ioe);

exports.take =  C.curry(async function* (count, iter) {
    let it = 0;
    for await (const e of iter) {
        it += 1;
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

exports.foldr =  C.curry(async (f, z, iter) => {
    z = await z;
    for await (const e of reverse(iter)) {
        z = await f(e, z);
    }
    return z;
});

exports.foldr1 =  C.curry(async (f, iter) => {
    const g =  reverse(C.seq(iter));
    const h = await g.next(); 
    if (h.done) {
        throw new Error("empty iter");
    }
    let z = h.value;
    for await (const e of g) {
        z = await f(e, z);
    }
    return z;
});

exports.zip =  C.curry(async function* (a, b) {
    a =  C.seq(a);
    for await (const e of C.seq(b)) {
        const { value, done } = await a.next();
        if (done) {
            break;
        }
        yield [value, e];
    }
});

exports.zipWith =  C.curry(async function* (f, a, b) {
    a =  C.seq(a);
    for await (const e of C.seq(b)) {
        const { value, done } = await a.next();
        if (done) {
            break;
        }
        yield f(value, e);
    }
});

exports.repeat = async function* (supply) {
    supply = await supply;
    if (supply instanceof Function) {
        while (true) {
            yield await supply();
        }
    } else {
        while (true) {
            yield supply;
        }
    }
};

exports.range = function* (...k) {
    let begin = 0;
    let end = Infinity;
    let n = 1;
    const len = k.length;

    switch(len) {
    case 1:
        end = k[0];
        break;
    case 3:
        n = k[2];
    case 2:
        begin = k[0];
        end = k[1];
        break;
    }

    for (let i = begin; i !== end; i += n) {
        yield i;
    }
};

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
exports.run =  C.curry(async (iter, ...f) => foldl((z, fn) => fn(z), iter, f));