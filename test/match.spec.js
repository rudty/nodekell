"use strict";
const F = require("../index.js");
const assert = require("assert");
    
describe('test match', () => {
    it('match', async () => {
        const value = 1;

        F.match(value,
            0, () => console.log("value is 0"),
            1, () => console.log("value is 1"),
            2, () => console.log("value is 2")
        );
    });
});