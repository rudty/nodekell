"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test stack', () => {
    it("push", async() => {
        const s = new F._Stack();
        s.push(1);
        s.push(2);
        s.push(3);

        assert.deepStrictEqual(s.top.value, 3);
        assert.deepStrictEqual(s.top.next.value, 2);
        assert.deepStrictEqual(s.top.next.next.value, 1);
    });

    it("pop", async () => {
        const s = new F._Stack();
        s.push(1);
        s.push(2);
        s.push(3);

        assert.deepStrictEqual(s.pop(), 3);
        assert.deepStrictEqual(s.pop(), 2);
        assert.deepStrictEqual(s.pop(), 1);
    });

    it("peek", async () => {
        const s = new F._Stack();
        s.push(1);
        s.push(2);
        s.push(3);

        assert.deepStrictEqual(s.peek(), 3);
        s.pop();
        assert.deepStrictEqual(s.peek(), 2);
        s.pop();
        assert.deepStrictEqual(s.peek(), 1);
    });

    it("clear", async () => {
        const s = new F._Stack();
        s.push(1);
        s.push(2);
        s.push(3);

        s.clear();

        assert.deepStrictEqual(s.peek(), null);
        assert.deepStrictEqual(s.isEmpty(), true);
    });
});