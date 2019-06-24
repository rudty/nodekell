"use strict";
const F = require("../index");
const assert = require("assert");

describe('test shuffle', () => {
    const shuffleAndCheck = async (a) => {
        let sameCount = 0;
        for (let i = 0; i < 100; ++i) {
            const orign = await F.collect(a());
            const r = await F.shuffle(a());
            
            if(F.equals(orign, r)) {
                sameCount += 1;
            }
        }
        assert.ok(sameCount !== 100);
    };

    it('array', async () => {
        const a = () => [1,2,3,4,5];
        await shuffleAndCheck(a);
    });

    it('iterator', async () => {
        const a = function*() {
            yield* [1,2,3,4,5];
        };
        await shuffleAndCheck(a);
    });

    it('async iterator', async () => {
        const a = async function*() {
            yield* [1,2,3,4,5];
        };
        await shuffleAndCheck(a);
    });

    it('customObject', async () => {
        const a = () => [{a:1},{a:2},{a:3},{a:4},{a:5}];
        await shuffleAndCheck(a);
    });
});