"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test iterate', () => {
    it('inc', async () => {
        const r = await F.collect(
            F.take(5,
                F.iterate(
                    F.inc, 1)));

        assert.deepStrictEqual(r,[1,2,3,4,5]);
    });

    it('with run inc', async () => {
        const r = await F.run(
            F.iterate(F.inc, 1),
            F.take(5),
            F.collect);

        assert.deepStrictEqual(r,[1,2,3,4,5]);
    });

    it('fibo', async () => {
        const fibo = (a) => [a[1], a[0] + a[1]];
        const r = await F.run(
            F.iterate(fibo, [0, 1]),
            F.map(F.head),
            F.take(10),
            F.collect);

        assert.deepStrictEqual(r,[0,1,1,2,3,5,8,13,21,34]);
    });


});