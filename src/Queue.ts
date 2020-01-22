"use strict";

interface QueueNode<T> {
    value: T;
    next: QueueNode<T> | any;
}

/**
 * collection interface
 * like java Queue<T>
 *
 * internal only
 */
export class _Queue<T> {
    private head: QueueNode<T> | any;
    private tail: QueueNode<T> | any;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(v: T) {
        const n: QueueNode<T> = { value: v, next: null };
        if (this.head) {
            this.tail.next = n;
        } else {
            this.head = n;
        }
        this.tail = n;
    }

    _unsafePop(): T {
        const f = this.head;
        this.head = f.next;
        if (this.tail === f) {
            this.head = null;
            this.tail = null;
        }
        f.next = null;
        return f.value;
    }

    /**
     * remove head and return
     * return head or throw Error if empty
     */
    remove(): T {
        if (this.head === null) {
            throw new Error("no such element");
        }
        return this._unsafePop();
    }

    /**
     * remove head and return
     * return head or null if empty
     */
    poll(): T | null {
        if (this.head === null) {
            return null;
        }
        return this._unsafePop();
    }

    /**
     * not remove
     * return head or throw Error if empty
     */
    element(): T {
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
    peek(): T | null {
        const f = this.head;
        if (f === null) {
            return null;
        }
        return f.value;
    }

    isEmpty(): boolean {
        return this.head === null;
    }

    /**
     * clear all elements
     */
    clear() {
        // remove chain
        // help gc
        let it = this.head;
        while (it) {
            const n = it.next;
            it.value = it.next = null;
            it = n;
        }

        this.head = this.tail = null;
    }

    *[Symbol.iterator](): IterableIterator<T> {
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
    *removeIterator(): IterableIterator<T> {
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
