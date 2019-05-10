"use strict";
const F = require("../index");
const assert = require("assert");

describe('test sortBy', () => {
    it('number array', async () => {
        const a = [4, 3, 2, 5, 2, 7, 3, 4, 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, 13, 19, 32, 39, 31, 17, 19, 18];

        const r0 = F.sortBy(e => e, 'asc', a);
        const r1 = F.sortBy(e => e, 'dsc', a);

        assert.deepStrictEqual([0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
            await F.collect(r0)
        );
        assert.deepStrictEqual([39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
            await F.collect(r1)
        );
    });

    it('promise number array', async () => {
        const a = [4, 3, 2, 5, 2, 7, 3, Promise.resolve(4), 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, Promise.resolve(13), 19, 32, 39, 31, 17, 19, 18];

        const r0 = F.sortBy(async e => e, 'asc', a);
        const r1 = F.sortBy(async e => e, 'dsc', a);

        assert.deepStrictEqual([0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
            await F.collect(r0)
        );
        assert.deepStrictEqual([39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
            await F.collect(r1)
        );
    });

    it('object array', async () => {
        const a = [{ releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy(e => e.releaseDate, 'asc', a);
        const r1 = F.sortBy(e => e.releaseDate, 'dsc', a);

        assert.deepStrictEqual(
            [{ releaseDate: 1958, language: 'lisp' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#' }],
            await F.collect(r0),
        );
        assert.deepStrictEqual(
            [{ releaseDate: 2005, language: 'F#' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 1958, language: 'lisp' }],
            await F.collect(r1),
        );
    });

    it('promise object array', async () => {
        const a = [Promise.resolve({ releaseDate: 1990, language: 'haskell' }), { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy(async e => e.releaseDate, 'asc', a);
        const r1 = F.sortBy(async e => e.releaseDate, 'dsc', a);

        assert.deepStrictEqual(
            [{ releaseDate: 1958, language: 'lisp' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#' }],
            await F.collect(r0),
        );
        assert.deepStrictEqual(
            [{ releaseDate: 2005, language: 'F#' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 1958, language: 'lisp' }],
            await F.collect(r1),
        );
    });

    it('string', async () => {
        const a = 'The quick brown fox jumps over the lazy dog';

        const r0 = F.sortBy(e => e, 'asc', a);
        const r1 = F.sortBy(e => e, 'dsc', a);

        assert.deepStrictEqual(
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T', 'a', 'b', 'c', 'd', 'e', 'e', 'e', 'f', 'g', 'h', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'o', 'o', 'o', 'p', 'q', 'r', 'r', 's', 't', 'u', 'u', 'v', 'w', 'x', 'y', 'z'],
            await F.collect(r0),
        );
        assert.deepStrictEqual(
            ['z', 'y', 'x', 'w', 'v', 'u', 'u', 't', 's', 'r', 'r', 'q', 'p', 'o', 'o', 'o', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'h', 'g', 'f', 'e', 'e', 'e', 'd', 'c', 'b', 'a', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            await F.collect(r1),
        );
    });

    /* it('with run', async () => {
        const a = [4, 3, 2, 5, 2, 7, 3, 4, 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, 13, 19, 32, 39, 31, 17, 19, 18];

        const r = await F.run(a, F.sortBy(async e => e));

        assert.deepStrictEqual([0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39], await F.collect(r));
    }); */
});
