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

const scanl = C.curry(async (f, z, iter) => {
    z = await z;
    const r = [z];
    for await (const e of iter) {
        z = await f(z, e);
        r.push(z);
    } 
    return r;
});
exports.scanl = scanl;

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

const foldr =  C.curry(async (f, z, iter) => {
    z = await z;
    for await (const e of reverse(iter)) {
        z = await f(e, z);
    }
    return z;
});
exports.foldr = foldr;

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

exports.range = function* (a) {
    let begin = 0;
    let end = a;
    const len = arguments.length;
    let n = 1;
    if (len > 1) {
        begin = end;
        end = arguments[1];
    }
    if (len > 2) {
        n = arguments[2];
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