"use strict";

interface StackNode<T> {
    value: T;
    next: StackNode<T> | null;
}

/**
 * collection interface
 * like java Stack<T>
 *
 * internal only
 */
export class _Stack<T> {
    top: StackNode<T> | any;

    constructor() {
        this.top = null;
    }

    push(v: T) {
        const t = this.top;
        this.top = { value: v, next: t };
    }

    _unsafePop() {
        const v = this.top.value;
        this.top = this.top.next;
        return v;
    }

    /**
     * remove top and return
     * return top or throw Error if empty
     */
    pop(): T {
        if (this.top === null) {
            throw new Error("no such element");
        }
        return this._unsafePop();
    }

    /**
     * remove top and return
     * return top or return null if empty
     */
    poll(): T | null {
        if (this.top === null) {
            return null;
        }
        return this._unsafePop();
    }

    /**
     * not remove
     * look top elements
     */
    peek(): T | null {
        const f = this.top;
        if (f === null) {
            return null;
        }
        return f.value;
    }

    /**
     * if stack is empty
     */
    isEmpty(): boolean {
        return this.top === null;
    }

    /**
     * clear all elements
     */
    clear() {
        // remove chain
        // help gc
        let it = this.top;
        while (it) {
            it.value = null;
            const n = it.next;
            it.next = null;
            it = n;
        }
        this.top = null;
    }

    *[Symbol.iterator]() {
        let it = this.top;
        while (it) {
            yield it.value;
            it = it.next;
        }
    }

    /**
     * yields the value from head and then deletes the value
     * After the iterator ends, the size of the Stack is zero
     *
     * same as
     * while (false === q.isEmpty()) {
     *     yield q.pop();
     * }
     * yield value and assign next to null
     * help gc
     */
    *removeIterator() {
        let it = this.top;
        while (it) {
            const p = it;
            yield p.value;
            it = p.next;

            p.value = null;
            p.next = null;
        }
    }
}
