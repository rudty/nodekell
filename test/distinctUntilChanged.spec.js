"use strict";
const F = require("../index");
const assert = require("assert");

describe('test distinctUntilChanged', () => {
    it('default', async () => {
        const a = [1,2,1,2,2,3];
        const r = F.distinctUntilChanged(a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,1,2,3]);
    });


    it('obj identity', async () => {
        const a = [{num:1}, {num:1}, {num:2}];
        const r = F.distinctUntilChanged(a);
        const result = await F.collect(r);
        
        assert.deepStrictEqual(result, [{num:1}, {num:2}]);
    });

    it('obj .num', async () => {
        const a = "Hello World";
        const r = F.distinctUntilChanged(a);
        const result = await F.collect(r);
        assert.deepStrictEqual("Helo World", result.join(''));
    });

    it('NaN undefined null NaN', async () => {
        const a = [NaN, NaN, undefined, undefined, null, null, NaN];
        const r = F.distinctUntilChanged(a);
        const result = await F.collect(r);
        
        assert.deepStrictEqual(result, [NaN, undefined, null, NaN]);
    });
});