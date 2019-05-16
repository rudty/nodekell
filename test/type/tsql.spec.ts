import * as F from '../../';

type Done = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: Done) => any): void;

describe('groupBy', () => {
    it('from Object Array', async () => {
        const a = [{ type: 'human', name: 'syrflover' }, { type: 'kinggod', name: 'gyungdal' }, { type: 'human', name: 'cenox' }];

        const r0 = await F.groupBy<string, { type: string; name: string; }>(e => e.type)(a); // $ExpectType Map<string, { type: string; name: string; }[]>
        const r1 = await F.groupBy(e => e.type, a); // $ExpectType Map<string, { type: string; name: string; }[]>
    });

    it('from Array', async () => {
        const a = ['h', 1, 'e', 2, 'l', 3, 'l', 4, 'o', 5];

        const r0 = await F.groupBy<'string' | 'number', string | number>(e => typeof e === 'string' ? 'string' : 'number')(a); // $ExpectType Map<"string" | "number", (string | number)[]>
        const r1 = await F.groupBy(e => typeof e === 'string' ? 'string' : 'number', a); // $ExpectType Map<"string" | "number", (string | number)[]>
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ type: 'human', name: 'syrflover' }), { type: 'kinggod', name: 'gyungdal' }, { type: 'human', name: 'cenox' }];

        const r0 = await F.groupBy<string, { type: string; name: string; }>(async e => e.type)(a); // $ExpectType Map<string, { type: string; name: string; }[]>
        const r1 = await F.groupBy(async e => e.type, a); // $ExpectType Map<string, { type: string; name: string; }[]>
    });

    it('from Promise Array', async () => {
        const a = ['h', 1, Promise.resolve('e'), 2, 'l', Promise.resolve(3), 'l', 4, 'o', 5];

        const r0 = await F.groupBy<'string' | 'number', string | number>(e => typeof e === 'string' ? 'string' : 'number')(a); // $ExpectType Map<"string" | "number", (string | number)[]>
        const r1 = await F.groupBy(async e => typeof e === 'string' ? 'string' : 'number', a); // $ExpectType Map<"string" | "number", (string | number)[]>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.groupBy<string, string>(e => e)(a); // $ExpectType Map<string, string[]>
        const r1 = await F.groupBy(e => e, a); // $ExpectType Map<string, string[]>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.groupBy<string, string | number>(e => (typeof e) as string)(a); // $ExpectType Map<string, (string | number)[]>
        const r1 = await F.groupBy(e => (typeof e) as string, a); // $ExpectType Map<string, (string | number)[]>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.groupBy<string, string | number | null>(e => (typeof e) as string)); // $ExpectType Map<string, (string | number | null)[]>
        const r1 = await F.run(a, F.groupBy(e => (typeof e) as string)); // $ExpectType Map<string, (string | number | null)[]>
    });
});

describe('concat', () => {
    it('from Array', async () => {
        const a = [1, 2, 3];
        const b = [3, 2, 1];

        const r0 = F.concat<number, number>(a)(b); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.concat(a, b); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Array And String', async () => {
        const a = [1, 2, 3];
        const b = 'helloworld';

        const r0 = F.concat<number, string>(a)(b); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.concat(a, b); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3];
        const b = [3, Promise.resolve(2), 1];

        const r0 = F.concat<number, number>(a)(b); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.concat(a, b); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello';
        const b = 'world';

        const r0 = F.concat<string, string>(a)(b); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.concat(a, b); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = ['a', Promise.resolve(1), Promise.resolve('b'), 2];
        const b = [null, Promise.resolve(null), Symbol('syr'), Promise.resolve(Symbol('flover'))];

        const r0 = F.concat<string | number, symbol | null>(a)(b); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
        const r1 = F.concat(a, b); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
    });

    it('with run', async () => {
        const a = ['a', Promise.resolve(1), Promise.resolve('b'), 2];
        const b = [null, Promise.resolve(null), Symbol('syr'), Promise.resolve(Symbol('flover'))];

        const r0 = await F.run(b, F.concat<string | number, symbol | null>(a)); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
        const r1 = await F.run(b, F.concat(a)); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
    });
});

