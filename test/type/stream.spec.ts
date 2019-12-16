import * as F from '../../';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

describe('firstOrGet', () => {
    it('from Normal Value And Supply Normal Value', async () => {
        const t = [1, 2, 3, 4, 5];
        const y = 'y' as string;

        const r0 = await F.firstOrGet<number, string>(y)(t); // $ExpectType string | number
        const r1 = await F.firstOrGet(y, t); // $ExpectType string | number
    });

    it('from Normal Value And Supply Normal Function', async () => {
        const t = [1, 2, 3, 4, 5];
        const y1 = () => () => 'y';
        const y2 = () => async () => 'y';

        const r0 = await F.firstOrGet<number, string>(y1())(t); // $ExpectType string | number
        const r1 = await F.firstOrGet(y2(), t); // $ExpectType string | number
    });

    it('from Promise Value And Supply Promise Value', async () => {
        const t = [Promise.resolve(1), 2, 3, 4, 5];
        const y = Promise.resolve('y');

        const r0 = await F.firstOrGet<number, string>(y)(t); // $ExpectType string | number
        const r1 = await F.firstOrGet(y, t); // $ExpectType string | number
    });

    it('from Promise Value And Supply Promise Wrapped Function', async () => {
        const t = [Promise.resolve(1), 2, 3, 4, 5];
        const y1 = () => () => 'y';
        const y2 = () => async () => 'y';

        const r0 = await F.firstOrGet<number, string>(Promise.resolve(y1()))(t); // $ExpectType string | number
        const r1 = await F.firstOrGet(Promise.resolve(y2()), t); // $ExpectType string | number
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];
        const y = F.first([9, Promise.resolve('y'), 'y', Promise.resolve(9)]);

        const r0 = await F.firstOrGet<string | number, string | number>(y)(a); // $ExpectType string | number
        const r1 = await F.firstOrGet(y, a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];
        const y0 = F.first([9, Promise.resolve('y'), 'y', Promise.resolve(9)]);
        const y1 = () => () => 'y';
        const y2 = () => async () => 'y';

        const ar0 = await F.run(a, F.firstOrGet<string | number | null, string | number>(y0)); // $ExpectType string | number | null
        const ar1 = await F.run(a, F.firstOrGet<string | number | null, () => string>(y1)); // $ExpectType string | number | (() => string) | null
        const ar2 = await F.run(a, F.firstOrGet<string | number | null, () => Promise<string>>(y2)); // $ExpectType string | number | (() => Promise<string>) | null

        const br0 = await F.run(a, F.firstOrGet(y0)); // $ExpectType string | number | null
        const br1 = await F.run(a, F.firstOrGet(y1)); // $ExpectType string | number | (() => string) | null
        const br2 = await F.run(a, F.firstOrGet(y2)); // $ExpectType string | number | (() => Promise<string>) | null
    });
});

describe('emptyThen', () => {
    it('from Normal Value', async () => {
        const testSupplyFunc = (i: string[]) => () => i;

        const t = [] as number[];
        const y = ['he', 'll', 'o'];

        const ar0 = F.emptyThen<number, string>(y)(t); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.emptyThen<number, string>(testSupplyFunc(y))(t); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.emptyThen(y, t); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.emptyThen(testSupplyFunc(y), t); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Promise Value', async () => {
        const testSupplyFunc = (i: (string | Promise<string>)[]) => async () => i;

        const t = [] as number[];
        const y = [Promise.resolve('he'), 'll', 'o'];

        const ar0 = F.emptyThen<number, string>(y)(t); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.emptyThen<number, string>(testSupplyFunc(y))(t); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.emptyThen(Promise.resolve(y), t); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.emptyThen(testSupplyFunc(y), t); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Promsie Wrapped Supply', async () => {
        const testSupplyFunc = (i: string[]) => () => i;

        const t = [] as number[];
        const y = ['he', 'll', 'o'];

        const ar0 = F.emptyThen<number, string>(Promise.resolve(y))(t); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.emptyThen<number, string>(Promise.resolve(testSupplyFunc(y)))(t); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.emptyThen(Promise.resolve(y), t); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.emptyThen(Promise.resolve(testSupplyFunc(y)), t); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from String', async () => {
        const testSupplyFunc = (i: string) => () => i;

        const t = [] as number[];
        const y = 'hello world';

        const ar0 = F.emptyThen<number, string>(y)(t); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.emptyThen<number, string>(testSupplyFunc(y))(t); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.emptyThen(Promise.resolve(y), t); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.emptyThen(testSupplyFunc(y), t); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Normal / Promise Union', async () => {
        const testSupplyFunc = (i: (string | number | Promise<string> | Promise<number>)[]) => () => i;

        const t = [] as (string | Promise<string> | number | Promise<number>)[];
        const y = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const ar0 = F.emptyThen<string | number, string | number>(y)(t); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.emptyThen<string | number, string | number>(testSupplyFunc(y))(t); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.emptyThen(Promise.resolve(y), t); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.emptyThen(testSupplyFunc(y), t); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const testSupplyFunc = (i: (string | number | Promise<string> | Promise<number> | null)[]) => () => i;

        const t = [] as (string | Promise<string> | number | Promise<number>)[];
        const y = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const ar0 = await F.run(t, F.emptyThen<string | number, string | number | null>(y)); // $ExpectType AsyncIterableIterator<string | number | null>
        const ar1 = await F.run(t, F.emptyThen<string | number, string | number | null>(testSupplyFunc(y))); // $ExpectType AsyncIterableIterator<string | number | null>
        const ar2 = await F.run(t, F.emptyThen<string | number, string | number | null>(Promise.resolve(testSupplyFunc(y)))); // $ExpectType AsyncIterableIterator<string | number | null>

        const br0 = await F.run(t, F.emptyThen(y)); // $ExpectType AsyncIterableIterator<string | number | null>
        const br1 = await F.run(t, F.emptyThen(testSupplyFunc(y))); // $ExpectType AsyncIterableIterator<string | number | null>
        const br2 = await F.run(t, F.emptyThen(Promise.resolve(testSupplyFunc(y)))); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('collect', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.collect(a); // $ExpectType number[]
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = await F.collect(a); // $ExpectType number[]
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.collect(a); // $ExpectType string[]
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.collect(a); // $ExpectType (string | number)[]
    });

    it('with run', async () => {
        const a = [1, 2, 3, Promise.resolve(4), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(F.seq(a), F.collect); // $ExpectType (string | number | null)[]
    });
});

describe('collectMap', () => {
    it('from Normal Value', async () => {
        const a = [['a', 0], ['b', 1], ['c', 2]];

        const r0 = await F.collectMap(a); // $ExpectType Map<string | number, string | number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(['a', 0]), ['b', 1], ['c', 2]];

        // const r0 = await F.collectMap(a as (Promise<[string, number]> | [string, number])[])
        const r0 = await F.collectMap(a); // $ExpectType Map<string | number, string | number>
    });

    it('from Normal Value With Type Assertion', async () => {
        const a = [['a', 0], ['b', 1], ['c', 2]];

        const r0 = await F.collectMap(a as [string, number][]); // $ExpectType Map<string, number>
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(['a', 0]), ['b', 1], [2, 'c'], Promise.resolve([3, 'd'])];

        const r0 = await F.collectMap(a); // $ExpectType Map<string | number, string | number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(['a', 0]), ['b', 1], [2, 'c'], Promise.resolve([3, 'd'])];

        const r0 = await F.run(a, F.collectMap); // $ExpectType Map<string | number, string | number>
    });
});

describe('collectSet', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.collectSet(a); // $ExpectType Set<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.collectSet(a); // $ExpectType Set<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.collectSet(a); // $ExpectType Set<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.collectSet(a); // $ExpectType Set<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.run(a, F.collectSet); // $ExpectType Set<string | number>
    });
});

