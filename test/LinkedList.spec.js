"use strict";
const F = require("../index");
const assert = require("assert");
describe('test LinkedList', () => {
    it('add', async () => {
        const list = new F.LinkedList();
        assert.ok(list.isEmpty());
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);

        assert.strictEqual(list.head.value, 3);
        assert.strictEqual(list.head.next.value, 4);
        assert.strictEqual(list.head.next.next.value, 5);
    });

    it('removeFirst', async () => {
        const list = new F.LinkedList();
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);

        assert.strictEqual(list.removeFirst(), 3);
        assert.strictEqual(list.removeFirst(), 4);
        assert.strictEqual(list.removeFirst(), 5);
        assert.ok(list.isEmpty());
    });

    it('removeLast',  async () => {
        const list = new F.LinkedList();
        assert.ok(list.isEmpty());
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);

        assert.strictEqual(list.removeLast(), 5);
        assert.strictEqual(list.removeLast(), 4);
        assert.strictEqual(list.removeLast(), 3);
        assert.ok(list.isEmpty());
    });

    it('iterator', async () => {
        const list = new F.LinkedList();
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);
        const it = list[Symbol.iterator]();
        const e1 = it.next();
        assert.strictEqual(e1.value, 3);
        const e2 = it.next();
        assert.strictEqual(e2.value, 4);
        const e3 = it.next();
        assert.strictEqual(e3.value, 5);
        
    });
});