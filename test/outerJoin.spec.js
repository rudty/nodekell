"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test join', () => {
    it('object', async () => {
        const a = [{id:1, name:"foo"}, {id: 2, name:"bar"}];
        const b = [{id:1, value:3}, {id: 2, value: 4}];
        const j = await F.outerJoin((v1,v2) => v1.id === v2.id , a, b);
        const r = await F.collect(j);

        assert.deepStrictEqual(r, [
            {id:1, name:"foo", value:3},
            {id:2, name:"bar", value:4}
        ]);
    });

    it('object a is 3, b is 2 ', async () => {
        const a = [{id:1, name:"foo"}, {id: 2, name:"bar"}, {id: 3, name:"hoo"}];
        const b = [{id:1, value:3}, {id: 2, value: 4}];
        const j = await F.outerJoin((v1,v2) => v1.id === v2.id, a, b);
        const r = await F.collect(j);

        assert.deepStrictEqual(r, [
            {id:1, name:"foo", value:3},
            {id:2, name:"bar", value:4},
            {id:3, name:"hoo"}
        ]);
    });


    it('map', async () => {
        const a = [new Map([["id",1], ["name","foo"]]), new Map([["id",2], ["name","bar"]])];
        const b = [new Map([["id",1], ["value",3]]), new Map([["id",2], ["value",4]])];
        const j = await F.outerJoin((v1,v2) => v1.get("id") === v2.get("id") , a, b);
        const r = await F.collect(j);

        assert.deepStrictEqual(r, [
            new Map([["id",1], ["name","foo"], ["value",3]]), 
            new Map([["id",2], ["name","bar"], ["value",4]]),
        ]);
    });

    
    it('one to many', async () => {
        const a = [{id:1, name:"foo"}, {id: 1, name:"bar"}, {id: 1, name:"hoo"}];
        const b = [{id:1, value:3}];
        const j = await F.outerJoin((v1,v2) => v1.id === v2.id , a, b);
        const r = await F.collect(j);

        assert.deepStrictEqual(r, [
            {id:1, name:"foo", value:3},
            {id:1, name:"bar", value:3},
            {id:1, name:"hoo", value:3},
        ]);
    });

    it('rightOuterJoin', async () => {
        const a = [{id:1, value:3}]; 
        const b = [{id:1, name:"foo"}, {id: 1, name:"bar"}, {id: 1, name:"hoo"}];
        const j = await F.rightOuterJoin((v1,v2) => v1.id === v2.id , a, b);
        const r = await F.collect(j);
        
        assert.deepStrictEqual(r, [
            {id:1, name:"foo", value:3},
            {id:1, name:"bar", value:3},
            {id:1, name:"hoo", value:3},
        ]);
    });
});