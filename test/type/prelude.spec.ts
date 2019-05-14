import * as F from '../../';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

const toString = (a: number) => a.toString();
const asyncToString = async (a: number) => toString(a);

describe('head', () => {
    it('from Normal Value', async () => {
        const a = [10, 9, 8, 7];

        const r0 = await F.head(a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [10, Promise.resolve(9), 8, 7];

        const r0 = await F.head(a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.head(a); // $ExpectType string
    });

    it('from Normal / Promise Value Union', async () => {
        const a = [1, Promise.resolve('a'), Promise.resolve(2), 'b'];

        const r0 = await F.head(a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [1, Promise.resolve('a'), Promise.resolve(2), 'b', null];

        const r0 = await F.run(a, F.head); // $ExpectType string | number | null
    });
});

describe('tail', () => {
    it('from Normal Value', async () => {
        const a = [10, 9, 8, 7];

        const r0 = F.tail(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [10, 9, Promise.resolve(8), 7];

        const r0 = F.tail(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.tail(a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.tail(a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.run(a, F.tail); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('drop', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.drop<number>(2)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.drop(2, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, 3, Promise.resolve(4), 5];

        const r0 = F.drop<number>(2)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.drop(2, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.drop<string>(2)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.drop(2, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b')];

        const r0 = F.drop<string | number>(2)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.drop(2, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.drop<string | number | null>(2)); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.drop(2)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('dropWhile', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4];

        const r0 = F.dropWhile<number>(e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.dropWhile(e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4];

        const r0 = F.dropWhile<number>(async e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.dropWhile(async e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.dropWhile<string>(e => e === '0')(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.dropWhile(e => e === 'o', a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b')];

        const r0 = F.dropWhile<string | number>(e => e === 1)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.dropWhile(e => e === 1, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.dropWhile<string | number | null>(e => e === 1)); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.dropWhile(e => e === 1)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('filter', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.filter<number>(async e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.filter(async e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5];

        const r0 = F.filter<number>(async e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.filter(async e => (e % 2 === 0), a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.filter<string>(e => e === 'l')(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.filter(e => e === 'l', a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.filter<string | number>(e => e === 'a')(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.filter(e => e === 'a', a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.filter<string | number | null>(e => { // $ExpectType AsyncIterableIterator<string | number | null>
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
        const r1 = await F.run(a, F.filter(e => { // $ExpectType AsyncIterableIterator<string | number | null>
            e; // $ExpectType string | number | null
            return e === 'a';
        }));
    });
});

describe('map', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4];

        const r0 = F.map<number, number>((x) => x + x)(a);  // $ExpectType AsyncIterableIterator<number>
        const r1 = F.map(x => x + x, a);  // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4];

        const r0 = F.map<number, number>(async x => x + x)(a);  // $ExpectType AsyncIterableIterator<number>
        const r1 = F.map(async x => x + x, a);  // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.map<string, string>(e => e + e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.map(e => e + e, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b')];

        const r0 = F.map<string | number, string | number>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.map(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.map<string | number | null, string | number | null>(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.map(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('fmap', () => {
    it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.fmap<number[]>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.fmap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [[1], [Promise.resolve(2)], Promise.resolve([3]), [4], [5]];

        const r0 = F.fmap<F.Flat<typeof a>>(async e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.fmap(async e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.fmap<F.Flat<typeof a>>(e => e)(a); // ExpectType AsyncIterableIterator<string>
        const r1 = F.fmap(e => e, a); // ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.fmap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.fmap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
	});

	it('wrap array', async () => {
		const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

		const r0 = F.fmap<F.Flat<typeof a>, F.PFlat<typeof a>[]>(e => [e])(a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
		const r1 = F.fmap(e => [e], a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
	});

    it('with run', async () => {
        const a = [[1], Promise.resolve(['a']), [4], [5], [Promise.resolve('b')], [null]];

        const r0 = await F.run(a, F.fmap<F.Flat<typeof a>>(e => { // $ExpectType AsyncIterableIterator<string | number | null>
            e; // $ExpectType string[] | number[] | Promise<string>[] | null[]
            return e;
        }));
        const r1 = await F.run(a, F.fmap(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('flatMap', () => {
	it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.flatMap<number[]>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.flatMap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [[1], [Promise.resolve(2)], Promise.resolve([3]), [4], [5]];

        const r0 = F.flatMap<F.Flat<typeof a>>(async e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.flatMap(async e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.flatMap<F.Flat<typeof a>>(e => e)(a); // ExpectType AsyncIterableIterator<string>
        const r1 = F.flatMap(e => e, a); // ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.flatMap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.flatMap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
	});

	it('wrap array', async () => {
		const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

		const r0 = F.flatMap<F.Flat<typeof a>, F.PFlat<typeof a>[]>(e => [e])(a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
		const r1 = F.flatMap(e => [e], a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
	});

    it('with run', async () => {
        const a = [[1], Promise.resolve(['a']), [4], [5], [Promise.resolve('b')], [null]];

        const r0 = await F.run(a, F.flatMap<F.Flat<typeof a>>(e => { // $ExpectType AsyncIterableIterator<string | number | null>
            e; // $ExpectType string[] | number[] | Promise<string>[] | null[]
            return e;
        }));
        const r1 = await F.run(a, F.flatMap(e => e)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('flat', () => {
    it('from Normal Value', async () => {
        const a = [1, [2, 3, [4, 5]], 6];

        const r0 = F.flat(a); // $ExpectType AsyncIterableIterator<number | number[]>
        const r1 = F.flat(r0); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.flat(r1); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = ['he', 'l', [['l']], [[Promise.resolve('o')]]];

        const r0 = F.flat(a); // $ExpectType AsyncIterableIterator<string | string[] | Promise<string>[]>
        const r1 = F.flat(r0); // $ExpectType AsyncIterableIterator<string>
        const r2 = F.flat(r1); // $ExpectType AsyncIterableIterator<string>
    });

    it('from String', async () => {
        const a = 'helloworld';

        const r0 = F.flat(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.flat(r0); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], 2, ['a'], 'b', Promise.resolve([3]), Promise.resolve('c'), Promise.resolve(['d']), [Promise.resolve('e')], [Promise.resolve(4)]];

        const r0 = F.flat(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.flat(r0); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [[1], 2, ['a'], 'b', Promise.resolve([3]), Promise.resolve('c'), Promise.resolve(['d']), [Promise.resolve('e')], [Promise.resolve(4)]];

        const r0 = await F.run(a, F.flat); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('dflat', () => {
    it('from Normal Value', async () => {
        const a = [1, [2, [3, [4, [5, [6, [7, [8, [9, [10, [11, [12, [13]]]]]]]]]]]]];

        const r0 = F.dflat(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, [2, [Promise.resolve(3), [4, [5, [6, [Promise.resolve(7), [8, [9, [Promise.resolve(10), [11, [12, [13]]]]]]]]]]]]];

        const r0 = F.dflat(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, [2, [Promise.resolve([null, [null, Promise.resolve([null])]]), [4, [null, [6, [Promise.resolve([7]), [8, [9, [Promise.resolve(10), [11, [12, [13]]]]]]]]]]]]];

        const r0 = F.dflat(a); // $ExpectType AsyncIterableIterator<number | null>
    });

    it('from String', async () => {
        const a = ['a', ['bb', ['ccc', ['dddd', ['eeeee', ['ffffff', ['ggggggg', ['hhhhhhhh', ['iiiiiiiii', ['jjjjjjjjjj', ['kkkkkkkkkkk']]]]]]]]]]];

        const r0 = F.dflat(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.dflat('a'); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Multiple Parameters', async () => {
        const a = [1, [2, [Promise.resolve(['a', ['bb', Promise.resolve(['ccc'])]]), [4, ['dddd', [6, [Promise.resolve([7]), [8, [9, [Promise.resolve(10), [11, [12, [13]]]]]]]]]]]]];
        const b = [1, [2, [Promise.resolve(3), [4, [5, [6, [Promise.resolve(7), [8, [9, [Promise.resolve(10), [11, [12, [13]]]]]]]]]]]]];
        const c = [1, [2, [3, [4, [5, [6, [7, [8, [9, [10, [11, [12, [13]]]]]]]]]]]]];

        const r0 = F.dflat(a, b); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.dflat(a, b, c); // $ExpectType AsyncIterableIterator<string | number>
        const r2 = F.dflat(a, b, c, a); // $ExpectType AsyncIterableIterator<string | number>
        const r3 = F.dflat(a, b, c, a, b); // $ExpectType AsyncIterableIterator<string | number>
        const r4 = F.dflat(a, b, c, a, b, c); // $ExpectType AsyncIterableIterator<string | number>
        const r5 = F.dflat(a, b, c, a, b, c, a); // $ExpectType AsyncIterableIterator<string | number>
        const r6 = F.dflat(a, b, c, a, b, c, a, b); // $ExpectType AsyncIterableIterator<string | number>
        const r7 = F.dflat(a, b, c, a, b, c, a, b, c); // $ExpectType AsyncIterableIterator<string | number>
        const r8 = F.dflat(a, b, c, a, b, c, a, b, c, a); // $ExpectType AsyncIterableIterator<string | number>
        const r9 = F.dflat(b, b, b, b, b, b, b, b, b, b, b); // $ExpectType AsyncIterableIterator<number>
        const r10 = F.dflat(a, b, c, a, b, c, a, b, c, a, b, c); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('take', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4];

        const r0 = F.take<number>(5)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.take(5, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3, 4];

        const r0 = F.take<number>(5)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.take(5, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.take<string>(5)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.take(5, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b'];

        const r0 = F.take<string | number>(5)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.take(5, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b', null];

        const r0 = await F.run(a, F.take<string | number | null>(5)); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.take(5)); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('takeWhile', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.takeWhile<number>(e => e > 3)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.takeWhile((e) => e > 3, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, Promise.resolve(2), 3, 4, 5];

        const r0 = F.takeWhile<number>(e => e > 3)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.takeWhile((e) => e > 3, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.takeWhile<string>(e => e === 'o')(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.takeWhile(e => e === 'o', a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), Promise.resolve('a'), 'b'];

        const r0 = F.takeWhile<string | number>(e => e === 'a')(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.takeWhile(e => e === 'a', a); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('foldl', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.foldl<number>((acc, e) => acc + e)(0)(a); // $ExpectType number
        const r1 = await F.foldl<number>((acc, e) => acc + e)(0, a); // $ExpectType number
        const r2 = await F.foldl<number>((acc, e) => acc + e, 0)(a); // $ExpectType number
        const r3 = await F.foldl((acc, e) => acc + e, 0, a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.foldl<number>(async (acc, e) => acc + e)(Promise.resolve(0))(a); // $ExpectType number
        const r1 = await F.foldl<number>(async (acc, e) => acc + e)(Promise.resolve(0), a); // $ExpectType number
        const r2 = await F.foldl<number>(async (acc, e) => acc + e, Promise.resolve(0))(a); // $ExpectType number
        const r3 = await F.foldl(async (acc, e) => acc + e, Promise.resolve(0), a); // $ExpectType number

        // const rrrr = await F.foldl<number>((acc, e) => acc + e)(Promise.resolve(0))(a);
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.foldl<string>((acc, e) => acc + e)('')(a); // $ExpectType string
        const r1 = await F.foldl<string>((acc, e) => acc + e)('', a); // $ExpectType string
        const r2 = await F.foldl<string>((acc, e) => acc + e, '')(a); // $ExpectType string
        const r3 = await F.foldl((acc, e) => acc + e, '', a); // $ExpectType string
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b')];

        const r0 = await F.foldl<string | number>((acc, e) => acc === 'a' ? acc : e)(0)(a); // $ExpectType string | number
        const r1 = await F.foldl<string | number>((acc, e) => acc === 'a' ? acc : e)(0, a); // $ExpectType string | number
        const r2 = await F.foldl<string | number>((acc, e) => acc === 'a' ? acc : e, 0)(a); // $ExpectType string | number
        const r3 = await F.foldl((acc, e) => acc === 'a' ? acc : e, 0, a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.foldl<string | number | null>((acc, e) => acc === 'a' ? acc : e, 0)); // $ExpectType string | number | null
        const r1 = await F.run(a, F.foldl((acc, e) => acc === 'a' ? acc : e, 0)); // $ExpectType string | number | null
    });
});

describe('foldl1', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.foldl1<number>((acc, e) => acc + e)(a); // $ExpectType number
        const r1 = await F.foldl1((acc, e) => acc + e, a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.foldl1<number>(async (acc, e) => acc + e)(a); // $ExpectType number
        const r1 = await F.foldl1(async (acc, e) => acc + e, a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.foldl1<string>((acc, e) => acc + e)(a); // $ExpectType string
        const r1 = await F.foldl1((acc, e) => acc + e, a); // $ExpectType string
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.foldl1<string | number>((acc, e) => acc === 'a' ? acc : e)(a); // $ExpectType string | number
        const r1 = await F.foldl1((acc, e) => acc === 'a' ? acc : e, a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.foldl1<string | number | null>((acc, e) => acc === 'a' ? acc : e)); // $ExpectType string | number | null
        const r1 = await F.run(a, F.foldl1((acc, e) => acc === 'a' ? acc : e)); // $ExpectType string | number | null
    });
});

describe('reduce', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.reduce<number>((acc, e) => acc + e)(a); // $ExpectType number
        const r1 = await F.reduce((acc, e) => acc + e, a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.reduce<number>(async (acc, e) => acc + e)(a); // $ExpectType number
        const r1 = await F.reduce(async (acc, e) => acc + e, a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.reduce<string>((acc, e) => acc + e)(a); // $ExpectType string
        const r1 = await F.reduce((acc, e) => acc + e, a); // $ExpectType string
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.reduce<string | number>((acc, e) => acc === 'a' ? acc : e)(a); // $ExpectType string | number
        const r1 = await F.reduce((acc, e) => acc === 'a' ? acc : e, a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.reduce<string | number | null>((acc, e) => acc === 'a' ? acc : e)); // $ExpectType string | number | null
        const r1 = await F.run(a, F.reduce((acc, e) => acc === 'a' ? acc : e)); // $ExpectType string | number | null
    });
});

describe('scanl', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.scanl<number>((b, c) => b + c)(0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.scanl<number>((b, c) => b + c)(0, a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.scanl<number>((b, c) => b + c, 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.scanl((b, c) => b + c, 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = F.scanl<number>(async (b, c) => b + c)(Promise.resolve(0))(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.scanl<number>(async (b, c) => b + c)(Promise.resolve(0), a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.scanl<number>(async (b, c) => b + c, Promise.resolve(0))(a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.scanl(async (b, c) => b + c, Promise.resolve(0), a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.scanl<string>((b, c) => b + c)('')(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.scanl<string>((b, c) => b + c)('', a); // $ExpectType AsyncIterableIterator<string>
        const r2 = F.scanl<string>((b, c) => b + c, '')(a); // $ExpectType AsyncIterableIterator<string>
        const r3 = F.scanl((b, c) => b + c, '', a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.scanl<string | number>((b, c) => b === 'a' ? b : c)('')(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.scanl<string | number>((b, c) => b === 'a' ? b : c)('', a); // $ExpectType AsyncIterableIterator<string | number>
        const r2 = F.scanl<string | number>((b, c) => b === 'a' ? b : c, '')(a); // $ExpectType AsyncIterableIterator<string | number>
        const r3 = F.scanl((b, c) => b === 'a' ? b : c, '', a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.scanl<string | number | null>((b, c) => b === 'a' ? b : c, '')); // $ExpectType AsyncIterableIterator<string | number | null>
        const r1 = await F.run(a, F.scanl((b, c) => b === 'a' ? b : c, '')); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('scanl1', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.scanl1<number>((b, c) => b + c)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.scanl1((b, c) => b + c, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = F.scanl1<number>(async (b, c) => b + c)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.scanl1(async (b, c) => b + c, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.scanl1<string>((b, c) => b + c)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.scanl1((b, c) => b + c, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.scanl1<string | number>((b, c) => b === 'a' ? b : c)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.scanl1((b, c) => b === 'a' ? b : c, a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.scanl1<string | number | null>((b, c) => b === 'a' ? b : c));
        const r1 = await F.run(a, F.scanl1((b, c) => b === 'a' ? b : c));
    });
});

describe('reverse', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = F.reverse(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = F.reverse(a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.reverse(a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.reverse(a); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.run(a, F.reverse); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('foldr', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.foldr<number>((acc, e) => acc + e)(0)(a); // $ExpectType number
        const r1 = await F.foldr<number>((acc, e) => acc + e)(0, a); // $ExpectType number
        const r2 = await F.foldr<number>((acc, e) => acc + e, 0)(a); // $ExpectType number
        const r3 = await F.foldr((acc, e) => acc + e, 0, a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.foldr<number>(async (acc, e) => acc + e)(Promise.resolve(0))(a); // $ExpectType number
        const r1 = await F.foldr<number>(async (acc, e) => acc + e)(Promise.resolve(0), a); // $ExpectType number
        const r2 = await F.foldr<number>(async (acc, e) => acc + e, Promise.resolve(0))(a); // $ExpectType number
        const r3 = await F.foldr(async (acc, e) => acc + e, Promise.resolve(0), a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.foldr<string>((acc, e) => acc + e)('')(a); // $ExpectType string
        const r1 = await F.foldr<string>((acc, e) => acc + e)('', a); // $ExpectType string
        const r2 = await F.foldr<string>((acc, e) => acc + e, '')(a); // $ExpectType string
        const r3 = await F.foldr((acc, e) => acc + e, '', a); // $ExpectType string
    });

    it('from Normal / Promise Union', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b')];

        const r0 = await F.foldr<string | number>((acc, e) => acc === 'a' ? acc : e)(0)(a); // $ExpectType string | number
        const r1 = await F.foldr<string | number>((acc, e) => acc === 'a' ? acc : e)(0, a); // $ExpectType string | number
        const r2 = await F.foldr<string | number>((acc, e) => acc === 'a' ? acc : e, 0)(a); // $ExpectType string | number
        const r3 = await F.foldr((acc, e) => acc === 'a' ? acc : e, 0, a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.foldr<string | number | null>((acc, e) => acc === 'a' ? acc : e, 0)); // $ExpectType string | number | null
        const r1 = await F.run(a, F.foldr((acc, e) => acc === 'a' ? acc : e, 0)); // $ExpectType string | number | null
    });
});

describe('foldr1', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];

        const r0 = await F.foldr1<number>((acc, e) => acc + e)(a); // $ExpectType number
        const r1 = await F.foldr1((acc, e) => acc + e, a); // $ExpectType number
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = await F.foldr1<number>(async (acc, e) => acc + e)(a); // $ExpectType number
        const r1 = await F.foldr1(async (acc, e) => acc + e, a); // $ExpectType number
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = await F.foldr1<string>((acc, e) => acc + e)(a); // $ExpectType string
        const r1 = await F.foldr1((acc, e) => acc + e, a); // $ExpectType string
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = await F.foldr1<string | number>((acc, e) => acc === 'a' ? acc : e)(a); // $ExpectType string | number
        const r1 = await F.foldr1((acc, e) => acc === 'a' ? acc : e, a); // $ExpectType string | number
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];

        const r0 = await F.run(a, F.foldr1<string | number | null>((acc, e) => acc === 'a' ? acc : e)); // $ExpectType string | number | null
        const r1 = await F.run(a, F.foldr1((acc, e) => acc === 'a' ? acc : e)); // $ExpectType string | number | null
    });
});

describe('zip', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5];
        const b = ['a', 'b', 'c', 'd', 'e'];

        const r0 = F.zip<number, string>(a)(b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r1 = F.zip(a, b); // $ExpectType AsyncIterableIterator<[number, string]>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];
        const b = ['a', Promise.resolve('b'), 'c', 'd', 'e'];

        const r0 = F.zip<number, string>(a)(b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r1 = F.zip(a, b); // $ExpectType AsyncIterableIterator<[number, string]>
    });

    it('from String', async () => {
        const a = 'hello world';
        const b = 'dlrow olleh';

        const r0 = F.zip<string, string>(a)(b); // $ExpectType AsyncIterableIterator<[string, string]>
        const r1 = F.zip(a, b); // $ExpectType AsyncIterableIterator<[string, string]>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];
        const b = [Promise.resolve('b'), 'a', Promise.resolve(2), 1];

        const r0 = F.zip<string | number, string | number>(a)(b); // $ExpectType AsyncIterableIterator<[string | number, string | number]>
        const r1 = F.zip(a, b); // $ExpectType AsyncIterableIterator<[string | number, string | number]>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];
        const b = [Promise.resolve('b'), 'a', Promise.resolve(2), 1, null];

        const r0 = await F.run(b, F.zip<string | number | null, string | number | null>(a)); // $ExpectType AsyncIterableIterator<[string | number | null, string | number | null]>
        const r1 = await F.run(b, F.zip(a)); // $ExpectType AsyncIterableIterator<[string | number | null, string | number | null]>
    });
});

describe('zipWith', () => {
    it('from Normal Value', async () => {
        const a = [{ id: 0 }, { id: 1 }, { id: 2 }];
        const b = [{ name: 'hong9802' }, { name: 'cenox' }, { name: 'gyungdal' }];

        const r0 = F.zipWith<{ id: number; }, { name: string; }, number, string>((a, b) => [a.id, b.name])(a)(b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r1 = F.zipWith<{ id: number; }, { name: string; }, number, string>((a, b) => [a.id, b.name])(a, b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r2 = F.zipWith<{ id: number; }, { name: string; }, number, string>((a, b) => [a.id, b.name], a)(b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r3 = F.zipWith((a, b) => [a.id, b.name], a, b); // $ExpectType AsyncIterableIterator<[number, string]>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve({ id: 0 }), { id: 1 }, { id: 2 }];
        const b = [{ name: 'hong9802' }, { name: 'cenox' }, Promise.resolve({ name: 'gyungdal' })];

        const r0 = F.zipWith<{ id: number; }, { name: string; }, number, string>(async (a, b) => [a.id, b.name])(a)(b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r1 = F.zipWith<{ id: number; }, { name: string; }, number, string>(async (a, b) => [a.id, b.name])(a, b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r2 = F.zipWith<{ id: number; }, { name: string; }, number, string>(async (a, b) => [a.id, b.name], a)(b); // $ExpectType AsyncIterableIterator<[number, string]>
        const r3 = F.zipWith((a, b) => [a.id, b.name], a, b); // $ExpectType AsyncIterableIterator<[number, string]>
    });

    it('from String', async () => {
        const a = 'hello world';
        const b = 'dlrow olleh';

        const r0 = F.zipWith<string, string, string, string>((a, b) => [a, b])(a)(b); // $ExpectType AsyncIterableIterator<[string, string]>
        const r1 = F.zipWith<string, string, string, string>((a, b) => [a, b])(a, b); // $ExpectType AsyncIterableIterator<[string, string]>
        const r2 = F.zipWith<string, string, string, string>((a, b) => [a, b], a)(b); // $ExpectType AsyncIterableIterator<[string, string]>
        const r3 = F.zipWith((a, b) => [a, b], a, b); // $ExpectType AsyncIterableIterator<[string, string]>
    });

    it('from Normal / Promise Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];
        const b = [Promise.resolve('b'), 'a', Promise.resolve(2), 1];

        const r0 = F.zipWith<string | number, string | number, string | number, string | number>((a, b) => [a, b])(a)(b); // $ExpectType AsyncIterableIterator<[string | number, string | number]>
        const r1 = F.zipWith<string | number, string | number, string | number, string | number>((a, b) => [a, b])(a, b); // $ExpectType AsyncIterableIterator<[string | number, string | number]>
        const r2 = F.zipWith<string | number, string | number, string | number, string | number>((a, b) => [a, b], a)(b); // $ExpectType AsyncIterableIterator<[string | number, string | number]>
        const r3 = F.zipWith((a, b) => [a, b], a, b); // $ExpectType AsyncIterableIterator<[string | number, string | number]>
    });

    it('with run', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b'), null];
        const b = [Promise.resolve('b'), 'a', Promise.resolve(2), 1, null];

        const r0 = await F.run(b, F.zipWith<string | number | null, string | number | null, string | number | null, string | number | null>((a, b) => [a, b], a)); // $ExpectType AsyncIterableIterator<[string | number | null, string | number | null]>
        const r1 = await F.run(b, F.zipWith((a, b) => [a, b], a)); // $ExpectType AsyncIterableIterator<[string | number | null, string | number | null]>
    });
});

describe('run', () => {
    it('iter', async () => {
        const a = [1, 2, 3, Promise.resolve(4), 5, 6];
        const b = [1, 2, Promise.resolve(3), [4, Promise.resolve(5)]];
        const c = [1, 2, 3, 4, 5];
        const d = [5, 4, 3, 2, 1];
        const e = ['hello', ['w', Promise.resolve('o'), 'rld']];

        const run1 = await F.run(a, F.map(F.inc));
        const run2 = await F.run(b, F.flat, F.map(e => e - e));
        const run3 = await F.run(c, F.map(F.inc), F.take(100), F.foldl1((acc, e) => acc + e));
        const run4 = await F.run(c, F.map(e => e ** e), F.take(10), F.map(e => e % 2), F.average);
        const run5 = await F.run(F.range(50000), F.map(e => e * 2), F.filter(e => e % 2 === 0), F.take(200), F.reverse, F.foldr1(F.sub));
        const run6 = await F.run(e, F.flat, F.flat, F.filter(e => (e === 'l') || (e === 'h')), F.foldl1(F.add));
        const run7 = await F.run(F.range(), F.map(F.inc), F.map(e => e * 0.5), F.take(200), F.max);
        const run8 = await F.run(F.range(), F.map(F.inc), F.map(e => e * 0.5), F.take(200), F.min);
        const run9 = await F.run(F.range(), F.map(F.inc), F.map(e => e * 0.5), F.take(200), F.sum, (e) => F.add(e, e));
        const run10 = await F.run(F.range(), F.map(F.inc), F.map(e => e * 0.5), F.take(200), F.average);
        const run11 = await F.run(e, F.flat, F.flat, F.max);
        const run12 = await F.run(e, F.flat, F.flat, F.min);
        const run13 = await F.run(e, F.flat, F.flat, F.sum);
        const run14 = await F.run(F.seq(c), F.collect);
    });

    it('normal', async () => {
        const run1 = await F.run(1, e => e + 1);
		const run2 = await F.run({ a: 1, b: 2, c: 3 }, e => ({ a: e.a, ...e }), e => ({ b: e.b, ...e }));
	});

	it('all pattern types', async () => {
		const r0 = await F.run(1, (e: number) => e); // $ExpectType number
		const r1 = await F.run(1, (e: number) => e, toString); // $ExpectType string
		const r2 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10)); // $ExpectType number
		const r3 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString); // $ExpectType string
		const r4 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10)); // $ExpectType number
		const r5 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString); // $ExpectType string
		const r6 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r7 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
		const r8 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r9 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
		const r10 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r11 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
		const r12 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r13 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
		const r14 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r15 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
		const r16 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r17 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
		const r18 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType number
		const r19 = await F.run(1, (e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType string
	});
});

describe('pipe', () => {
  	it('iter', async () => {
		const a = [1, 2, 3, 4];
		const b = [{ id: 1, name: 'haskell curry' }, Promise.resolve({ id: 2, name: 'john doe' }), { id: 3, name: 'jane doe' }];

		const pipe0 = F.pipe(F.map((e: number) => e + e));
		const r0 = await pipe0(a); // $ExpectType AsyncIterableIterator<number>

		const pipe1 = F.pipe(F.map((e: number) => (typeof e as string)), F.collect);
		const r1 = await pipe1(a); // $ExpectType string[]

		const pipe2 = F.pipe((e: typeof b) => e, F.map(e => e.name), F.collect);
		const r2 = await pipe2(b); // $ExpectType string[]

		const pipe3 = F.pipe(F.map((e: F.PFlat<typeof b>) => e.id), F.collect);
		const r3 = await pipe3(b); // $ExpectType number[]

		const pipe4 = F.pipe((t: number[]) => Promise.all(t.map(async e => e + e)));
        const r4 = await pipe4(a); // $ExpectType number[]
    });

    it('multiple parameter', async () => {
        const pipe0 = F.pipe((a: number, b: number, c: string, d: Promise<number>, e: Promise<string>) => [a, b, c, d, e]);
        const r0 = await pipe0(1, 2, 'a', Promise.resolve(3), Promise.resolve('b')); // $ExpectType (string | number | Promise<number> | Promise<string>)[]

        const a0 = [1, 'a', Promise.resolve(2), Promise.resolve('b')];
        const b0 = [null, Symbol('abc'), undefined, Promise.resolve('a'), 1, Promise.resolve(2)];
        const pipe1 = F.pipe((a: typeof a0, b: typeof b0, c: typeof b0, d: typeof a0) => [a, b, c, d]);
        const r1 = await pipe1(a0, b0, b0, a0); // $ExpectType ((string | number | Promise<number> | Promise<string>)[] | (number | symbol | Promise<number> | Promise<string> | null | undefined)[])[]
    });

	it('all pattern types', async () => {
		const p0 = F.pipe((e: number) => e); // $ExpectType (e: number) => Promise<number>
		const p1 = F.pipe((e: number) => e, toString); // $ExpectType (e: number) => Promise<string>
		const p2 = F.pipe((e: number) => e, toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p3 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString); // $ExpectType (e: number) => Promise<string>
		const p4 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p5 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p6 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p7 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p8 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p9 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p10 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p11 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p12 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p13 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p14 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p15 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p16 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p17 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
		const p18 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10)); // $ExpectType (e: number) => Promise<number>
		const p19 = F.pipe((e: number) => e, toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString); // $ExpectType (e: number) => Promise<string>
	});
});

describe('compose', () => {
    it('iter', async () => {
      const a = [1, 2, 3, 4];
      const b = [{ id: 1, name: 'haskell curry' }, Promise.resolve({ id: 2, name: 'john doe' }), { id: 3, name: 'jane doe' }];

      const compose0 = F.compose(F.map((e: number) => e + e));
      const r0 = await compose0(a); // $ExpectType AsyncIterableIterator<number>

      const compose1 = F.compose(F.collect, F.map((e: number) => (typeof e as string)));
      const r1 = await compose1(a); // $ExpectType string[]

      const compose2 = F.compose(F.collect, F.map(e => e.name), (e: typeof b) => e);
      const r2 = await compose2(b); // $ExpectType string[]

      const compose3 = F.compose(F.collect, F.map((e: F.PFlat<typeof b>) => e.id));
      const r3 = await compose3(b); // $ExpectType number[]

      const compose4 = F.compose((t: number[]) => Promise.all(t.map(async e => e + e)));
      const r4 = await compose4(a); // $ExpectType number[]
  });

  it('multiple parameter', async () => {
      const compose0 = F.compose((a: number, b: number, c: string, d: Promise<number>, e: Promise<string>) => [a, b, c, d, e]);
      const r0 = await compose0(1, 2, 'a', Promise.resolve(3), Promise.resolve('b')); // $ExpectType (string | number | Promise<number> | Promise<string>)[]

      const a0 = [1, 'a', Promise.resolve(2), Promise.resolve('b')];
      const b0 = [null, Symbol('abc'), undefined, Promise.resolve('a'), 1, Promise.resolve(2)];
      const compose1 = F.compose((a: typeof a0, b: typeof b0, c: typeof b0, d: typeof a0) => [a, b, c, d]);
      const r1 = await compose1(a0, b0, b0, a0); // $ExpectType ((string | number | Promise<number> | Promise<string>)[] | (number | symbol | Promise<number> | Promise<string> | null | undefined)[])[]
  });

  it('all pattern types', async () => {
      const p0 = F.compose((e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p1 = F.compose(toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p2 = F.compose(e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p3 = F.compose(asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p4 = F.compose(e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p5 = F.compose(toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p6 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p7 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p8 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p9 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p10 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p11 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p12 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p13 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p14 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p15 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p16 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p17 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
      const p18 = F.compose(e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<number>
      const p19 = F.compose(toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), toString, e => parseInt(e, 10), asyncToString, e => parseInt(e, 10), toString, (e: number) => e); // $ExpectType (e: number) => Promise<string>
  });
});
