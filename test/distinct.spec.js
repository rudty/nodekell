"use strict";
const F = require("../index");
const assert = require("assert");

describe('test distinct', () => {
    it('default', async () => {
        const a = [1,2,1,2,2,3];
        const r = F.distinct(a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3]);
    });


    it('obj', async () => {
        const a = [{num:1}, {num:1}, {num:2}];
        const r = F.distinctBy(e=>e.num, a);
        const result = await F.collect(r);

        assert.deepStrictEqual(result, [{num:1}, {num:2}]);
    });
});