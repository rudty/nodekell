"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test take', () => {
    it('<', async () => {
        const a = [1,2,3,4,5];
        const r = F.take(1, a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [1]);
    });

    it('==', async () => {
        const a = [1,2,3,4,5];
        const r = F.take(5, a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [1,2,3,4,5]);
    });


    it('>', async () => {
        const a = [1,2,3,4,5];
        const r = F.take(Infinity, a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [1,2,3,4,5]);
    });

    it('0', async () => {
        const a = [1,2,3,4,5];
        const r = F.take(0, a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, []);
    });
});