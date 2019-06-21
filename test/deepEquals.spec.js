"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test deepEquals', () => {
    it('number', () => {
        assert.ok(F.deepEquals(1, 1));
        assert.ok(!F.deepEquals(2, 1));
        assert.ok(F.deepEquals(1.0, 1));
        assert.ok(!F.deepEquals(2.0, -1.3));
    });

    it('bool', () => {
        assert.ok(true === F.deepEquals(false, false));
        assert.ok(true === F.deepEquals(true, true));
        assert.ok(false === F.deepEquals(true, false));
        assert.ok(false === F.deepEquals(false, true));
    });

    it('string', () => {
        const str1 = "Hello World!";
        const str1_1 = "Hello World!";
        const str2 = "Hello js";

        const str3 = new String(str1);
        const str3_1 = new String(str1_1);
        const str4 = new String(str2);
        assert.ok(true === F.deepEquals(str1, str1));
        assert.ok(true === F.deepEquals(str1, str1_1));
        assert.ok(false === F.deepEquals(str1, str2));
        assert.ok(true === F.deepEquals(str1, str3));

        assert.ok(true === F.deepEquals(str2, str4));
        assert.ok(true === F.deepEquals(str3, str3));
        assert.ok(true === F.deepEquals(str3, str3_1));
        assert.ok(false === F.deepEquals(str3, str4));
    });

    it('date', () => {
        const d1 = new Date("2019-06-21");
        const d2 = new Date("2019-06-21");

        const d3 = new Date("1989-08-07");

        assert.ok(true === F.deepEquals(d1, d1));
        assert.ok(true === F.deepEquals(d1, d2));
        assert.ok(false === F.deepEquals(d1, d3));
    });

    
});