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

    it('array', () =>{
        const empty_array = [];
        const arr12345 = [1,2,3,4,5];
        const arr12345_2 = [1,2,3,4,5];
        const arr123 = [1,2,3];
        const arr456 = [4,5,6];

        assert.ok(true === F.deepEquals(arr12345, arr12345_2));
        assert.ok(false === F.deepEquals(empty_array, arr12345));
        assert.ok(false === F.deepEquals(arr123, arr456));
        assert.ok(false === F.deepEquals(arr123, arr12345));
        assert.ok(false === F.deepEquals(arr123, empty_array));

        assert.ok(false === F.deepEquals(empty_array, "[]"));
        assert.ok(false === F.deepEquals(empty_array, ""));
    });

    it('int8 arr', () => {
        const arr1 = new Int8Array(new ArrayBuffer(4));
        const arr1_1 = new Int8Array(new ArrayBuffer(4));
        const arr2 = new Int8Array(new ArrayBuffer(4));

        arr1[0] = 1;
        arr1[1] = 2;
        arr1[2] = 3;
        arr1[3] = 4;

        arr1_1[0] = 1;
        arr1_1[1] = 2;
        arr1_1[2] = 3;
        arr1_1[3] = 4;

        arr2[0] = 5;
        arr2[1] = 6;
        arr2[2] = 7;
        arr2[3] = 8;

        assert.ok(true === F.deepEquals(arr1, arr1));
        assert.ok(true === F.deepEquals(arr1, arr1_1));
        assert.ok(false === F.deepEquals(arr1, arr2));
        assert.ok(false === F.deepEquals(arr1, arr2));
    });

    it('int32 arr', () => {
        const arr1 = new Int32Array(new ArrayBuffer(16));
        const arr1_1 = new Int32Array(new ArrayBuffer(16));
        const arr2 = new Int32Array(new ArrayBuffer(16));

        arr1[0] = 1;
        arr1[1] = 2;
        arr1[2] = 3;
        arr1[3] = 4;

        arr1_1[0] = 1;
        arr1_1[1] = 2;
        arr1_1[2] = 3;
        arr1_1[3] = 4;

        arr2[0] = 5;
        arr2[1] = 6;
        arr2[2] = 7;
        arr2[3] = 8;

        assert.ok(true === F.deepEquals(arr1, arr1));
        assert.ok(true === F.deepEquals(arr1, arr1_1));
        assert.ok(false === F.deepEquals(arr1, arr2));
        assert.ok(false === F.deepEquals(arr1, arr2));
    });
});