describe('collectObject', () => {
    it('from Normal Value', async () => {
        const a = [['a', 0], ['b', 1], ['c', 2]];

        const r0 = await F.collectObject(a); // $ExpectType any
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(['a', 0]), ['b', 1], ['c', 2]];

        const r0 = await F.collectObject(a); // $ExpectType any
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(['a', 0]), ['b', 1], [2, 'c'], Promise.resolve([3, 'd'])];

        const r0 = await F.collectObject(a); // $ExpectType any
    });

    it('with run', async () => {
        const a = [Promise.resolve(['a', 0]), ['b', 1], [2, 'c'], Promise.resolve([3, 'd'])];

        const r0 = await F.run(a, F.collectObject); // $ExpectType any
    });
});

describe('forEach', () => {
    it('from Normal Value', async () => {
        const a = [0, 1, 2, 3, 4, 5];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];

        const r0 = await F.forEach<number, string>(e => b[e])(a); // $ExpectType string[]
        const r1 = await F.forEach(e => b[e], a); // $ExpectType string[]
    });

    it('from Promise Value', async () => {
        const a = [0, 1, Promise.resolve(2), 3, Promise.resolve(4), 5];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];

        const r0 = await F.forEach<number, string>(e => b[e])(a); // $ExpectType string[]
        const r1 = await F.forEach(e => b[e], a); // $ExpectType string[]
    });

    it('from String', async () => {
        const a = 'fcbaadefbab';
        const b: { [k: string]: number; } = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };

        const r0 = await F.forEach<string, number>(e => b[e])(a); // $ExpectType number[]
        const r1 = await F.forEach(e => b[e], a); // $ExpectType number[]
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b'];
        const b: { [k: string]: string | number; } = { a: 0, b: 0, 1: 'b', 2: 'c' };

        const r0 = await F.forEach<string | number, string | number>(e => b[e])(a); // $ExpectType (string | number)[]
        const r1 = await F.forEach(e => b[e], a); // $ExpectType (string | number)[]
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b', null];
        const b: { [k: string]: string | number; } = { a: 0, b: 0, 1: 'b', 2: 'c' };

        const r0 = await F.run(a, F.forEach<string | number | null, string | number | null>(e => e)); // $ExpectType (string | number | null)[]
        const r1 = await F.run(a, F.forEach(e => e)); // $ExpectType (string | number | null)[]
    });
});

describe('forEachIndexed', () => {
    it('from Normal Value', async () => {
        const a = [0, 1, 2, 3, 4, 5];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];
        const c: number[] = [];
        const r0 = await F.forEachIndexed<number, string>((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType number
            c.push(i);
            return b[e];
        })(a);
        r0; // $ExpectType string[]

        const r1 = await F.forEachIndexed((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType number
            c.push(i);
            return b[e];
        }, a);
        r1; // $ExpectType string[]
    });

    it('from Promise Value', async () => {
        const a = [0, 1, Promise.resolve(2), 3, Promise.resolve(4), 5];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];
        const c: number[] = [];
        const r0 = await F.forEachIndexed<number, string>((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType number
            c.push(i);
            return b[e];
        })(a);
        r0; // $ExpectType string[]
        const r1 = await F.forEachIndexed((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType number
            c.push(i);
            return b[e];
        }, a);
        r1; // $ExpectType string[]
    });

    it('from String', async () => {
        const a = 'fcbaadefbab';
        const b: { [k: string]: number; } = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };
        const c: number[] = [];
        const r0 = await F.forEachIndexed<string, number>((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType string
            c.push(i);
            return b[e];
        })(a);
        r0; // $ExpectType number[]
        const r1 = await F.forEachIndexed((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType string
            c.push(i);
            return b[e];
        }, a);
        r1; // $ExpectType number[]
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b'];
        const b: { [k: string]: string | number; } = { a: 0, b: 0, 1: 'b', 2: 'c' };

        const r0 = await F.forEachIndexed<string | number, string | number>((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType string | number
            return b[e];
        })(a);
        r0; // $ExpectType (string | number)[]
        const r1 = await F.forEachIndexed((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType string | number
            return b[e];
        }, a);
        r1; // $ExpectType (string | number)[]
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b', null];
        const b: { [k: string]: string | number; } = { a: 0, b: 0, 1: 'b', 2: 'c' };

        const r0 = await F.run(a, F.forEachIndexed<string | number | null, string | number | null>((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType string | number | null
            return e;
        }));
        r0; // $ExpectType (string | number | null)[]
        const r1 = await F.run(a, F.forEachIndexed((i, e) => {
            i; // $ExpectType number
            e; // $ExpectType string | number | null
            return e;
        }));
        r1; // $ExpectType (string | number | null)[]
    });
});

