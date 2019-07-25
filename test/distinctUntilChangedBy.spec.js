"use strict";
const F = require("../index");
const assert = require("assert");

describe('test distinctUntilChangedBy', () => {
    it('default', async () => {
        const a = [1,2,1,2,2,3];
        const r = F.distinctUntilChangedBy(F.identity, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,1,2,3]);
    });


    it('obj identity', async () => {
        const a = [{num:1}, {num:1}, {num:2}];
        const r = F.distinctUntilChangedBy(F.identity, a);
        const result = await F.collect(r);
        
        assert.deepStrictEqual(result, [{num:1}, {num:2}]);
    });

    it('obj .num', async () => {
        const a = [{num:1}, {num:1}, {num:2}];
        const r = F.distinctUntilChangedBy(e => e.num, a);
        const result = await F.collect(r);
        
        assert.deepStrictEqual(result, [{num:1}, {num:2}]);
    });

    it('NaN undefined null NaN', async () => {
        const a = [NaN, NaN, undefined, undefined, null, null, NaN];
        const r = F.distinctUntilChangedBy(F.identity, a);
        const result = await F.collect(r);
        
        assert.deepStrictEqual(result, [NaN, undefined, null, NaN]);
    });
});