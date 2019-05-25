"use strict";
const Queue = require("../internal/queue.js");
const assert = require("assert");
    
describe('test queue', () => {
    it('add', async () => {
        const q = new Queue();
        assert.ok(q.isEmpty());
        q.add(3);
        q.add(4);
        q.add(5);

        assert.strictEqual(q.head.value, 3);
        assert.strictEqual(q.head.next.value, 4);
        assert.strictEqual(q.head.next.next.value, 5);
    });

    it('iterator', async () => {
        const q = new Queue();
        assert.ok(q.isEmpty());
        q.add(3);
        q.add(4);
        q.add(5);
        const it = q[Symbol.iterator]();
        assert.deepStrictEqual(it.next(), {done:false,value: 3});
        assert.deepStrictEqual(it.next(), {done:false,value: 4});
        assert.deepStrictEqual(it.next(), {done:false,value: 5});
        assert.deepStrictEqual(it.next(), {done:true,value: undefined});
    });

    it('clear', async () => {
        const q = new Queue();
        assert.ok(q.isEmpty());
        q.clear();
        assert.ok(q.isEmpty());
        q.add(3);
        q.clear();
        assert.ok(q.isEmpty());
        q.add(4);
        q.add(5);
        q.clear();
        assert.ok(q.isEmpty());
    });

    it('remove', async () => { 
        const q = new Queue();
        assert.ok(q.isEmpty());
        q.add(3);
        q.add(4);
        q.add(5);

        assert.strictEqual(q.remove(), 3);
        assert.strictEqual(q.remove(), 4);
        assert.strictEqual(q.remove(), 5);
        assert.ok(q.isEmpty());
    });

    it('peek', async () => { 
        const q = new Queue();
        assert.ok(q.isEmpty());
        q.add(3);
        assert.strictEqual(q.peek(), 3);
        assert.strictEqual(q.poll(), 3);
        assert.ok(q.isEmpty());
    });

    it('remove Error', async () => { 
        const q = new Queue();
        assert.ok(q.isEmpty());
        q.add(3);

        assert.strictEqual(q.remove(), 3);
        try {
            q.remove();
            assert.fail("no such elem");
        } catch(e) {
            if (e instanceof assert.AssertionError) {
                throw e;
            }
        }
        assert.ok(q.isEmpty());
    });

    it('elem Error', async () => { 
        const q = new Queue();
        try{
            q.element();
            assert.fail("no such elem");
        } catch(e) {
            if (e instanceof assert.AssertionError) {
                throw e;
            }
        }
        q.add(3);
        q.add(3);
        q.add(3);
        q.add(3);
        q.remove();
        q.remove();
        q.remove();
        q.remove();
        try{
            q.element();
            assert.fail("no such elem");
        } catch(e) {
            if (e instanceof assert.AssertionError) {
                throw e;
            }
        }
    });
});
