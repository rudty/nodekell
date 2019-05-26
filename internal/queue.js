"use strict";

/**
 * collection interface
 * like java Queue<T>
 */
class Queue {
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

    _unsafe_pop() {
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
        return this._unsafe_pop();
    }

    /**
     * remove head and return
     * return head or null if empty
     */
    poll() {
        if (this.head === null) {
            return null;
        }
        return this._unsafe_pop();
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
 * internal only
 */
module.exports = Queue;
