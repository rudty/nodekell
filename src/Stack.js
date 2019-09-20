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
};