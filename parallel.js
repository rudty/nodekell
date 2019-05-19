'use strict';
const C = require("./core.js");
const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

class LinkedListNode {
    constructor(value, prev, next) {
        this.prev = prev;
        this.next = next;
        this.value = value;
    }

    removeAndGet() {
        this.prev = null;
        this.next = null;

        const v = this.value;
        this.value = null;
        return v;
    }
}

class LinkedList {
    constructor() {
        this.head = this.tail = null;
    }

    addFirst(value) {
        const n = new LinkedListNode(value, null, this.head);
        if (!this.tail) {
            this.tail = n;
        } else {
            this.head.next = n;
        }
        this.head = n;
    }

    addLast(value) {
        const n = new LinkedListNode(value, this.tail, null);
        if (!this.head) {
            this.head = n;
        } else {
            this.tail.next = n;
        }
        this.tail = n;
    }

    removeFirst() {
        const f = this.head;
        if (f === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = f.next;
        }
        return f.removeAndGet();
    }

    removeLast() {
        const l = this.tail;
        if (this.head === l) {
            this.head = this.tail = null;
        } else {
            this.tail = l.prev;
        }
        return l.removeAndGet();
    }

    isEmpty() {
        return this.head === null;
    }

    *[Symbol.iterator]() {
        let it = this.head;
        while(it) {
            yield it.value;
            it = it.next;
        }
    }
}

/**
 * internal only
 */
exports.LinkedList = LinkedList;

exports.parallel_set_fetch_count = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("count > 0 required");
    }
    global_fetch_count = count || default_fetch_count;
};

// const fetch_map_internal = async (f, fn, iter) => {
//     const fetch_count = global_fetch_count - 1; 
//     const g = C.seq(iter);
//     for (let i = fetch_count; i > 0; --i) {
//         const e = await g.next();
//         if (e.done) {
//             break;
//         }
//         f.push(fn(e.value));
//     }
//     return g;
// };

const fetch_map_internal = async (f, fn, iter) => {
    const fetch_count = global_fetch_count - 1; 
    const g = C.seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.addLast(fn(e.value));
    }
    return g;
};

exports.pmap = C.curry(async function* (fn, iter) {
    const f = new LinkedList();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.addLast(fn(e));
        yield await f.removeFirst();
    }

    while (!f.isEmpty()) {
        yield f.removeFirst();
    }
});

const pfmap = C.curry(async function* (fn, iter) {
    const f = new LinkedList();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.addLast(fn(e));
        yield* await f.removeFirst();
    }

    while (!f.isEmpty()) {
        yield* await f.removeFirst();
    }
});
exports.pfmap = pfmap;
exports.pflatMap = pfmap;

const fetch_filter_internal = async (f, v, fn, iter) => {
    //fetch (n - 1) here
    const fetch_count = global_fetch_count - 1;
    const g = C.seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const { done, value } = await g.next();
        if (done) {
            break;
        }
        f.addLast(fn(value));
        v.addLast(value);
    }
    return g;
};

exports.pfilter = C.curry(async function* (fn, iter) {
    const f = new LinkedList();
    const v = new LinkedList();
    const g = await fetch_filter_internal(f, v, fn, iter);
    for await (const e of g) {
        f.addLast(fn(e));
        v.addLast(e);

        const c = v.removeFirst();
        if (await f.removeFirst()) {
            yield c;
        }
    }

    while (!v.isEmpty()) {
        const c = v.removeFirst(); 
        if (await f.removeFirst()) {
            yield c;
        }
    }
});

const pcalls_internal = async function* (iter) {
    const fetch_count = global_fetch_count;
    let f = [];
    for await(const e of iter) {
        const len = f.push(e());
        if(len >= fetch_count) {
            yield* f;
            f = [];
        }
    } 
    yield* f;
};

exports.pcalls = C.curry(async function* (...a) {
    if (a.length === 1) {
        if (a[0][Symbol.iterator] || a[0][Symbol.asyncIterator]) {
            yield* pcalls_internal(a[0]);
            return;
        }
    }
    yield* pcalls_internal(a);
});