"use strict";
const F = require("../index");
const assert = require("assert");

describe('test sortBy', () => {
    it('number array', async () => {
        const a = [4, 3, 2, 5, 2, 7, 3, 4, 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, 13, 19, 32, 39, 31, 17, 19, 18];

        const r0 = F.sortBy(e => e, F.asc, a);
        const r1 = F.sortBy(e => e, F.desc)(a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
        );
    });

    it('promise number array', async () => {
        const a = [4, 3, 2, 5, 2, 7, 3, Promise.resolve(4), 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, Promise.resolve(13), 19, 32, 39, 31, 17, 19, 18];

        const r0 = F.sortBy(async e => e, F.asc, a);
        const r1 = F.sortBy(async e => e)(F.desc, a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
        );
    });

    it('object array', async () => {
        const a = [{ releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy(e => e.releaseDate, F.asc, a);
        const r1 = F.sortBy(e => e.releaseDate)(F.desc)(a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [{ releaseDate: 1958, language: 'lisp' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#' }],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [{ releaseDate: 2005, language: 'F#' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 1958, language: 'lisp' }],
        );
    });

    it('promise object array', async () => {
        const a = [Promise.resolve({ releaseDate: 1990, language: 'haskell' }), { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy(async e => e.releaseDate, F.asc, a);
        const r1 = F.sortBy(async e => e.releaseDate, F.desc, a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [{ releaseDate: 1958, language: 'lisp' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#' }],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [{ releaseDate: 2005, language: 'F#' }, { releaseDate: 1990, language: 'haskell' }, { releaseDate: 1958, language: 'lisp' }],
        );
    });

    it('deep object array', async () => {
        const a = [{ a: { b: { c: { d: 1 } } } }, { a: { b: { c: { d: 4 } } } }, { a: { b: { c: { d: 2 } } } }, { a: { b: { c: { d: 3 } } } }];

        const r0 = F.sortBy(e => e.a.b.c.d, F.asc, a);
        const r1 = F.sortBy(e => e.a.b.c.d, F.desc, a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [{ a: { b: { c: { d: 1 } } } }, { a: { b: { c: { d: 2 } } } }, { a: { b: { c: { d: 3 } } } }, { a: { b: { c: { d: 4 } } } }],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [{ a: { b: { c: { d: 4 } } } }, { a: { b: { c: { d: 3 } } } }, { a: { b: { c: { d: 2 } } } }, { a: { b: { c: { d: 1 } } } }],
        );
    });

    it('string', async () => {
        const a = 'The quick brown fox jumps over the lazy dog. 1234567890';

        const r0 = F.sortBy(e => e, F.asc, a);
        const r1 = F.sortBy(e => e, F.desc, a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'a', 'b', 'c', 'd', 'e', 'e', 'e', 'f', 'g', 'h', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'o', 'o', 'o', 'p', 'q', 'r', 'r', 's', 't', 'u', 'u', 'v', 'w', 'x', 'y', 'z'],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            ['z', 'y', 'x', 'w', 'v', 'u', 'u', 't', 's', 'r', 'r', 'q', 'p', 'o', 'o', 'o', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'h', 'g', 'f', 'e', 'e', 'e', 'd', 'c', 'b', 'a', 'T', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        );
    });

    it('map array', async () => {
        const a = [new Map([['year', 1998]]), new Map([['year', 2001]]), new Map([['year', 1954]])];

        const r0 = F.sortBy(e => e.get('year'), F.asc, a);
        const r1 = F.sortBy(e => e.get('year'), F.desc, a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [new Map([['year', 1954]]), new Map([['year', 1998]]), new Map([['year', 2001]])],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [new Map([['year', 2001]]), new Map([['year', 1998]]), new Map([['year', 1954]])],
        );
    });

    it('set order parameter to asc / desc string', async () => {
        const a = [4, 3, 2, 5, 2, 7, 3, 4, 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, 13, 19, 32, 39, 31, 17, 19, 18];

        const r0 = F.sortBy(e => e, 'asc', a);
        const r1 = F.sortBy(e => e, 'ASC', a);
        const r2 = F.sortBy(e => e, 'desc', a);
        const r3 = F.sortBy(e => e, 'DESC', a);

        assert.deepStrictEqual(
            await F.collect(r0),
            [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
        );
        assert.deepStrictEqual(
            await F.collect(r1),
            [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
        );
        assert.deepStrictEqual(
            await F.collect(r2),
            [39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
        );
        assert.deepStrictEqual(
            await F.collect(r3),
            [39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
        );
    });
});
