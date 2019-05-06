import * as F from '../../';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

describe('rangeOf', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, [4, 5, [6]]];

        const r0 = F.rangeOf(...a); // $ExpectType AsyncIterableIterator<number | number[]>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), [4, Promise.resolve(5), [Promise.resolve(6)], [7]]];

        const r0 = F.rangeOf(...a); // $ExpectType AsyncIterableIterator<number | number[] | Promise<number>[]>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.rangeOf(...a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), [Promise.resolve(3)], [Promise.resolve('c')]];

        const r0 = F.rangeOf(...a); // $ExpectType AsyncIterableIterator<string | number>
    });
});

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
        const a = [1, 2, 3, Promise.resolve(4), 'a', Promise.resolve('b')];

        const r0 = await F.run(F.seq(a), F.collect); // $ExpectType (string | number)[]
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

        const r0 = await F.some<string | number>(e => e === 'a')(a); // $ExpectType boolean
        const r1 = await F.some(e => e === 'a', a); // $ExpectType boolean
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
});

describe('errorThen', () => {
    it('from Normal Value', async () => {
        const testSupplyFunc = (i: string[]) => () => i;

        const e = ['error'];
        const a = [1, 2, 3, 4, 5];

        const ar0 = F.errorThen<number, string>(e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.errorThen<number, string>(testSupplyFunc(e))(a); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.errorThen(e, a); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.errorThen(testSupplyFunc(e), a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Promise Value', async () => {
        const testSupplyFunc = (i: AsyncIterableIterator<string>) => async () => i;

        const e = ['error'];
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const ar0 = F.errorThen<number, string>(F.seq(e))(a); // $ExpectType AsyncIterableIterator<string | number>
        const ar1 = F.errorThen<number, string>(testSupplyFunc(F.seq(e)))(a); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = F.errorThen(F.seq(e), a); // $ExpectType AsyncIterableIterator<string | number>
        const br1 = F.errorThen(testSupplyFunc(F.seq(e)), a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Promise Wrapped Supply', async () => {
        const testSupplyFunc = (i: string[]) => () => i;

        const e = ['error'];
        const a = [1, 2, 3, 4, 5];

        const ar0 = F.errorThen<number, string>(Promise.resolve(e))(a);
        const ar1 = F.errorThen<number, string>(Promise.resolve(testSupplyFunc(e)))(a);

        const br0 = F.errorThen(Promise.resolve(e), a);
        const br1 = F.errorThen(Promise.resolve(testSupplyFunc(e)), a);
    });

    it('to String', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.errorThen<number, string>('error')(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.errorThen('error', a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Normal / Promise Union', async () => {
        const testSupplyFunc = (i: (null | Promise<null> | { id: number; } | Promise<{ id: number; }>)[]) => () => i;

        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];
        const e = [Promise.resolve(null), null, Promise.resolve({ id: 1}), { id: 2}];

        const ar0 = F.errorThen<string | number, { id: number; } | null>(e)(a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | null>
        const ar1 = F.errorThen<string | number, { id: number; } | null>(Promise.resolve(e))(a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | null>
        const ar2 = F.errorThen<string | number, { id: number; } | null>(testSupplyFunc(e))(a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | null>
        const ar3 = F.errorThen<string | number, { id: number; } | null>(Promise.resolve(testSupplyFunc(e)))(a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | null>

        const br0 = F.errorThen(e, a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | { id: number; } | null>
        const br1 = F.errorThen(Promise.resolve(e), a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | { id: number; } | null>
        const br2 = F.errorThen(testSupplyFunc(e), a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | { id: number; } | null>
        const br3 = F.errorThen(Promise.resolve(testSupplyFunc(e)), a); // $ExpectType AsyncIterableIterator<string | number | { id: number; } | { id: number; } | null>
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

        const ar0 = F.then(gfn0)(a); // $ExpectType IterableIterator<number>
        const ar1 = F.then(gfn0, a); // $ExpectType IterableIterator<number>

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
});
