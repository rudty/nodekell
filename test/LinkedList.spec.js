"use strict";
const F = require("../index");
const LinkedList = require("../linkedlist");
const assert = require("assert");
describe('test LinkedList', () => {
    it('addLast', async () => {
        const list = new LinkedList();
        assert.ok(list.isEmpty());
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);

        assert.strictEqual(list.head.value, 3);
        assert.strictEqual(list.head.next.value, 4);
        assert.strictEqual(list.head.next.next.value, 5);
    });

    it('add first', async () => {
        const list = new LinkedList();
        assert.ok(list.isEmpty());
        list.addFirst(3);
        list.addFirst(4);
        list.addFirst(5);

        assert.strictEqual(list.head.value, 5);
        assert.strictEqual(list.head.next.value, 4);
        assert.strictEqual(list.head.next.next.value, 3);
    });

    it('removeFirst', async () => {
        const list = new LinkedList();
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);

        assert.strictEqual(list.removeFirst(), 3);
        assert.strictEqual(list.removeFirst(), 4);
        assert.strictEqual(list.removeFirst(), 5);
        assert.ok(list.isEmpty());
    });

    // it('removeLast',  async () => {
    //     const list = new F.LinkedList();
    //     assert.ok(list.isEmpty());
    //     list.addLast(3);
    //     list.addLast(4);
    //     list.addLast(5);

    //     assert.strictEqual(list.removeLast(), 5);
    //     assert.strictEqual(list.removeLast(), 4);
    //     assert.strictEqual(list.removeLast(), 3);
    //     assert.ok(list.isEmpty());
    // });

    it('iterator', async () => {
        const list = new LinkedList();
        list.addLast(3);
        list.addLast(4);
        list.addLast(5);
        const it = list.asyncRemoveIterator();
        const e1 = await it.next();
        assert.strictEqual(e1.value, 3);
        const e2 = await it.next();
        assert.strictEqual(e2.value, 4);
        const e3 = await it.next();
        assert.strictEqual(e3.value, 5);
        
    });

    it('deep iterator', async () => {
        const list = new LinkedList();
        list.addLast([3]);
        list.addLast([4]);
        list.addLast([5,Promise.resolve(6)]);
        const it = list.asyncFlatRemoveIterator();
        const e1 = await it.next();
        assert.strictEqual(e1.value, 3);
        const e2 = await it.next();
        assert.strictEqual(e2.value, 4);
        const e3 = await it.next();
        assert.strictEqual(e3.value, 5);
        const e4 = await it.next();
        assert.strictEqual(e4.value, 6);
        
    });
});