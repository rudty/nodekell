"use strict";
const F = require("../index");
const assert = require("assert");

describe('test average', () => {
    it('const object', async () => {
        try {
            F._.a = 3;
            assert.fail("cannot add elem");
        } catch(e) {
            if(e.constructor !== TypeError) {
                throw e;
            }
        }
    });

    it('===', async () => {
        assert.ok(F._ === F._);
        assert.ok(F._ !== {});
        assert.ok(F._ !== []);
        assert.ok(F._ !== "{}");
    });

    it('equals array', async () => {
        assert.ok(F.equals([1], [F._]));
        assert.ok(F.equals([1,2], [1, F._]));
        assert.ok(F.equals([1,2,3], [1,F._, F._]));
        assert.ok(F.equals([1,2,3,4], [1,F._, F._, 4]));
    });

    it('equals object', async () => {
        assert.ok(F.equals({a:1}, {a: F._}));
        assert.ok(F.equals({a:1,b:2}, {a: F._, b:2}));
        assert.ok(F.equals({a:1,b:2}, {a: F._, b:F._}));
    });
});