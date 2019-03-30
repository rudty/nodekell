'use strict';

/**
 * currying function wrapper
 * ex)
 * var mySum = curry((a,b,c) => {return a+b+c;});
 *
 * var mySum1 = mySum(1) 
 * var mySum2 = mySum1(2)
 * var sum = mySum2(3) // <-- real call 
 * 
 */
const curry = fn => (...a) => {
    if (fn.length <= a.length) return fn(...a);
    else return (...b) => curry(fn)(...a, ...b);
};

const head = async (iter) => {
    for await (const e of iter) {
        return e;
    }
    throw Error("empty iter");
};

/**
 * make generator
 * do not need to check if iter 
 * Symbol.asyncIterator or Symbol.iterator 
 */
const seq = async function* (iter) {
    for await (const e of iter) {
        yield e;
    }
}

const tail = async function* (iter) {
    const g = seq(iter);
    const { done } = await g.next();
    if (done) {
        throw Error("empty iter");
    }
    yield* g;
};

const drop = curry(async function* (count, iter) {
    const g = seq(iter);
    for (let i = 0; i < count; i++) {
        const { done } = await g.next();
        if (done) {
            break;
        }
    }
    yield* g;
});

const dropWhile = curry(async function* (f, iter) {
    const g = seq(iter);
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

const filter = curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});

const map = curry(async function* (fn, iter) {
    for await (const e of iter) {
        yield await fn(e);
    }
});

const fmap = curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (e && (e[Symbol.iterator] || e[Symbol.asyncIterator])) {
            yield* map(fn, e);
        } else {
            yield e;
        }
    }
});

const flat = fmap(e => e);

const take = curry(async function* (count, iter) {
    let it = 0;
    for await (const e of iter) {
        yield e;
        it += 1;
        if (it >= count) {
            break;
        }
    }
});

const takeWhile = curry(async function* (f, iter) {
    for await (const e of iter) {
        if (!(await f(e))) {
            break;
        }
        yield e;
    }
});

const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});

const foldl1 = curry(async (f, iter) => {
    const g = seq(iter);
    const h = await g.next();
    if (h.done) {
        throw Error("empty iter");
    }
    return foldl(f, h.value, g);
});

const reduce = foldl1;

const reverse = async function* (iter) {
    const a = [];
    for await (const e of iter) {
        a.push(e);
    }
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};

const foldr = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of reverse(iter)) {
        z = await f(e, z);
    }
    return z;
});

const zip = curry(async function* (a, b) {
    a = seq(a);
    for await (const e of seq(b)) {
        const { value, done } = await a.next();
        if (done) {
            break;
        }
        yield [value, e];
    }
});

const zipWith = curry(async function* (f, a, b) {
    a = seq(a);
    for await (const e of seq(b)) {
        const { value, done } = await a.next();
        if (done) {
            break;
        }
        yield f(value, e);
    }
});

const range = function* (a) {
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
const run = curry(async (iter, ...f) => foldl((z, fn) => fn(z), iter, f));


module.exports = {
    run: run,
    head: head,
    tail: tail,
    drop: drop,
    dropWhile: dropWhile,
    seq: seq,
    reverse: reverse,
    curry: curry,
    filter: filter,
    fmap: fmap,
    flat: flat,
    flatMap: fmap,
    map: map,
    range: range,
    foldl: foldl,
    foldl1: foldl1,
    reduce: reduce,
    foldr: foldr,
    take: take,
    takeWhile: takeWhile,
    reduce: reduce,
    zip: zip,
    zipWith: zipWith
};