"use strict";

/**
 * single linked list
 * only use it internally
 */
class LinkedList {
    constructor() {
        this.head = this.tail = null;
    }

    addFirst(value) {
        const n = {value: value, next: this.head};
        if (!this.tail) {
            this.tail = n;
        }
        this.head = n;
    }

    addLast(value) {
        const n = {value: value, next: null};
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
        f.next = null;
        return f.value;
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

    /**
     * await value internally
     */
    async *[Symbol.asyncIterator]() {
        let it = this.head;
        while(it) {
            yield await it.value;
            it = it.next;
        }
    }

    /**
     * yields the value from head and then deletes the value
     * After the iterator ends, the size of the LinkedList is zero
     * 
     * same as
     * while (false === l.isEmpty()) {
     *     yield l.removeFirst();
     * }
     * yield value and assign next to null
     * help gc
     */
    async *asyncRemoveIterator() {
        let it = this.head;
        while (it) {
            const p = it;
            yield await p.value;
            it = p.next;

            p.value = null;
            p.next = null;
        }
    }

    /**
     * yields the value from head and then deletes the value
     * After the iterator ends, the size of the LinkedList is zero
     * 
     * same as 
     * while (false === l.isEmpty()) {
     *      yield* l.removeFirst();
     * }
     * 
     * yield* value and assign next to null
     * help gc
     */
    async *asyncFlatRemoveIterator() {
        let it = this.head;
        while (it) {
            const p = it;
            yield* await p.value;
            it = p.next;

            p.value = null;
            p.next = null;
        }
    }
}

/**
 * internal only
 */
module.exports = LinkedList;