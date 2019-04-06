"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test groupBy', () => {
    it('default', async () => {
        const a = [
            {type: "tea",
             price: 1},
            {type: "tea",
             price: 2},
            {type: "phone",
             price: 3},
            {type: "phone",
             price: 4},
        ];

        const r = await F.groupBy(e => e.type, a);
        assert.deepStrictEqual(r.get("tea"),[ { type: 'tea', price: 1 }, { type: 'tea', price: 2 } ]); 
        assert.deepStrictEqual(r.get("phone"),[ { type: 'phone', price: 3 }, { type: 'phone', price: 4 } ] );
    });

});