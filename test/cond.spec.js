"use strict";
const F = require("../index");
const assert = require("assert");

describe('test cond', () => {
    it('instanceof', async () => {
        const r = await F.cond("A", 
            e => e.constructor === String, "str",
            () => true, "TRUE"
        );

        assert.strictEqual(r, "str");
    });
});