describe('union', () => {
    it('from Array', async () => {
        const a = [1, 2, 3];
        const b = [3, 2, 1];

        const r0 = F.union<number, number>(a)(b); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.union(a, b); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Array And String', async () => {
        const a = [1, 2, 3];
        const b = 'helloworld';

        const r0 = F.union<number, string>(a)(b); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.union(a, b); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3];
        const b = [3, Promise.resolve(2), 1];

        const r0 = F.union<number, number>(a)(b); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.union(a, b); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello';
        const b = 'world';

        const r0 = F.union<string, string>(a)(b); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.union(a, b); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = ['a', Promise.resolve(1), Promise.resolve('b'), 2];
        const b = [null, Promise.resolve(null), Symbol('syr'), Promise.resolve(Symbol('flover'))];

        const r0 = F.union<string | number, symbol | null>(a)(b); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
        const r1 = F.union(a, b); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
    });

    it('with run', async () => {
        const a = ['a', Promise.resolve(1), Promise.resolve('b'), 2];
        const b = [null, Promise.resolve(null), Symbol('syr'), Promise.resolve(Symbol('flover'))];

        const r0 = await F.run(b, F.union<string | number, symbol | null>(a)); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
        const r1 = await F.run(b, F.union(a)); // $ExpectType AsyncIterableIterator<string | number | symbol | null>
    });
});

