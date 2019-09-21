/**
 * collection interface
 * like java Stack<T>
 * 
 * internal only
 */
export class _Stack {
    constructor() {
        this.top = null;
    }

    push(v) {
        const t = this.top;
        this.top = { value: v, next: t };
    }

    pop() {
        if (this.top === null) {
            throw new Error("no such element");
        }
        const v = this.top.value;
        this.top = this.top.next;
        return v;
    }

    isEmpty() {
        return this.top === null;
    }

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
};