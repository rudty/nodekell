"use strict";
const F = require("../index");
const assert = require("assert");

describe('test doto', () => {
    it('object this', async () => {
        const r = await F.doto({ a: 1 }, function() {
            this.a = 3;
        });

        assert.deepStrictEqual(r, { a: 3 });
    });

    it('object arg', async () => {
        const r = await F.doto({ a: 1 }, (self) => {
            self.a = 3;
        });

        assert.deepStrictEqual(r, { a: 3 });
    });
});