describe('sortBy', () => {
    it('from Normal Value', async () => {
        const a = [10, 5, 7, 1, 4, 3];

        const r0 = F.sortBy<number>(e => e)(F.asc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.sortBy<number>(e => e)(F.asc, a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.sortBy<number>(e => e, F.desc)(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.sortBy(e => e, F.desc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = F.sortBy<number>(async e => e)(F.asc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.sortBy<number>(async e => e)(F.asc, a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.sortBy<number>(async e => e, F.desc)(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.sortBy(async e => e, F.desc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Object Array', async () => {
        const a = [{ releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r1 = F.sortBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r2 = F.sortBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate, F.desc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r3 = F.sortBy(e => e.releaseDate, F.desc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ releaseDate: 1990, language: 'haskell' }), { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r1 = F.sortBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r2 = F.sortBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate, F.desc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r3 = F.sortBy(e => e.releaseDate, F.desc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
    });

    it('from String', async () => {
        const a = 'The quick brown fox jumps over the lazy dog';

        const r0 = F.sortBy<string>(async e => e)(F.asc)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.sortBy<string>(async e => e)(F.asc, a); // $ExpectType AsyncIterableIterator<string>
        const r2 = F.sortBy<string>(async e => e, F.desc)(a); // $ExpectType AsyncIterableIterator<string>
        const r3 = F.sortBy(async e => e, F.desc, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('set order parameter to string', async () => {
        const a = [10, 1, 21, 5, 3, 7, 5, 9, 3, 2, 11];

        const r0 = F.sortBy<number>(e => e)('DESC')(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.sortBy<number>(e => e)('asc', a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.sortBy<number>(e => e, 'desc')(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.sortBy(e => e, 'ASC', a); // $ExpectType AsyncIterableIterator<number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];
        const f = (a: number, b: number) => a > b ? 1 : a < b ? -1 : 0;

        const r0 = await F.run(a, F.sortBy(e => e, f)); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('orderBy', () => {
    it('from Normal Value', async () => {
        const a = [10, 5, 7, 1, 4, 3];

        const r0 = F.orderBy<number>(e => e)(F.asc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.orderBy<number>(e => e)(F.asc, a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.orderBy<number>(e => e, F.desc)(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.orderBy(e => e, F.desc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = F.orderBy<number>(async e => e)(F.asc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.orderBy<number>(async e => e)(F.asc, a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.orderBy<number>(async e => e, F.desc)(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.orderBy(async e => e, F.desc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Object Array', async () => {
        const a = [{ releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.orderBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r1 = F.orderBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r2 = F.orderBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate, F.desc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r3 = F.orderBy(e => e.releaseDate, F.desc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ releaseDate: 1990, language: 'haskell' }), { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.orderBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r1 = F.orderBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate)(F.asc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r2 = F.orderBy<{ releaseDate: number; language: string; }, number>(e => e.releaseDate, F.desc)(a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
        const r3 = F.orderBy(e => e.releaseDate, F.desc, a); // $ExpectType AsyncIterableIterator<{ releaseDate: number; language: string; }>
    });

    it('from String', async () => {
        const a = 'The quick brown fox jumps over the lazy dog';

        const r0 = F.orderBy<string>(async e => e)(F.asc)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.orderBy<string>(async e => e)(F.asc, a); // $ExpectType AsyncIterableIterator<string>
        const r2 = F.orderBy<string>(async e => e, F.desc)(a); // $ExpectType AsyncIterableIterator<string>
        const r3 = F.orderBy(async e => e, F.desc, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('set order parameter to string', async () => {
        const a = [10, 1, 21, 5, 3, 7, 5, 9, 3, 2, 11];

        const r0 = F.orderBy<number>(e => e)('DESC')(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.orderBy<number>(e => e)('asc', a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.orderBy<number>(e => e, 'desc')(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.orderBy(e => e, 'ASC', a); // $ExpectType AsyncIterableIterator<number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];
        const f = (a: number, b: number) => a > b ? 1 : a < b ? -1 : 0;

        const r0 = await F.run(a, F.sortBy(e => e, f)); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('sort', () => {
    it('from Normal Value', async () => {
        const a = [10, 5, 7, 1, 4, 3];

        const r0 = F.sort<number>(F.asc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.sort(F.asc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = F.sort<number | Promise<number>>(F.desc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.sort(F.desc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'The quick brown fox jumps over the lazy dog';

        const r0 = F.sort<string>(F.asc)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.sort(F.asc, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('use custom compare function', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];
        const f = (a: number, b: number) => a > b ? 1 : a < b ? -1 : 0;

        const r0 = F.sort<number | Promise<number>>(f)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.sort(f, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = await F.run(a, F.sort(F.asc)); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('order', () => {
    it('from Normal Value', async () => {
        const a = [10, 5, 7, 1, 4, 3];

        const r0 = F.order<number>(F.asc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.order(F.asc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = F.order<number | Promise<number>>(F.desc)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.order(F.desc, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'The quick brown fox jumps over the lazy dog';

        const r0 = F.order<string>(F.asc)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.order(F.asc, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('use custom compare function', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];
        const f = (a: number, b: number) => a > b ? 1 : a < b ? -1 : 0;

        const r0 = F.order<number | Promise<number>>(f)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.order(f, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = await F.run(a, F.order(F.asc)); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('innerJoin', () => {
    it('from Map Array', async () => {
        const a = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = F.innerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a)(b);
        const r1 = F.innerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a, b);
        const r2 = F.innerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true, a)(b);
        const r3 = F.innerJoin((a, b) => true, a, b);

        const rr0 = await F.collect(r0);
        rr0[0]; // $ExpectType Map<string, string | number>

        const rr1 = await F.collect(r1);
        rr1[0]; // $ExpectType Map<string, string | number>

        const rr2 = await F.collect(r2);
        rr2[0]; // $ExpectType Map<string, string | number>

        const rr3 = await F.collect(r3);
        rr3[0]; // $ExpectType Map<string, string | number>
    });

    it('from Object Array', async () => {
        const a = [{ id: 1, name: 'syrflover' }, { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, { id: 3, length: 12 }];

        const r0 = F.innerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a)(b);
        const r1 = F.innerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a, b);
        const r2 = F.innerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id, a)(b);
        const r3 = F.innerJoin((a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);
        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);
        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);
        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);
        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const r0 = F.innerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a)(b);
        const r1 = F.innerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a, b);
        const r2 = F.innerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id, a)(b);
        const r3 = F.innerJoin(async (a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);
        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);
        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);
        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);
        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string
    });

    it('with run', async () => {
        const a0 = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b0 = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const a1 = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b1 = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = await F.run(b0, F.innerJoin((a, b) => a.id === b.id, a0), F.collect);

        r0[0].id; // $ExpectType number
        r0[0].length; // $ExpectType number
        r0[0].name; // $ExpectType string

        const r1 = await F.run(b1, F.innerJoin((a, b) => true, a1), F.collect);

        r1[0]; // $ExpectType Map<string, string | number>
    });
});

describe('leftInnerJoin', () => {
    it('from Map Array', async () => {
        const a = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = F.leftInnerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a)(b);
        const r1 = F.leftInnerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a, b);
        const r2 = F.leftInnerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true, a)(b);
        const r3 = F.leftInnerJoin((a, b) => true, a, b);

        const rr0 = await F.collect(r0);
        rr0[0]; // $ExpectType Map<string, string | number>

        const rr1 = await F.collect(r1);
        rr1[0]; // $ExpectType Map<string, string | number>

        const rr2 = await F.collect(r2);
        rr2[0]; // $ExpectType Map<string, string | number>

        const rr3 = await F.collect(r3);
        rr3[0]; // $ExpectType Map<string, string | number>
    });

    it('from Object Array', async () => {
        const a = [{ id: 1, name: 'syrflover' }, { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, { id: 3, length: 12 }];

        const r0 = F.leftInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a)(b);
        const r1 = F.leftInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a, b);
        const r2 = F.leftInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id, a)(b);
        const r3 = F.leftInnerJoin((a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);
        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);
        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);
        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);
        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const r0 = F.leftInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a)(b);
        const r1 = F.leftInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a, b);
        const r2 = F.leftInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id, a)(b);
        const r3 = F.leftInnerJoin(async (a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);
        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);
        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);
        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);
        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string
    });

    it('with run', async () => {
        const a0 = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b0 = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const a1 = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b1 = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = await F.run(b0, F.leftInnerJoin((a, b) => a.id === b.id, a0), F.collect);

        r0[0].id; // $ExpectType number
        r0[0].length; // $ExpectType number
        r0[0].name; // $ExpectType string

        const r1 = await F.run(b1, F.leftInnerJoin((a, b) => true, a1), F.collect);

        r1[0]; // $ExpectType Map<string, string | number>
    });
});

describe('rightInnerJoin', () => {
    it('from Map Array', async () => {
        const a = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = F.rightInnerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a)(b);
        const r1 = F.rightInnerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a, b);
        const r2 = F.rightInnerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true, a)(b);
        const r3 = F.rightInnerJoin((a, b) => true, a, b);

        const rr0 = await F.collect(r0);
        rr0[0]; // $ExpectType Map<string, string | number>

        const rr1 = await F.collect(r1);
        rr1[0]; // $ExpectType Map<string, string | number>

        const rr2 = await F.collect(r2);
        rr2[0]; // $ExpectType Map<string, string | number>

        const rr3 = await F.collect(r3);
        rr3[0]; // $ExpectType Map<string, string | number>
    });

    it('from Object Array', async () => {
        const a = [{ id: 1, name: 'syrflover' }, { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, { id: 3, length: 12 }];

        const r0 = F.rightInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a)(b);
        const r1 = F.rightInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a, b);
        const r2 = F.rightInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id, a)(b);
        const r3 = F.rightInnerJoin((a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);
        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);
        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);
        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);
        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const r0 = F.rightInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a)(b);
        const r1 = F.rightInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a, b);
        const r2 = F.rightInnerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id, a)(b);
        const r3 = F.rightInnerJoin(async (a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);
        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);
        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);
        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);
        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string
    });

    it('with run', async () => {
        const a0 = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b0 = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const a1 = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b1 = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = await F.run(b0, F.rightInnerJoin((a, b) => a.id === b.id, a0), F.collect);

        r0[0].id; // $ExpectType number
        r0[0].length; // $ExpectType number
        r0[0].name; // $ExpectType string

        const r1 = await F.run(b1, F.rightInnerJoin((a, b) => true, a1), F.collect);

        r1[0]; // $ExpectType Map<string, string | number>
    });
});

describe('outerJoin', () => {
    it('from Map Array', async () => {
        const a = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = F.outerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a)(b);
        const r1 = F.outerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a, b);
        const r2 = F.outerJoin<Map<string, string | number>, Map<string, number>>((a, b) => true, a)(b);
        const r3 = F.outerJoin((a, b) => true, a, b);

        const rr0 = await F.collect(r0);
        rr0[0]; // $ExpectType Map<string, string | number>

        const rr1 = await F.collect(r1);
        rr1[0]; // $ExpectType Map<string, string | number>

        const rr2 = await F.collect(r2);
        rr2[0]; // $ExpectType Map<string, string | number>

        const rr3 = await F.collect(r3);
        rr3[0]; // $ExpectType Map<string, string | number>
    });

    it('from Object Array', async () => {
        const a = [{ id: 1, name: 'syrflover' }, { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, { id: 3, length: 12 }];

        const r0 = F.outerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a)(b);
        const r1 = F.outerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a, b);
        const r2 = F.outerJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id, a)(b);
        const r3 = F.outerJoin((a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);

        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number | undefined
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);

        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number | undefined
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);

        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number | undefined
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);

        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number | undefined
        rr3[0].name; // $ExpectType string
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const r0 = F.outerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a)(b);
        const r1 = F.outerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a, b);
        const r2 = F.outerJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id, a)(b);
        const r3 = F.outerJoin(async (a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);

        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number | undefined
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);

        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number | undefined
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);

        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number | undefined
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);

        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number | undefined
        rr3[0].name; // $ExpectType string
    });

    it('with run', async () => {
        const a0 = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b0 = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const a1 = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b1 = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = await F.run(b0, F.outerJoin((a, b) => a.id === b.id, a0), F.collect);

        r0[0].id; // $ExpectType number
        r0[0].length; // $ExpectType number | undefined
        r0[0].name; // $ExpectType string

        const r1 = await F.run(b1, F.outerJoin((a, b) => true, a1), F.collect);

        r1[0]; // $ExpectType Map<string, string | number>
    });
});

describe('leftOuterJoin', () => {
    it('from Map Array', async () => {
        const a = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = F.leftOuterJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a)(b);
        const r1 = F.leftOuterJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a, b);
        const r2 = F.leftOuterJoin<Map<string, string | number>, Map<string, number>>((a, b) => true, a)(b);
        const r3 = F.leftOuterJoin((a, b) => true, a, b);

        const rr0 = await F.collect(r0);
        rr0[0]; // $ExpectType Map<string, string | number>

        const rr1 = await F.collect(r1);
        rr1[0]; // $ExpectType Map<string, string | number>

        const rr2 = await F.collect(r2);
        rr2[0]; // $ExpectType Map<string, string | number>

        const rr3 = await F.collect(r3);
        rr3[0]; // $ExpectType Map<string, string | number>
    });

    it('from Object Array', async () => {
        const a = [{ id: 1, name: 'syrflover' }, { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, { id: 3, length: 12 }];

        const r0 = F.leftOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a)(b);
        const r1 = F.leftOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a, b);
        const r2 = F.leftOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id, a)(b);
        const r3 = F.leftOuterJoin((a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);

        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number | undefined
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);

        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number | undefined
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);

        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number | undefined
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);

        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number | undefined
        rr3[0].name; // $ExpectType string
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const r0 = F.leftOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a)(b);
        const r1 = F.leftOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a, b);
        const r2 = F.leftOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id, a)(b);
        const r3 = F.leftOuterJoin(async (a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);

        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number | undefined
        rr0[0].name; // $ExpectType string

        const rr1 = await F.collect(r1);

        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number | undefined
        rr1[0].name; // $ExpectType string

        const rr2 = await F.collect(r2);

        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number | undefined
        rr2[0].name; // $ExpectType string

        const rr3 = await F.collect(r3);

        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number | undefined
        rr3[0].name; // $ExpectType string
    });

    it('with run', async () => {
        const a0 = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b0 = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const a1 = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b1 = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = await F.run(b0, F.leftOuterJoin((a, b) => a.id === b.id, a0), F.collect);

        r0[0].id; // $ExpectType number
        r0[0].length; // $ExpectType number | undefined
        r0[0].name; // $ExpectType string

        const r1 = await F.run(b1, F.leftOuterJoin((a, b) => true, a1), F.collect);

        r1[0]; // $ExpectType Map<string, string | number>
    });
});

describe('rightOuterJoin', () => {
    it('from Map Array', async () => {
        const a = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = F.rightOuterJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a)(b);
        const r1 = F.rightOuterJoin<Map<string, string | number>, Map<string, number>>((a, b) => true)(a, b);
        const r2 = F.rightOuterJoin<Map<string, string | number>, Map<string, number>>((a, b) => true, a)(b);
        const r3 = F.rightOuterJoin((a, b) => true, a, b);

        const rr0 = await F.collect(r0);
        rr0[0]; // $ExpectType Map<string, string | number>

        const rr1 = await F.collect(r1);
        rr1[0]; // $ExpectType Map<string, string | number>

        const rr2 = await F.collect(r2);
        rr2[0]; // $ExpectType Map<string, string | number>

        const rr3 = await F.collect(r3);
        rr3[0]; // $ExpectType Map<string, string | number>
    });

    it('from Object Array', async () => {
        const a = [{ id: 1, name: 'syrflover' }, { id: 2, name: 'GyungDal' }];
        const b = [{ id: 1, length: 8 }, { id: 3, length: 12 }];

        const r0 = F.rightOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a)(b);
        const r1 = F.rightOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id)(a, b);
        const r2 = F.rightOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>((a, b) => a.id === b.id, a)(b);
        const r3 = F.rightOuterJoin((a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);

        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string | undefined

        const rr1 = await F.collect(r1);

        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string | undefined

        const rr2 = await F.collect(r2);

        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string | undefined

        const rr3 = await F.collect(r3);

        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string | undefined
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }];
        const b = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const r0 = F.rightOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a)(b);
        const r1 = F.rightOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id)(a, b);
        const r2 = F.rightOuterJoin<{ id: number; name: string; }, { id: number; length: number; }>(async (a, b) => a.id === b.id, a)(b);
        const r3 = F.rightOuterJoin(async (a, b) => a.id === b.id, a, b);

        const rr0 = await F.collect(r0);

        rr0[0].id; // $ExpectType number
        rr0[0].length; // $ExpectType number
        rr0[0].name; // $ExpectType string | undefined

        const rr1 = await F.collect(r1);

        rr1[0].id; // $ExpectType number
        rr1[0].length; // $ExpectType number
        rr1[0].name; // $ExpectType string | undefined

        const rr2 = await F.collect(r2);

        rr2[0].id; // $ExpectType number
        rr2[0].length; // $ExpectType number
        rr2[0].name; // $ExpectType string | undefined

        const rr3 = await F.collect(r3);

        rr3[0].id; // $ExpectType number
        rr3[0].length; // $ExpectType number
        rr3[0].name; // $ExpectType string | undefined
    });

    it('with run', async () => {
        const a0 = [Promise.resolve({ id: 1, name: 'syrflover' }), { id: 2, name: 'GyungDal' }, { id: 3, name: 'SacredPigeon' }];
        const b0 = [{ id: 1, length: 8 }, Promise.resolve({ id: 3, length: 12 })];

        const a1 = [
            // new Map([['id', 1], ['name', 'CenoX']]) as Map<string, string | number>,
            // new Map([['id', 2], ['name', 'SacredPigeon']]) as Map<string, string | number>,
            new Map() as Map<string, string | number>,
            new Map() as Map<string, string | number>,
        ];
        const b1 = [
            new Map([['id', 1], ['length', 3]]),
            new Map([['id', 2], ['length', 4]]),
        ];

        const r0 = await F.run(b0, F.rightOuterJoin((a, b) => a.id === b.id, a0), F.collect);

        r0[0].id; // $ExpectType number
        r0[0].length; // $ExpectType number
        r0[0].name; // $ExpectType string | undefined

        const r1 = await F.run(b1, F.rightOuterJoin((a, b) => true, a1), F.collect);

        r1[0]; // $ExpectType Map<string, string | number>
    });
});
