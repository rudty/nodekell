"use strict";
const F = require("../index");
const assert = require("assert");

describe('test has', () => {
    it('string', async () => {
        const r = F.has("length", "hello world");
        
        assert.ok(r);
        
    });
});