"use strict";
const F = require("../index");
const assert = require("assert");

describe('test exceptThen', () => {
    const throwFirst = () => {
        return () => {
            throw new Error("Test Error");
        };
    };
    const throwSecond = () => {
        let fst = null;
        return (e) => {
            if(fst) {
                throw new Error("Test Error");
            } 
            fst = e;
            return e;
        };
    };

    it('throw first', async () => {
        const v = await F.run([1,2],
            F.filter(throwFirst()),
            F.errorThen([3,4]),
            F.collect);
        assert.deepStrictEqual(v, [3,4]);
    });

    it('throw second', async () => {
        const v = await F.run([1,2],
            F.filter(throwSecond()),
            F.errorThen([3,4]),
            F.collect);
        assert.deepStrictEqual(v, [1,3,4]);
    });

    it('throw second2', async () => {
        const v = await F.run([1,2],
            F.filter(e =>{
                if (e > 1) {
                    throw new Error("hello")
                }
                return e;
            }),
            F.errorThen([9,8]),
            F.collect);
        assert.deepStrictEqual([1,9,8], v);
    });


    it('print Error ', async () => {
        const v = await F.run([1,2],
            F.filter(throwSecond()),
            F.errorThen((ex) => {
                assert.deepStrictEqual("Test Error", ex.message);
                return [9,8];
            }),
            F.collect);
        assert.deepStrictEqual(v, [1,9,8]);
    });

    it('return nothing ', async () => {
        const v = await F.run([1,2],
            F.filter(throwSecond()),
            F.errorThen(() => {
            }),
            F.collect);
        assert.deepStrictEqual(v, [1]);
    });

    it('return nothing2', async () => {
        const v = await F.run([1,2],
            F.filter(throwFirst()),
            F.errorThen(() => {
            }),
            F.collect);
        assert.deepStrictEqual(v, []);
    });

    it('return value', async () => {
        const v = await F.run([1,2],
            F.filter(throwFirst()),
            F.errorThen(3), //ignore value type
            F.collect);
        assert.deepStrictEqual(v, []);
    });
});