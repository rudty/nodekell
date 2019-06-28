"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test equals', () => {
    it('number', () => {
        assert.ok(F.equals(1, 1));
        assert.ok(!F.equals(2, 1));
        assert.ok(F.equals(1.0, 1));
        assert.ok(!F.equals(2.0, -1.3));
    });

    it('bool', () => {
        assert.ok(true === F.equals(false, false));
        assert.ok(true === F.equals(true, true));
        assert.ok(false === F.equals(true, false));
        assert.ok(false === F.equals(false, true));
    });

    it('NaN', () => {
        assert.ok(true === F.equals(NaN, NaN));
    });

    it('string', () => {
        const str1 = "Hello World!";
        const str1_1 = "Hello World!";
        const str2 = "Hello js";

        const str3 = new String(str1);
        const str3_1 = new String(str1_1);
        const str4 = new String(str2);
        assert.ok(true === F.equals(str1, str1));
        assert.ok(true === F.equals(str1, str1_1));
        assert.ok(false === F.equals(str1, str2));
        assert.ok(true === F.equals(str1, str3));

        assert.ok(true === F.equals(str2, str4));
        assert.ok(true === F.equals(str3, str3));
        assert.ok(true === F.equals(str3, str3_1));
        assert.ok(false === F.equals(str3, str4));
    });

    it('date', () => {
        const d1 = new Date("2019-06-21");
        const d2 = new Date("2019-06-21");

        const d3 = new Date("1989-08-07");

        assert.ok(true === F.equals(d1, d1));
        assert.ok(true === F.equals(d1, d2));
        assert.ok(false === F.equals(d1, d3));
    });

    it('array', () =>{
        const empty_array = [];
        const arr12345 = [1,2,3,4,5];
        const arr12345_2 = [1,2,3,4,5];
        const arr123 = [1,2,3];
        const arr456 = [4,5,6];

        assert.ok(true === F.equals(arr12345, arr12345_2));
        assert.ok(false === F.equals(empty_array, arr12345));
        assert.ok(false === F.equals(arr123, arr456));
        assert.ok(false === F.equals(arr123, arr12345));
        assert.ok(false === F.equals(arr123, empty_array));

        assert.ok(false === F.equals(empty_array, "[]"));
        assert.ok(false === F.equals(empty_array, ""));
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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
    });

    it('int16 arr', () => {
        const arr1 = new Int16Array(new ArrayBuffer(8));
        const arr1_1 = new Int16Array(new ArrayBuffer(8));
        const arr2 = new Int16Array(new ArrayBuffer(8));

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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
    });

    it('uint8 arr', () => {
        const arr1 = new Uint8Array(new ArrayBuffer(4));
        const arr1_1 = new Uint8Array(new ArrayBuffer(4));
        const arr2 = new Uint8Array(new ArrayBuffer(4));

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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
    });

    it('uint8 clamped arr', () => {
        const arr1 = new Uint8ClampedArray(new ArrayBuffer(4));
        const arr1_1 = new Uint8ClampedArray(new ArrayBuffer(4));
        const arr2 = new Uint8ClampedArray(new ArrayBuffer(4));

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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
    });

    it('uint16 arr', () => {
        const arr1 = new Uint16Array(new ArrayBuffer(8));
        const arr1_1 = new Uint16Array(new ArrayBuffer(8));
        const arr2 = new Uint16Array(new ArrayBuffer(8));

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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
    });

    it('uint32 arr', () => {
        const arr1 = new Uint32Array(new ArrayBuffer(16));
        const arr1_1 = new Uint32Array(new ArrayBuffer(16));
        const arr2 = new Uint32Array(new ArrayBuffer(16));

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

        assert.ok(true === F.equals(arr1, arr1));
        assert.ok(true === F.equals(arr1, arr1_1));
        assert.ok(false === F.equals(arr1, arr2));
        assert.ok(false === F.equals(arr1, arr2));
    });

    it('regex', () => {
        const r1 = /hello world/;
        const r1_1 = /hello world/;
        const r2 = /Hello js/;
        const r3 = "Hello js";

        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
        assert.ok(false === F.equals(r1, r3));
    });

    it('Map<int, int>', () => {
        const r1 = new Map([[1,2],[3,4]]);
        const r1_1 = new Map([[1,2],[3,4]]);
        const r2 = new Map([[3,4],[5,6]]);
        const r3 = new Map([[1,2],[3,4],[5,6]]);

        const r4 = new Map([[5,undefined],[3,4]]);
        const r5 = new Map([[1,2],[3,4]]);

        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
        assert.ok(false === F.equals(r1, r3));

        assert.ok(false === F.equals(r4, r5));
    });

    it('Map<int, Map<int,int>>', () => {
        const r1 = new Map();
        r1.set(1, new Map([[1,2],[3,4]]));

        const r1_1 = new Map();
        r1_1.set(1, new Map([[1,2],[3,4]]));

        const r2 = new Map();
        r2.set(1, new Map([[3,9],[5,7]]));

        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
    });

    it('Set<int>', () => {
        const r1 = new Set([1,2,3,4]);
        const r1_1 = new Set([1,2,3,4]);
        const r2 = new Set([5,6,7,8]);
        
        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
    });

    it('obj{}', () =>{
        const r1 = {};
        const r1_1 = {};
        const r2 = {a:1};

        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
    });

    it('obj{a:1}', () =>{
        const r1 = {a:1};
        const r1_1 = {a:1};
        const r2 = {a:3};

        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
    });

    it('obj{a:{b:1}}', () =>{
        const r1 = {a:{b:1}};
        const r1_1 = {a:{b:1}};
        const r2 = {a:1};
        const r3 = {a:{b:2}};

        assert.ok(true === F.equals(r1, r1_1));
        assert.ok(false === F.equals(r1, r2));
        assert.ok(false === F.equals(r1, r3));
    });

    it('obj abba', () =>{
        const r1 = {a:1, b:2};
        const r1_1 = {b:2, a:1};
        assert.ok(true === F.equals(r1, r1_1));
    });

    it('custom object', () => {
        const q1 = new F._Queue();
        q1.add(1);
        q1.add(2);
        q1.add(3);

        const q1_1 = new F._Queue();
        q1_1.add(1);
        q1_1.add(2);
        q1_1.add(3); 

        const q2 = new F._Queue();
        q2.add(1);
        q2.add(2);
        q2.add(100); 

        assert.ok(true === F.equals(q1, q1_1));
        assert.ok(false === F.equals(q1, q2));
    });

    it('Promise.resolve(1)', () => {
        const r1 = Promise.resolve(1);
        const r1_1 = Promise.resolve(1);

        assert.ok(true === F.equals(r1, r1));
        assert.ok(false === F.equals(r1, r1_1));

    });
});