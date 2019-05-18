"use strict";
const F = require("../index");
const assert = require("assert");

describe('test has', () => {
    it('object - properties', async () => {
        const r = F.has("length", "hello world");
        
        assert.ok(r);
    });

    it('array', async () => {
        const r = F.has("length", []);
        assert.ok(r);
    });

    it('objects', async () => {
        const r = F.has("hello", {hello:"world"});
        assert.ok(r);
    });

    it('Map', async () => {
        const r = F.has("hello", new Map([["hello","world"]]));
        assert.ok(r);
    });

    it('Set', async () => {
        const r = F.has("hello", new Set(["hello","world"]));
        assert.ok(r);
    });
    
    it('toString', async () => {
        const r = F.has("toString", {});
        assert.ok(r);
    });
});