describe('distinctBy', () => {
    it('from Normal Value', async () => {
        const a = [{ id: 1 }, { id: 1 }, { id: 2 }];

        const r0 = F.distinctBy<{ id: number }>(e => e.id)(a); // $ExpectType AsyncIterableIterator<{ id: number; }>
        const r1 = F.distinctBy(e => e.id, a); // $ExpectType AsyncIterableIterator<{ id: number; }>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve({ id: 1 }), Promise.resolve({ id: 1 }), { id: 2 }];

        const r0 = F.distinctBy<{ id: number; }>(async e => e.id)(a); // $ExpectType AsyncIterableIterator<{ id: number; }>
        const r1 = F.distinctBy(async e => e.id, a); // $ExpectType AsyncIterableIterator<{ id: number; }>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.distinctBy<string>(e => e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.distinctBy(e => e, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve('a'), 1, Promise.resolve(1), 'a'];

        const r0 = F.distinctBy<string | number>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.distinctBy(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [Promise.resolve('a'), 1, Promise.resolve(1), 'a', null];

        const r0 = await F.run(a, F.distinctBy<string | number | null>(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.distinctBy(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('distinct', () => {
    it('from Normal Value', async () => {
        const a = [1, 1, 1, 2, 3];

        const r0 = F.distinct(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), Promise.resolve(1), 1, Promise.resolve(2), 3];

        const r0 = F.distinct(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.distinct(a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(1), 'a', Promise.resolve('a')];

        const r0 = F.distinct(a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(1), 'a', Promise.resolve('a')];

        const r0 = await F.run(a, F.distinct); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('some', () => {
    it('from Normal Value', async () => {
        const a = [0, 1, 2, 3, 4];

        const r0 = await F.some<number>(e => e < 4)(a); // $ExpectType boolean
        const r1 = await F.some(e => e > 4, a); // $ExpectType boolean
    });

    it('from Promise Value', async () => {
        const a = [0, Promise.resolve(1), 2, 3, Promise.resolve(4)];

        const r0 = await F.some<number>(e => e < 4)(a); // $ExpectType boolean
        const r1 = await F.some(e => e > 4, a); // $ExpectType boolean
    });

    it('from String', async () => {
        const a = 'aaaaaba';

        const r0 = await F.some<string>(e => e.includes('b'))(a); // $ExpectType boolean
        const r1 = await F.some(e => !e.includes('b'), a); // $ExpectType boolean
    });

    it('from Normal / Promise Union', async () => {
        const a = ['a', Promise.resolve('b'), Promise.resolve('c'), Promise.resolve(1), 2, 1];

        const r0 = await F.some<string | number>(e => e === 'a')(a); // $ExpectType boolean
        const r1 = await F.some(e => e === 'a', a); // $ExpectType boolean
    });

    it('with run', async () => {
        const a = ['a', Promise.resolve('b'), Promise.resolve('c'), Promise.resolve(1), 2, 1, null];

        const r0 = await F.run(a, F.some<string | number | null>(e => { // $ExpectType boolean
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
        const r1 = await F.run(a, F.some(e => { // $ExpectType boolean
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
    });
});

describe('every', () => {
    it('from Normal Value', async () => {
        const a = [0, 1, 2, 3, 4];

        const r0 = await F.every<number>(e => e < 4)(a); // $ExpectType boolean
        const r1 = await F.every(e => e > 4, a); // $ExpectType boolean
    });

    it('from Promise Value', async () => {
        const a = [0, Promise.resolve(1), 2, 3, Promise.resolve(4)];

        const r0 = await F.every<number>(e => e < 4)(a); // $ExpectType boolean
        const r1 = await F.every(e => e > 4, a); // $ExpectType boolean
    });

    it('from String', async () => {
        const a = 'aaaaaaa';

        const r0 = await F.every<string>(e => e.includes('b'))(a); // $ExpectType boolean
        const r1 = await F.every(e => e.includes('a'), a); // $ExpectType boolean
    });

    it('from Normal / Promise Union', async () => {
        const a = ['a', Promise.resolve('b'), Promise.resolve('c'), Promise.resolve(1), 2, 1];

        const r0 = await F.every<string | number>(e => e === 'a')(a); // $ExpectType boolean
        const r1 = await F.every(e => e === 'a', a); // $ExpectType boolean
    });

    it('with run', async () => {
        const a = ['a', Promise.resolve('b'), Promise.resolve('c'), Promise.resolve(1), 2, 1, null];

        const r0 = await F.run(a, F.every<string | number | null>(e => { // $ExpectType boolean
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
        const r1 = await F.run(a, F.every(e => { // $ExpectType boolean
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
    });
});

describe('maxBy', () => {
    it('from Normal Value', async () => {
        const a = [{ id: 1 }, { id: 5 }, { id: 2 }, { id: 4 }, { id: 3 }];

        const r0 = await F.maxBy<{ id: number; }>(e => e.id)(a); // $ExpectType { id: number; }
        const r1 = await F.maxBy(e => e.id, a); // $ExpectType { id: number; }

        r0.id; // $ExpectType number
        r1.id; // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve({ id: 1 }), { id: 5 }, { id: 2 }, { id: 4 }, { id: 3 }];

        const r0 = await F.maxBy<{ id: number; }>(e => e.id)(a); // $ExpectType { id: number; }
        const r1 = await F.maxBy(async e => e.id, a); // $ExpectType { id: number; }

        r0.id; // $ExpectType number
        r1.id; // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.maxBy<string>(e => e)(a); // $ExpectType string
        const r1 = await F.maxBy(e => e, a); // $ExpectType string
    });

    it('with run', async () => {
        const a = [Promise.resolve({ id: 1 }), { id: 5 }, { id: 2 }, { id: 4 }, { id: 3 }];

        const r0 = await F.run(a, F.maxBy((e: { id: number; }) => e.id)); // $ExpectType { id: number; }
    });
});

describe('minBy', () => {
    it('from Normal Value', async () => {
        const a = [{ id: 1 }, { id: 5 }, { id: 2 }, { id: 4 }, { id: 3 }];

        const r0 = await F.minBy<{ id: number; }>(e => e.id)(a); // $ExpectType { id: number; }
        const r1 = await F.minBy(e => e.id, a); // $ExpectType { id: number; }

        r0.id; // $ExpectType number
        r1.id; // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve({ id: 1 }), { id: 5 }, { id: 2 }, { id: 4 }, { id: 3 }];

        const r0 = await F.minBy<{ id: number; }>(e => e.id)(a); // $ExpectType { id: number; }
        const r1 = await F.minBy(async e => e.id, a); // $ExpectType { id: number; }

        r0.id; // $ExpectType number
        r1.id; // $ExpectType number
    });

    it('with run', async () => {
        const a = [Promise.resolve({ id: 1 }), { id: 5 }, { id: 2 }, { id: 4 }, { id: 3 }];

        const r0 = await F.minBy(e => e.id, a); // $ExpectType { id: number; }
        const r1 = await F.run(a, F.minBy((e: { id: number; }) => e.id)); // $ExpectType { id: number; }
    });
});

describe('count', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8];

        const r0 = await F.count(a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.count(a); // $ExpectType number
	});

	it('from Map / Set', async () => {
		const a = new Map([['a', 0], ['b', 1]]);
		const b = new Set([1, 2, 3, 4, 5]);

		const r0 = await F.count(a); // $ExpectType number
		const r1 = await F.count(b); // $ExpectType number
	});

	it('from Object', async () => {
		const a = { id: 1, age: 17 };
		const b = { id: 2, age: 23, size: 2 };

		const r0 = await F.count(a); // $ExpectType number
		const r1 = await F.count(b); // $ExpectType number
    });
});

describe('sum', () => {
    it('from Normal Number', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.sum(a); // $ExpectType number
    });

    it('from Promise Number', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = await F.sum(a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'helloworld';

        const r0 = await F.sum(a); // $ExpectType string
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = await F.run(a, F.sum); // $ExpectType number
    });
});

describe('max', () => {
    it('from Normal Number', async () => {
        const a = [1, 5, 2, 4, 3];

        const r0 = await F.max(a); // $ExpectType number
    });

    it('from Promise Number', async () => {
        const a = [1, Promise.resolve(5), 2, 4, Promise.resolve(3)];

        const r0 = await F.max(a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'helloworld';

        const r0 = await F.max(a); // $ExpectType string
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(5), 2, 4, Promise.resolve(3)];

        const r0 = await F.run(a, F.max); // $ExpectType number
    });
});

describe('min', () => {
    it('from Normal Number', async () => {
        const a = [1, 5, 2, 4, 3];

        const r0 = await F.min(a); // $ExpectType number
    });

    it('from Promise Number', async () => {
        const a = [1, Promise.resolve(5), 4, 3, 2];

        const r0 = await F.min(a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'helloworld';

        const r0 = await F.min(a); // $ExpectType string
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(5), 4, 3, 2];

        const r0 = await F.run(a, F.min); // $ExpectType number
    });
});

describe('average', () => {
    it('from Normal Number', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.average(a); // $ExpectType number
    });

    it('from Promise Number', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = await F.average(a); // $ExpectType number
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = await F.run(a, F.average); // $ExpectType number
    });
});

describe('splitBy', () => {
    it('from Number', async () => {
        // const a = [1,2,3,4,5];
        const a = 1;

        const ar0 = F.splitBy<number, number>(e => [e, 0])(a); // $ExpectType AsyncIterableIterator<number>
        const ar1 = F.splitBy(e => [0, e], a); // $ExpectType AsyncIterableIterator<number>

        const br0 = F.splitBy<number, number>(async e => [e, 0])(a); // $ExpectType AsyncIterableIterator<number>
        const br1 = F.splitBy(async e => [0, e], a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const ar0 = F.splitBy<string, string>(e => e.split(' '))(a); // $ExpectType AsyncIterableIterator<string>
        const ar1 = F.splitBy(e => e.split(' '), a); // $ExpectType AsyncIterableIterator<string>

        const br0 = F.splitBy<string, string>(async e => e.split(' '))(a); // $ExpectType AsyncIterableIterator<string>
        const br1 = F.splitBy(async e => e.split(' '), a); // $ExpectType AsyncIterableIterator<string>
    });

    it('with run', async () => {
        const a = 'hello world';

        const r0 = await F.run(a, F.splitBy(e => e.split(' '))); // $ExpectType AsyncIterableIterator<string>
    });
});

describe('then', () => {
    it('from Normal Value', () => {
        const gfn0 = function *(iter: Iterable<number>) {
            for (const e of iter) {
                yield e;
            }
        };

        const a = [1, 2, 3, 4, 5];

        // const ar0 = F.then(gfn0)(a).next().value; // $E/xpectType number
        // const ar1 = F.then(gfn0, a).next().value; // $ExpectType number

        const br0 = F.then<number[], number[]>(iter => iter)(a); // $ExpectType number[]
        const br1 = F.then(iter => iter, a); // $ExpectType number[]
    });

    it('from Normal Value With Return Void', () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.then<number[], void>(() => F.fnothing())(a); // $ExpectType void
        const r1 = F.then(() => F.fnothing(), a); // $ExpectType void
    });

    it('from Promise Value', async () => {
        const gfn0 = async function *(iter: AsyncIterable<number | Promise<number>>) {
            for await (const e of iter) {
                yield await e;
            }
        };

        const a = [1, 2, Promise.resolve(3), 4, 5];

        const ar0 = F.then(gfn0)(F.seq(a)); // $ExpectType AsyncIterableIterator<number>
        const ar1 = F.then(gfn0, F.seq(a)); // $ExpectType AsyncIterableIterator<number>

        const br0 = await F.then<AsyncIterableIterator<number>, Promise<AsyncIterableIterator<number>>>(async iter => iter)(F.seq(a)); // $ExpectType AsyncIterableIterator<number>
        const br1 = await F.then(async iter => iter, F.seq(a)); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value With Return Promise Void', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.then<(number | Promise<number>)[], Promise<void>>(async () => F.fnothing())(a); // $ExpectType void
        const r1 = await F.then(async () => F.fnothing(), a); // $ExpectType void
    });

    it('with run', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.run(a, F.then(F.map(e => e + 1))); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('tap', () => {
    it('from Normal Value', async () => {
        const a = 1;

        const r0 = await F.tap<number>(F.fnothing)(a); // $ExpectType number
        const r1 = await F.tap(F.fnothing, a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = Promise.resolve('a');

        const r0 = await F.tap<Promise<string>>(F.fnothing)(a); // $ExpectType string
        const r1 = await F.tap(F.fnothing, a); // $ExpectType string
    });

    it('from Normal Array', async () => {
        const a = [1, 2, 3, 4];

        const r0 = await F.tap<number[]>(F.fnothing)(a); // $ExpectType number[]
        const r1 = await F.tap(F.fnothing, a); // $ExpectType number[]
    });

    it('from Promise / Normal Union Array', async () => {
        const a = [Promise.resolve(1), 2, Promise.resolve('a'), 'b'];

        const r0 = await F.tap<(string | number | Promise<number> | Promise<string>)[]>(F.fnothing)(a); // $ExpectType (string | number | Promise<number> | Promise<string>)[]
        const r1 = await F.tap(F.fnothing, a); // $ExpectType (string | number | Promise<number> | Promise<string>)[]
    });

    it('with run', async () => {
        const a = F.range(Infinity);

        const r0 = await F.run(a, F.map(F.inc), F.take(20), F.tap(F.fnothing)); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('buffer', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.buffer<number>(1)(a); // $ExpectType AsyncIterableIterator<number[]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<number[]>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = F.buffer<number>(1)(a); // $ExpectType AsyncIterableIterator<number[]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<number[]>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.buffer<string>(1)(a); // $ExpectType AsyncIterableIterator<string[]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<string[]>
    });

    it('from Normal / Promsie Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.buffer<string | number>(1)(a); // $ExpectType AsyncIterableIterator<(string | number)[]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<(string | number)[]>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.run(a, F.buffer<string | number>(2)); // $ExpectType AsyncIterableIterator<(string | number)[]>
        const r1 = await F.run(a, F.buffer(2)); // $ExpectType AsyncIterableIterator<(string | number)[]>
    });
});

describe('find', () => {
    it('from Normal Array', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const r0 = await F.find<number>(e => e === 12)(a); // $ExpectType number | undefined
        const r1 = await F.find(e => e === 6, a); // $ExpectType number | undefined
    });

    it('from Promise Array', async () => {
        const a = [1, 2, 3, Promise.resolve(4), 5, 6, Promise.resolve(7), 8, 9, 10];

        const r0 = await F.find<number | Promise<number>>(e => e === 12)(a); // $ExpectType number | undefined
        const r1 = await F.find(e => e === 6, a); // $ExpectType number | undefined
    });

    it('from Object Array', async () => {
        const a = [{ name: 'Ice' }, { name: 'NORA' }, { name: 'ginkiha' }, { name: 'Rabpit' }];

        const r0 = await F.find<{ name: string }>(e => e.name === 'xi')(a); // $ExpectType { name: string; } | undefined
        const r1 = await F.find(e => e.name === 'Rabpit', a); // $ExpectType { name: string; } | undefined
    });

    it('from Promise / Normal Union Value', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), { name: 'xi' }];

        const r0 = await F.find<F.PFlat<typeof a>>(e => e === 12)(a); // $ExpectType string | number | { name: string; } | undefined
        const r1 = await F.find(e => e === 6, a); // $ExpectType string | number | { name: string; } | undefined
    });

    it('with run', async () => {
        const a = [{ name: 'Ice' }, Promise.resolve({ name: 'NORA' }), { name: 'ginkiha' }, { name: 'Rabpit' }, 1, 'a'];

        const r0 = await F.run(a, F.find<string | number | { name: string; }>(e => new Object(e).hasOwnProperty('name') ? (e as any).name === 'NORA' : e === 1)); // $ExpectType string | number | { name: string; } | undefined
        const r1 = await F.run(a, F.find(e => new Object(e).hasOwnProperty('name') ? (e as any).name === 'NORA' : e === 1)); // $ExpectType string | number | { name: string; } | { name: string; } | undefined
    });
});

describe('findLast', () => {
    it('from Normal Array', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const r0 = await F.findLast<number>(e => e === 12)(a); // $ExpectType number | undefined
        const r1 = await F.findLast(e => e === 6, a); // $ExpectType number | undefined
    });

    it('from Promise Array', async () => {
        const a = [1, 2, 3, Promise.resolve(4), 5, 6, Promise.resolve(7), 8, 9, 10];

        const r0 = await F.findLast<number | Promise<number>>(e => e === 12)(a); // $ExpectType number | undefined
        const r1 = await F.findLast(e => e === 6, a); // $ExpectType number | undefined
    });

    it('from Object Array', async () => {
        const a = [{ name: 'Ice' }, { name: 'NORA' }, { name: 'ginkiha' }, { name: 'Rabpit' }];

        const r0 = await F.findLast<{ name: string }>(e => e.name === 'xi')(a); // $ExpectType { name: string; } | undefined
        const r1 = await F.findLast(e => e.name === 'Rabpit', a); // $ExpectType { name: string; } | undefined
    });

    it('from Promise / Normal Union Value', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), { name: 'xi' }];

        const r0 = await F.findLast<F.PFlat<typeof a>>(e => e === 12)(a); // $ExpectType string | number | { name: string; } | undefined
        const r1 = await F.findLast(e => e === 6, a); // $ExpectType string | number | { name: string; } | undefined
    });

    it('with run', async () => {
        const a = [{ name: 'Ice' }, Promise.resolve({ name: 'NORA' }), { name: 'ginkiha' }, { name: 'Rabpit' }, 1, 'a'];

        const r0 = await F.run(a, F.find<string | number | { name: string; }>(e => new Object(e).hasOwnProperty('name') ? (e as any).name === 'NORA' : e === 1)); // $ExpectType string | number | { name: string; } | undefined
        const r1 = await F.run(a, F.findLast(e => new Object(e).hasOwnProperty('name') ? (e as any).name === 'NORA' : e === 1)); // $ExpectType string | number | { name: string; } | { name: string; } | undefined
    });
});

describe('peek', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.peek<number>(async e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.peek(async e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = F.peek<number>(async e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.peek(async e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.peek<string>(e => e === 'l')(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.peek(e => e === 'l', a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.peek<string | number>(e => e === 'a')(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.peek(e => e === 'a', a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.peek<string | number | null>(e => { // $ExpectType AsyncIterableIterator<string | number | null>
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
        const r1 = await F.run(a, F.peek(e => { // $ExpectType AsyncIterableIterator<string | number | null>
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
    });
});

describe('collectNative', () => {
    it('with run', async () => {
        const arr = ["1", "2", "3"];
        const r1 = F.run(arr,
            F.map(parseInt),
            F.collectInt32);
        r1; // $ExpectType Promise<Int32Array>
    });
    it('collectint8', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectInt8(arr); // $ExpectType Promise<Int8Array>

        const arr2 = [1, 2, 3];
        const r2 = F.collectInt8(arr2); // $ExpectType Promise<Int8Array>
    });

    it('collectint16', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectInt16(arr); // $ExpectType Promise<Int16Array>

        const arr2 = [1, 2, 3];
        const r2 = F.collectInt16(arr2); // $ExpectType Promise<Int16Array>
    });

    it('collectint32', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectInt32(arr); // $ExpectType Promise<Int32Array>

        const arr2 = [1, 2, 3];
        const r2 = F.collectInt32(arr2); // $ExpectType Promise<Int32Array>
    });

    it('collectuint8', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectUint8(arr); // $ExpectType Promise<Uint8Array>

        const arr2 = [1, 2, 3];
        const r2 = F.collectUint8(arr2); // $ExpectType Promise<Uint8Array>
    });

    it('collectuint16', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectUint16(arr); // $ExpectType Promise<Uint16Array>

        const arr2 = [1, 2, 3];
        const r2 = F.collectUint16(arr2); // $ExpectType Promise<Uint16Array>
    });

    it('collectuint32', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectUint32(arr); // $ExpectType Promise<Uint32Array>

        const arr2 = [1, 2, 3];
        const r2 = F.collectUint32(arr2); // $ExpectType Promise<Uint32Array>
    });

    it('collectuint8clamped', async () => {
        const arr = [1, Promise.resolve(2)];
        const r1 = F.collectUint8Clamped(arr); // $ExpectType Promise<Uint8ClampedArray>

        const arr2 = [1, 2, 3];
        const r2 = F.collectUint8Clamped(arr2); // $ExpectType Promise<Uint8ClampedArray>
    });
});

describe('frequencies', () => {
    it('from Object Array', async () => {
        const a = [{ type: 'human', name: 'syrflover' }, { type: 'kinggod', name: 'gyungdal' }, { type: 'human', name: 'cenox' }];

        const r1 = await F.frequencies(a); // $ExpectType Map<{ type: string; name: string; }, number>
    });

    it('from Array', async () => {
        const a = ['h', 1, 'e', 2, 'l', 3, 'l', 4, 'o', 5];

        const r1 = await F.frequencies(a); // $ExpectType Map<string | number, number>
    });

    it('from Promise Array', async () => {
        const a = ['h', 1, Promise.resolve('e'), 2, 'l', Promise.resolve(3), 'l', 4, 'o', 5];

        const r1 = await F.frequencies(a); // $ExpectType Map<string | number, number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r1 = await F.frequencies(a); // $ExpectType Map<string, number>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r1 = await F.frequencies(a); // $ExpectType Map<string | number, number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r1 = await F.run(a, F.frequencies); // $ExpectType Map<string | number | null, number>
    });
});

describe('frequenciesBy', () => {
    it('from Object Array', async () => {
        const a = [{ type: 'human', name: 'syrflover' }, { type: 'kinggod', name: 'gyungdal' }, { type: 'human', name: 'cenox' }];

        const r1 = await F.frequenciesBy(F.identity, a); // $ExpectType Map<{ type: string; name: string; }, number>
    });

    it('from Object Array2', async () => {
        const a = [{ type: 'human', name: 'syrflover' }, { type: 'kinggod', name: 'gyungdal' }, { type: 'human', name: 'cenox' }];

        const r1 = await F.frequenciesBy(e => e.type, a); // $ExpectType Map<string, number>
    });

    it('from Object Array3', async () => {
        const a = [{ type: 'human', name: 'syrflover' }, { type: 'kinggod', name: 'gyungdal' }, { type: 'human', name: 'cenox' }];

        const r1 = await F.frequenciesBy(e => e.name, a); // $ExpectType Map<string, number>
    });

    it('from Object Array4', async () => {
        const a = [{ type: 'human', value: 1 }, { type: 'kinggod', value: 'gyungdal' }, { type: 'human', value: () => {} }];

        const r1 = await F.frequenciesBy(e => e.value, a); // $ExpectType Map<string | number | (() => void), number>
    });

    it('from Object Array5', async () => {
        const a = [{ type: 'human', value: 1 }, { type: 'kinggod', value: 'gyungdal' }, { type: 'human' }];

        const r1 = await F.frequenciesBy(e => e.value, a); // $ExpectType Map<string | number | undefined, number>
    });

    it('from Object Array6', async () => {
        const a = [{ type: 'human', value: 1 }, { type: 'kinggod', value: Promise.resolve('gyungdal') }, { type: 'human' }];

        const r1 = await F.frequenciesBy(e => e.value, a); // $ExpectType Map<string | number | undefined, number>
    });

    it('from Array', async () => {
        const a = ['h', 1, 'e', 2, 'l', 3, 'l', 4, 'o', 5];

        const r1 = await F.frequenciesBy(F.identity, a); // $ExpectType Map<string | number, number>
    });

    it('from Promise Array', async () => {
        const a = ['h', 1, Promise.resolve('e'), 2, 'l', Promise.resolve(3), 'l', 4, 'o', 5];

        const r1 = await F.frequenciesBy(F.identity, a); // $ExpectType Map<string | number, number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r1 = await F.frequenciesBy(F.identity, a); // $ExpectType Map<string, number>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r1 = await F.frequenciesBy(F.identity, a); // $ExpectType Map<string | number, number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r1 = await F.run(a, F.frequenciesBy(F.identity)); // $ExpectType Map<string | number | null, number>
    });
});

describe('distinctUntilChangedBy', () => {
    it('from Normal Value', async () => {
        const a = [{ id: 1 }, { id: 1 }, { id: 2 }];

        const r0 = F.distinctUntilChangedBy<{ id: number }>(e => e.id)(a); // $ExpectType AsyncIterableIterator<{ id: number; }>
        const r1 = F.distinctUntilChangedBy(e => e.id, a); // $ExpectType AsyncIterableIterator<{ id: number; }>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve({ id: 1 }), Promise.resolve({ id: 1 }), { id: 2 }];

        const r0 = F.distinctUntilChangedBy<{ id: number; }>(async e => e.id)(a); // $ExpectType AsyncIterableIterator<{ id: number; }>
        const r1 = F.distinctUntilChangedBy(async e => e.id, a); // $ExpectType AsyncIterableIterator<{ id: number; }>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.distinctUntilChangedBy<string>(e => e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.distinctUntilChangedBy(e => e, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve('a'), 1, Promise.resolve(1), 'a'];

        const r0 = F.distinctUntilChangedBy<string | number>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.distinctUntilChangedBy(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [Promise.resolve('a'), 1, Promise.resolve(1), 'a', null];

        const r0 = await F.run(a, F.distinctUntilChangedBy<string | number | null>(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.distinctUntilChangedBy(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('distinctUntilChanged', () => {
    it('from Normal Value', async () => {
        const a = [1, 1, 1, 2, 3];

        const r0 = F.distinctUntilChanged(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), Promise.resolve(1), 1, Promise.resolve(2), 3];

        const r0 = F.distinctUntilChanged(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.distinctUntilChanged(a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(1), 'a', Promise.resolve('a')];

        const r0 = F.distinctUntilChanged(a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(1), 'a', Promise.resolve('a')];

        const r0 = await F.run(a, F.distinctUntilChanged); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('associateBy', () => {
    const getFirstKey = <K>(m: Map<K, any>): K => {
        return (Array.from(m.keys()))[0];
    };

    const getFirstValue = <V>(m: Map<any, V>): V => {
        return (Array.from(m.values()))[0];
    };

    it('number', async () => {
        const a = [1, 1, 1, 2, 3];

        const r0 = F.associateBy(n => {
            return n * n;
        }, a);
        const m = await r0;
        const k0 = getFirstKey(m); // $ExpectType number
        const v0 = getFirstValue(m); // $ExpectType number
    });

    it('string', async () => {
        const a = "hello world";

        const r0 = F.associateBy(n => {
            return n + "a";
        }, a);
        const m = await r0;
        const k0 = getFirstKey(m); // $ExpectType string
        const v0 = getFirstValue(m); // $ExpectType string
    });

    it('string[]', async () => {
        const a = "hello world";

        const r0 = F.associateBy(n => {
            return [n, n];
        }, a);
        const m = await r0;
        const k0 = getFirstKey(m); // $ExpectType string
        const v0 = getFirstValue(m); // $ExpectType string
    });

    it('(number, string)[]', async () => {
        const a = "hello world";

        const r0 = F.associateBy(n => {
            return [0, n];
        }, a);
        const m0 = await r0;
        const k0 = getFirstKey(m0); // $ExpectType string | number
        const v0 = getFirstValue(m0); // $ExpectType string | number

        const r1 = F.associateBy(n => {
            return [0, n] as [number, string];
        }, a);
        const m1 = await r1;
        const k1 = getFirstKey(m1); // $ExpectType number
        const v1 = getFirstValue(m1); // $ExpectType string
    });

    it('Promise<number>', async () => {
        const a = [1, 1, 1, 2, 3];

        const r0 = F.associateBy(async n => {
            return n * n;
        }, a);
        const m0 = await r0;
        const k0 = getFirstKey(m0); // $ExpectType number
        const v0 = getFirstValue(m0); // $ExpectType number
    });

    it('Promise<(number, string)[]>', async () => {
        const a = "hello world";

        const r0 = F.associateBy(async n => {
            return [0, n];
        }, a);
        const m0 = await r0;
        const k0 = getFirstKey(m0); // $ExpectType string | number
        const v0 = getFirstValue(m0); // $ExpectType string | number

        const r1 = F.associateBy(async n => {
            return [0, n] as [number, string];
        }, a);
        const m1 = await r1;
        const k1 = getFirstKey(m1); // $ExpectType number
        const v1 = getFirstValue(m1); // $ExpectType string

        const arr1 = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];
        const r2 = F.associateBy(e => e, arr1);
        const m2 = await r2;
        const k2 = getFirstKey(m2); // $ExpectType string | number | null
        const v2 = getFirstValue(m2); // $ExpectType string | number | null
    });

    it('comment example', async () => {
        const arr0 = [1, 2, 3];
        const m0 = await F.associateBy(e => [e, e * 2], arr0);
        const k0 = getFirstKey(m0); // $ExpectType number
        const v0 = getFirstValue(m0); // $ExpectType number

        const arr1 = [1, 2, 3];
        const m1 = await F.associateBy(e => e + 1, arr1);
        const k1 = getFirstKey(m1); // $ExpectType number
        const v1 = getFirstValue(m1); // $ExpectType number
    });

    it('with run', async () => {
        const arr0 = [1, 2, 3];
        const m0 = await F.run(arr0, F.associateBy(e => e));
        const k0 = getFirstKey(m0); // $ExpectType number
        const v0 = getFirstValue(m0); // $ExpectType number

        const arr1 = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];
        const m1 = await F.run(arr1, F.associateBy(e => e));
        const k1 = getFirstKey(m1); // $ExpectType string | number | null
        const v1 = getFirstValue(m1); // $ExpectType string | number | null

        const m2 = await F.run(arr1, F.associateBy(e => ["a", e] as [string, typeof e]));
        const k2 = getFirstKey(m2); // $ExpectType string
        const v2 = getFirstValue(m2); // $ExpectType string | number | null
    });
});

describe('reFind', () => {
    it('regex 1', async () => {
        const r0 = F.reFind(/a/, "HelloWorld"); // $ExpectType string
        const r1 = F.reFind(/a/g, "HelloWorld"); // $ExpectType string
        const r2 = F.reFind(/a/u, "HelloWorld"); // $ExpectType string
    });

    it('regex 2', async () => {
        const r0 = F.reFind(/a/)("HelloWorld"); // $ExpectType string
        const r1 = F.reFind(/a/)("HelloWorld"); // $ExpectType string
        const r2 = F.reFind(/a/)("HelloWorld"); // $ExpectType string
    });

    it('string 1', async () => {
        const r0 = F.reFind("a", "HelloWorld"); // $ExpectType string
    });

    it('string 2', async () => {
        const r0 = F.reFind("a")("HelloWorld"); // $ExpectType string
    });
});

describe('reFindSubmatch', () => {
    it('regex 1', async () => {
        const r0 = F.reFindSubmatch(/a/, "HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
        const r1 = F.reFindSubmatch(/a/g, "HelloWorld"); // $ExpectType string[]
        const r2 = F.reFindSubmatch(/a/u, "HelloWorld"); // $ExpectType string[]
    });

    it('regex 2', async () => {
        const r0 = F.reFindSubmatch(/a/)("HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
        const r1 = F.reFindSubmatch(/a/)("HelloWorld"); // $ExpectType string[]
        const r2 = F.reFindSubmatch(/a/)("HelloWorld"); // $ExpectType string[]
    });

    it('string 1', async () => {
        const r0 = F.reFindSubmatch("a", "HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
    });

    it('string 2', async () => {
        const r0 = F.reFindSubmatch("a")("HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
    });
});

describe('reFindAll', () => {
    it('regex 1', async () => {
        const r0 = F.reFindAll(/a/, "HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
        const r1 = F.reFindAll(/a/g, "HelloWorld"); // $ExpectType string[]
        const r2 = F.reFindAll(/a/u, "HelloWorld"); // $ExpectType string[]
    });

    it('regex 2', async () => {
        const r0 = F.reFindAll(/a/)("HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
        const r1 = F.reFindAll(/a/)("HelloWorld"); // $ExpectType string[]
        const r2 = F.reFindAll(/a/)("HelloWorld"); // $ExpectType string[]
    });

    it('string 1', async () => {
        const r0 = F.reFindAll("a", "HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
    });

    it('string 2', async () => {
        const r0 = F.reFindAll("a")("HelloWorld"); // $ExpectType string[]
        r0[0]; // $ExpectType string
    });
});

describe('reFindAllSubmatch', () => {
    it('regex 1', async () => {
        const r0 = F.reFindAllSubmatch(/e/, "HelloWorld"); // $ExpectType string[][]
        r0[0]; // $ExpectType string[]
        r0[0][0]; // $ExpectType string
        const r1 = F.reFindAllSubmatch(/e/g, "HelloWorld"); // $ExpectType string[][]
        const r2 = F.reFindAllSubmatch(/e/u, "HelloWorld"); // $ExpectType string[][]
    });

    it('regex 2', async () => {
        const r0 = F.reFindAllSubmatch(/e/)("HelloWorld"); // $ExpectType string[][]
        r0[0]; // $ExpectType string[]
        r0[0][0]; // $ExpectType string
        const r1 = F.reFindAllSubmatch(/e/)("HelloWorld"); // $ExpectType string[][]
        const r2 = F.reFindAllSubmatch(/e/)("HelloWorld"); // $ExpectType string[][]
    });

    it('string 1', async () => {
        const r0 = F.reFindAllSubmatch("e", "HelloWorld"); // $ExpectType string[][]
        r0[0]; // $ExpectType string[]
        r0[0][0]; // $ExpectType string
    });

    it('string 2', async () => {
        const r0 = F.reFindAllSubmatch("e")("HelloWorld"); // $ExpectType string[][]
        r0[0]; // $ExpectType string[]
        r0[0][0]; // $ExpectType string
    });
});

describe('sortBy', () => {
    it('from Normal Value', async () => {
        const a = [10, 5, 7, 1, 4, 3];

        const r0 = await F.sortBy<number>(F.asc)(a); // $ExpectType ArrayLike<number>
        const r1 = await F.sortBy(F.asc, a); // $ExpectType ArrayLike<number>
        const r2 = await F.sortBy<number>(F.desc)(a); // $ExpectType ArrayLike<number>
        const r3 = await F.sortBy(F.asc, a); // $ExpectType ArrayLike<number>
        const r4 = await F.sortBy((a: number, b: number) => a - b)(a); // $ExpectType ArrayLike<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];

        const r0 = F.sortBy<number>(F.asc)(a); // $ExpectType Promise<ArrayLike<number>>
        const r1 = F.sortBy(F.asc, a); // $ExpectType Promise<ArrayLike<number>>
        const r2 = F.sortBy<number>(F.desc)(a); // $ExpectType Promise<ArrayLike<number>>
        const r3 = F.sortBy(F.desc, a); // $ExpectType Promise<ArrayLike<number>>
    });

    it('from Object Array', async () => {
        const a = [{ releaseDate: 1990, language: 'haskell' }, { releaseDate: 2005, language: 'F#' }, { releaseDate: 1958, language: 'lisp' }];
        const r0 = F.sortBy<{ releaseDate: number; language: string; }>((a, b) => a.releaseDate - b.releaseDate)(a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
        const r1 = F.sortBy<{ releaseDate: number; language: string; }>((a, b) => a.releaseDate - b.releaseDate)(a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
        const r2 = F.sortBy<{ releaseDate: number; language: string; }>((a, b) => a.releaseDate - b.releaseDate)(a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
        const r3 = F.sortBy((a, b) => a.releaseDate - b.releaseDate, a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
    });

    it('from Promise Object Array', async () => {
        const a = [Promise.resolve({ releaseDate: 1990, language: 'haskell' }), { releaseDate: 2005, language: 'F#'}, { releaseDate: 1958, language: 'lisp'}];

        const r0 = F.sortBy<{ releaseDate: number; language: string; }>((a, b) => a.releaseDate - b.releaseDate)(a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
        const r1 = F.sortBy<{ releaseDate: number; language: string; }>((a, b) => a.releaseDate - b.releaseDate)(a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
        const r2 = F.sortBy<{ releaseDate: number; language: string; }>((a, b) => a.releaseDate - b.releaseDate)(a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
        const r3 = F.sortBy((a, b) => a.releaseDate - b.releaseDate, a); // $ExpectType Promise<ArrayLike<{ releaseDate: number; language: string; }>>
    });

    it('from String', async () => {
        const a = 'The quick brown fox jumps over the lazy dog';

        const r0 = F.sortBy<string>(F.asc)(a); // $ExpectType Promise<ArrayLike<string>>
        const r1 = F.sortBy<string>(F.asc, a); // $ExpectType Promise<ArrayLike<string>>
        const r2 = F.sortBy<string>(F.desc)(a); // $ExpectType Promise<ArrayLike<string>>
        const r3 = F.sortBy(F.desc, a); // $ExpectType Promise<ArrayLike<string>>
    });

    it('with run', async () => {
        const a = [Promise.resolve(10), 5, 7, Promise.resolve(1), 4, 3];
        const f = (a: number, b: number) => a > b ? 1 : a < b ? -1 : 0;

        const r0 = await F.run(a, F.sortBy(f)); // $ExpectType ArrayLike<number>
    });
});

describe('comparator', () => {
    it('number', async () => {
        const cmp = F.comparator((a: number, b: number) => a < b); // $ExpectType (lhs: number, rhs: number) => number
        const r0 = cmp(3, 4); // $ExpectType number
        const r1 = F.comparator((a, b) => {
            a; // $ExpectType number
            b; // $ExpectType number
            return a < b;
        }, 3, 4);
        r1; // $ExpectType number
    });

    it('number2', async () => {
        const cmp = F.comparator<number>((a, b) => a < b); // $ExpectType (lhs: number, rhs: number) => number
        const r0 = cmp(3, 4); // $ExpectType number
    });

    it('string', async () => {
        const cmp = F.comparator((a: string, b: string) => a < b); // $ExpectType (lhs: string, rhs: string) => number
        const r0 = cmp("3", "4"); // $ExpectType number
        const r1 = F.comparator((a, b) => {
            a; // $ExpectType string
            b; // $ExpectType string
            return a < b;
        }, "3", "4");
        r1; // $ExpectType number
    });

    it('string2', async () => {
        const cmp = F.comparator<string>((a, b) => a < b); // $ExpectType (lhs: string, rhs: string) => number
        const r0 = cmp("3", "4"); // $ExpectType number
    });

    it('any', async () => {
        const cmp = F.comparator((a, b) => a < b); // $ExpectType (lhs: any, rhs: any) => number
        const r0 = cmp("3", "4"); // $ExpectType number
    });

    it('Promise<number>', async () => {
        const cmp = F.comparator((a: number, b: number) => Promise.resolve(a < b)); // $ExpectType (lhs: number | Promise<number>, rhs: number | Promise<number>) => Promise<number>
        const r0 = cmp(3, 4); // $ExpectType Promise<number>
        const r1 = F.comparator((a, b) => {
            a; // $ExpectType number
            b; // $ExpectType number
            return Promise.resolve(a < b);
        }, 3, 4);
        r1; // $ExpectType Promise<number>
    });

    it('Promise<number2>', async () => {
        const cmp = F.comparator<number>((a, b) => Promise.resolve(a < b)); // $ExpectType (lhs: number | Promise<number>, rhs: number | Promise<number>) => Promise<number>
        const r0 = cmp(3, 4); // $ExpectType Promise<number>
    });

    it('Promise<string>', async () => {
        const cmp = F.comparator((a: string, b: string) => Promise.resolve(a < b)); // $ExpectType (lhs: string | Promise<string>, rhs: string | Promise<string>) => Promise<number>
        const r0 = cmp("3", "4"); // $ExpectType Promise<number>
        const r1 = F.comparator((a, b) => {
            a; // $ExpectType string
            b; // $ExpectType string
            return Promise.resolve(a < b);
        }, "3", "4");
        r1; // $ExpectType Promise<number>
    });

    it('Promise<string2>', async () => {
        const cmp = F.comparator<string>((a, b) => Promise.resolve(a < b)); // $ExpectType (lhs: string | Promise<string>, rhs: string | Promise<string>) => Promise<number>
        const r0 = cmp("3", "4"); // $ExpectType Promise<number>
    });

    it('Promise<any>', async () => {
        const cmp = F.comparator((a, b) => Promise.resolve(a < b)); // $ExpectType (lhs: any, rhs: any) => Promise<number>
        const r0 = cmp("3", "4"); // $ExpectType Promise<number>
    });

    it('Promise lhs string', async () => {
        const cmp = F.comparator((a: string, b: string) => Promise.resolve(a < b)); // $ExpectType (lhs: string | Promise<string>, rhs: string | Promise<string>) => Promise<number>
        const r0 = cmp(Promise.resolve("3"), Promise.resolve("4")); // $ExpectType Promise<number>
        const r1 = F.comparator(
            (a: string, b: string) => Promise.resolve(a < b),
            Promise.resolve("3"),
            "4");
        r1; // $ExpectType Promise<number>
    });

    it('Promise rhs string', async () => {
        const cmp = F.comparator((a: string, b: string) => Promise.resolve(a < b)); // $ExpectType (lhs: string | Promise<string>, rhs: string | Promise<string>) => Promise<number>
        const r0 = cmp(Promise.resolve("3"), Promise.resolve("4")); // $ExpectType Promise<number>
        const r1 = F.comparator(
            (a: string, b: string) => Promise.resolve(a < b),
            "3",
            Promise.resolve("4"));
        r1; // $ExpectType Promise<number>
    });

    it('Promise value and comp returns not promise', async () => {
        const cmp = F.comparator((a: string, b: string) => Promise.resolve(a < b)); // $ExpectType (lhs: string | Promise<string>, rhs: string | Promise<string>) => Promise<number>
        const r0 = cmp(Promise.resolve("3"), Promise.resolve("4")); // $ExpectType Promise<number>
        const r1 = F.comparator(
            (a: string, b: string) => a < b,
            Promise.resolve("3"),
            Promise.resolve("4"));
        r1; // $ExpectType Promise<number>
    });

    it('curry1', async () => {
        const cmp0 = F.comparator((a: string, b: string) => a < b, "a");
        const r0 = cmp0("b"); // $ExpectType number

        const cmp1 = F.comparator((a: string, b: string) => a < b, Promise.resolve("a"));
        const r1 = cmp1("b"); // $ExpectType Promise<number>

        const cmp2 = F.comparator((a: string, b: string) => Promise.resolve(a < b), "a");
        const r2 = cmp2("b"); // $ExpectType Promise<number>
    });

    it('with array.sort', async () => {
        const arr = [1, 2, 3];
        arr.sort(F.comparator((a, b) => a < b));
    });

    it('with F.sort', async () => {
        const arr = [1, 2, 3];
        const r0 = await F.sortBy(F.comparator((a, b) => a < b), arr);
        r0; // $ExpectType ArrayLike<number>
    });

    it('with run', async () => {
        const arr = [1, 2, 3];
        const r0 = await F.run(arr, F.sortBy(F.comparator((a: number, b: number) => a < b)));
        r0; // $ExpectType ArrayLike<number>
    });
});

describe('insertAt', () => {
    it('number', async () => {
        const arr = [1, 2, 3];
        const r0 = F.insertAt(3, 0, arr);
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });

    it('string', async () => {
        const arr = ["a", "b", "c"];
        const r0 = F.insertAt("d", 0, arr);
        const t = F.collect(r0); // $ExpectType Promise<string[]>
    });

    it('Promise<number>', async () => {
        const arr = [1, 2, 3];
        const r0 = F.insertAt(Promise.resolve(3), 0, arr);
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });

    it('c1 number', async () => {
        const arr = [1, 2, 3];
        const r0 = F.insertAt(3)(0)(arr);
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });

    it('c1 string', async () => {
        const arr = ["a", "b", "c"];
        const r0 = F.insertAt("d")(0)(arr);
        const t = F.collect(r0); // $ExpectType Promise<string[]>
    });

    it('c2 Promise<number>', async () => {
        const arr = [1, 2, 3];
        const r0 = F.insertAt(Promise.resolve(3))(0)(arr);
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });

    it('c2 number', async () => {
        const arr = [1, 2, 3];
        const r0 = F.insertAt(3, 0)(arr);
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });

    it('c2 string', async () => {
        const arr = ["a", "b", "c"];
        const r0 = F.insertAt("d", 0)(arr);
        const t = F.collect(r0); // $ExpectType Promise<string[]>
    });

    it('c2 Promise<number>', async () => {
        const arr = [1, 2, 3];
        const r0 = F.insertAt(Promise.resolve(3), 0)(arr);
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });

    it('with run', async () => {
        const arr = [1, 2, 3];
        const r0 = await F.run(arr, F.insertAt(Promise.resolve(3), 0));
        const t = F.collect(r0); // $ExpectType Promise<number[]>
    });
});

describe('removeFirst', () => {
    it('number', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst(1, arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('number2', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst(1)(arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('Promise<number>', async () => {
        const arr = [Promise.resolve(1), 2, 3];
        const r = F.removeFirst(1, arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('Promise<number>2', async () => {
        const arr = [1, 2, Promise.resolve(3)];
        const r = F.removeFirst(1)(arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('string', async () => {
        const arr = ["a", "b", "c"];
        const r = F.removeFirst("a", arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('string2', async () => {
        const arr = ["a", "b", "c"];
        const r = F.removeFirst("a")(arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('array', async () => {
        const arr = [[1], [2], [3]];
        const r = F.removeFirst([2], arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[][]>
    });

    it('array2', async () => {
        const arr = [[1], [2], [3]];
        const r = F.removeFirst([2])(arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[][]>
    });

    it('function number ', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst((a) => true, arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('function number 2', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst((a: number) => true)(arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('function number return promise', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst((a) => Promise.resolve(true), arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('function number 2 return promise', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst((a: number) => Promise.resolve(true))(arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('function string', async () => {
        const arr = ["1", "2", "3"];
        const r = F.removeFirst((a) => true, arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('function string2', async () => {
        const arr = ["1", "2", "3"];
        const r = F.removeFirst((a: string) => true)(arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('function string return promise', async () => {
        const arr = ["1", "2", "3"];
        const r = F.removeFirst((a) => Promise.resolve(true), arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('function string2 return promise', async () => {
        const arr = ["1", "2", "3"];
        const r = F.removeFirst((a: string) => Promise.resolve(true))(arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('promise function number return promise', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst(Promise.resolve((a: number): Promise<boolean> => Promise.resolve(true)), arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('promise function number 2 return promise', async () => {
        const arr = [1, 2, 3];
        const r = F.removeFirst(Promise.resolve((a: number): Promise<boolean>  => Promise.resolve(true)))(arr);
        const r0 = F.collect(r); // $ExpectType Promise<number[]>
    });

    it('promise function string return promise', async () => {
        const arr = ["1", "2", "3"];
        const r = F.removeFirst(Promise.resolve((a: string): Promise<boolean>  => Promise.resolve(true)), arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('promise function string2 return promise', async () => {
        const arr = ["1", "2", "3"];
        const r = F.removeFirst(Promise.resolve((a: string): Promise<boolean>  => Promise.resolve(true)))(arr);
        const r0 = F.collect(r); // $ExpectType Promise<string[]>
    });

    it('with run', async () => {
        const r0 = F.run([1, 2, 3],
            F.removeFirst(3),
            F.collect);

        r0; // $ExpectType Promise<number[]>

        const r1 = F.run([1, 2, 3],
            F.removeFirst(e => e === 3),
            F.collect);

        r1; // $ExpectType Promise<number[]>
    });
});
