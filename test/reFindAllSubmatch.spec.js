"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test reFindAllSubmatch', () => {
    it('1', async () => {
        const r = F.reFindAllSubmatch(/H(\d)/g, "H1 H2");
        console.log(r);

    });
});