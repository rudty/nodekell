import * as F from './';

const describe = (str: string, f: () => any) => {
    f();
};

const it = (str: string, f: () => any) => {
    f();
};

//
// core.js
//
describe('util functions', () => {
    it('seq', () => {
        const range0 = F.range(0, 5, 1); // $ExpectType IterableIterator<number>
        const range1 = F.range(5); // $ExpectType IterableIterator<number>

        const seq0 = F.seq(['1', '2', '3', '4']); // $ExpectType AsyncIterableIterator<string>
        const seq1 = F.seq(range1); // $ExpectType AsyncIterableIterator<number>
        const seq2 = F.seq(seq1); // $ExpectType AsyncIterableIterator<number>
        const seq3 = F.seq('hello'); // $ExpectType AsyncIterableIterator<string>
        const seq4 = F.seq([Promise.resolve(1), 2, 'a', Promise.resolve('b'), 3, 4]); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('ioe', () => {
        const ioe = F.ioe(null); // $ExpectType null
    });

    it('fnothing', () => {
        const fnothing = F.fnothing(); // $ExpectType void
    });

    it('add', () => {
        const add0 = F.add('1', '2'); // $ExpectType string
        const add1 = F.add(1, 2); // $ExpectType number
    });

    it('sub', () => {
        const sub0 = F.sub(2, 1); // $ExpectType number
    });

    it('increment / decrement', () => {
        const inc0 = F.inc(8); // $ExpectType number
        const dec0 = F.dec(10); // $ExpectType number
    });

    it('first / second', () => {
        const first0 = F.first([0, '1', 2, 3, 4]); // $ExpectType string | number
        const second0 = F.second([0, '1', 2, 3, 4]); // $ExpectType string | number
    });

    it('isNil', () => {
        const isNil = F.isNil(false); // $ExpectType boolean
    });

    it('notNil', () => {
        const notNil = F.notNil(0); // $ExpectType boolean
    });
});

describe('curry', () => {
    it('curry2 test', () => {
        const curry2 = F.curry((a: 1, b: 2) => '3');
        curry2(1)(2); // $ExpectType string
        curry2(1, 2); // $ExpectType string
    });

    it('curry3 test', () => {
        const curry3 = F.curry((a: 1, b: 2, c: 3) => '4');
        curry3(1)(2)(3); // $ExpectType string
        curry3(1)(2, 3); // $ExpectType string
        curry3(1, 2)(3); // $ExpectType string
        curry3(1, 2, 3); // $ExpectType string
    });

    it('curry4 test', () => {
        const curry4 = F.curry((a: 1, b: 2, c: 3, d: 4) => '5');
        curry4(1)(2)(3)(4); // $ExpectType string
        curry4(1)(2)(3, 4); // $ExpectType string
        curry4(1)(2, 3)(4); // $ExpectType string
        curry4(1)(2, 3, 4); // $ExpectType string
        curry4(1, 2)(3)(4); // $ExpectType string
        curry4(1, 2)(3, 4); // $ExpectType string
        curry4(1, 2, 3)(4); // $ExpectType string
        curry4(1, 2, 3, 4); // $ExpectType string
    });
});

///
/// prelude.js
///
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
});

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
        const a = [1, Promise.resolve('a'), Promise.resolve(2), 'b'];

        const r0 = await F.run(a, F.head); // $ExpectType string | number
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
});

describe('fmap', () => {
    it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.fmap<typeof a, number>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.fmap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [[1], [Promise.resolve(2)], Promise.resolve([3]), [4], [5]];

        const r0 = F.fmap<typeof a, number>(async e => F.fmap(async e1 => e1, e))(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.fmap(async e => F.fmap(async e1 => F.fmap(async e2 => e2, e1), e), a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.fmap<typeof a, string>(e => F.fmap(e1 => e1, e))(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.fmap(e => F.fmap(e1 => e1, e), a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.fmap<typeof a, number[] | string[] | Promise<string>[] | Promise<number>[]>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.fmap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('flatMap', () => {
    it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.fmap<typeof a, number>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.fmap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [[1], [Promise.resolve(2)], Promise.resolve([3]), [4], [5]];

        const r0 = F.fmap<typeof a, number>(async e => F.fmap(async e1 => e1, e))(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.fmap(async e => F.fmap(async e1 => F.fmap(async e2 => e2, e1), e), a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.fmap<typeof a, string>(e => F.fmap(e1 => e1, e))(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.fmap(e => F.fmap(e1 => e1, e), a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.fmap<typeof a, number[] | string[] | Promise<string>[] | Promise<number>[]>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.fmap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
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
        const r10 = F.dflat(a, b, c, a, b, c, a, b, c, a, b, c); // $ExpectType AsyncIterableIterator<any>
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
        const r2 = await F.foldl((acc, e) => acc + e, 0)(a); // $ExpectType number
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
});

///
/// stream.js
///
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

        const r0 = F.buffer<number>(1)(a); // $ExpectType AsyncIterableIterator<[number]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<[number]>
    });

    it('from Promise Value', async () => {
        const a = [1, 2, Promise.resolve(3), 4, 5];

        const r0 = F.buffer<number>(1)(a); // $ExpectType AsyncIterableIterator<[number]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<[number]>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.buffer<string>(1)(a); // $ExpectType AsyncIterableIterator<[string]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<[string]>
    });

    it('from Normal / Promsie Union', async () => {
        const a = [1, Promise.resolve(2), 'a', Promise.resolve('b')];

        const r0 = F.buffer<string | number>(1)(a); // $ExpectType AsyncIterableIterator<[string | number]>
        const r1 = F.buffer(2, a); // $ExpectType AsyncIterableIterator<[string | number]>
    });
});

///
/// tsql.js
///
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

        const r0 = await F.groupBy<string, string | number>(e => typeof e)(a);
        const r1 = await F.groupBy(e => typeof e, a);
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
});

///
/// timer.js
///
describe('sleep', () => {
    it('', async () => {
        await F.sleep(50); // $ExpectType void
    });
});

describe('withTimeout', () => {
    it('from Normal Duration', () => {
        const testDurationFunction = (t: number) => () => t;

        const a = F.map(async e => {
            await F.sleep(5);
            return e;
        }, [1, 2, 3, 4, 5]);

        const r0 = F.withTimeout<number>(50)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.withTimeout<number>(testDurationFunction(50))(a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.withTimeout(50, a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.withTimeout(testDurationFunction(50), a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Duration', () => {
        const testDurationFunction = (t: number) => async () => t;

        const a = [1, 2, 3, Promise.resolve(4), 5];

        const r0 = F.withTimeout<number>(50)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.withTimeout<number>(testDurationFunction(50))(a); // $ExpectType AsyncIterableIterator<number>
        const r2 = F.withTimeout(50, a); // $ExpectType AsyncIterableIterator<number>
        const r3 = F.withTimeout(testDurationFunction(50), a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Normal / Promise Union', async () => {
        const testDurationFunction = (t: number) => () => t;

        const a = [Promise.resolve(1), 2, 'a', Promise.resolve('b')];

        const r0 = F.withTimeout<string | number>(50)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.withTimeout<string | number>(testDurationFunction(50))(a); // $ExpectType AsyncIterableIterator<string | number>
        const r2 = F.withTimeout(50, a); // $ExpectType AsyncIterableIterator<string | number>
        const r3 = F.withTimeout(testDurationFunction(50), a); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('timeout', () => {
    it('from Normal Duration', async () => {
        const testDurationFunction = (t: number) => () => t;

        const testTimeoutFuncA = async (t: number) => {
            await F.sleep(t);
            return 'hello';
        };

        const testTimeoutFuncB = async (t: number) => {
            await F.sleep(t);
            return (async function *() {
                let i = 0;
                yield i;
                i++;
            })();
        };

        try {
            const ar0 = await F.timeout<string>(50)(testTimeoutFuncA(42)).then(F.ioe); // $ExpectType string
            const ar1 = await F.timeout<string>(testDurationFunction(50))(testTimeoutFuncA(43)).then(F.ioe); // $ExpectType string
            const ar2 = await F.timeout(50, testTimeoutFuncA(48)).then(F.ioe); // $ExpectType string
            const ar3 = await F.timeout(testDurationFunction(50), testTimeoutFuncA(46)).then(F.ioe); // $ExpectType string

            const br0 = await F.timeout<AsyncIterableIterator<number>>(38)(testTimeoutFuncB(27)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
            const br1 = await F.timeout<AsyncIterableIterator<number>>(testDurationFunction(49))(testTimeoutFuncB(84)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
            const br2 = await F.timeout(53, testTimeoutFuncB(23)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
            const br3 = await F.timeout(testDurationFunction(59), testTimeoutFuncB(51)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
        } catch (e) {
            if (e.message === 'timeout error') {
                return;
            }
            throw e;
        }
    });

    it('from Promise Duration', async () => {
        const testDurationFunction = (t: number) => async () => t;

        const testTimeoutFuncA = async (t: number) => {
            await F.sleep(t);
            return 'hello';
        };

        const testTimeoutFuncB = async (t: number) => {
            await F.sleep(t);
            return (async function *() {
                let i = 0;
                yield i;
                i++;
            })();
        };

        try {
            const ar0 = await F.timeout<string>(50)(testTimeoutFuncA(42)).then(F.ioe); // $ExpectType string
            const ar1 = await F.timeout<string>(testDurationFunction(50))(testTimeoutFuncA(43)).then(F.ioe); // $ExpectType string
            const ar2 = await F.timeout(50, testTimeoutFuncA(48)).then(F.ioe); // $ExpectType string
            const ar3 = await F.timeout(testDurationFunction(50), testTimeoutFuncA(46)).then(F.ioe); // $ExpectType string

            const br0 = await F.timeout<AsyncIterableIterator<number>>(38)(testTimeoutFuncB(27)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
            const br1 = await F.timeout<AsyncIterableIterator<number>>(testDurationFunction(49))(testTimeoutFuncB(84)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
            const br2 = await F.timeout(53, testTimeoutFuncB(23)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
            const br3 = await F.timeout(testDurationFunction(59), testTimeoutFuncB(51)).then(F.ioe); // $ExpectType AsyncIterableIterator<number>
        } catch (e) {
            if (e.message !== 'timeout error') {
                return;
            }
            throw e;
        }
    });
});

describe('interval', () => {
    it('', () => {
        let intervalCount = 0;

        const r0 = F.interval(50, async (a: number, b: string, c: number) => { // $ExpectType { run: boolean; }
            await F.run(F.range(5), F.then(async _ => {
                /// work
                intervalCount++;
                if (intervalCount >= 5) {
                    r0.run = false;
                }
            }));
        }, 1, 'hello', 2);
    });
});

describe('rangeInterval', () => {
    it('', () => {
        F.rangeInterval(50); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(Promise.resolve(50)); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(() => 50); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(async () => 50); // $ExpectType AsyncIterableIterator<number>

        F.rangeInterval(50, 5); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(Promise.resolve(50), 5); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(() => 50, 5); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(async () => 50, 5); // $ExpectType AsyncIterableIterator<number>

        F.rangeInterval(50, 0, 5); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(Promise.resolve(50), 0, 5); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(() => 50, 0, 5); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(async () => 50, 0, 5); // $ExpectType AsyncIterableIterator<number>

        F.rangeInterval(50, 0, 5, 1); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(Promise.resolve(50), 0, 5, 1); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(() => 50, 0, 5, 1); // $ExpectType AsyncIterableIterator<number>
        F.rangeInterval(async () => 50, 0, 5, 1); // $ExpectType AsyncIterableIterator<number>
    });
});

//
// generator.js
//
describe('repeat', () => {
    it('from Normal Value', async () => {
        const ar0 = F.repeat('hello'); // $ExpectType AsyncIterableIterator<string>
        const ar1 = F.repeat(() => 'hello'); // $ExpectType AsyncIterableIterator<string>

        const br0 = F.repeat(20, 'hello'); // $ExpectType AsyncIterableIterator<string>
        const br1 = F.repeat(20, () => 'hello'); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Promise Value', async () => {
        const ar0 = F.repeat(Promise.resolve('world')); // $ExpectType AsyncIterableIterator<string>
        const ar1 = F.repeat(async () => 'world'); // $ExpectType AsyncIterableIterator<string>

        const br0 = F.repeat(20, Promise.resolve('world')); // $ExpectType AsyncIterableIterator<string>
        const br1 = F.repeat(20, async () => 'world'); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Promise Wrapped Function Supply', async () => {
        const ar0 = F.repeat(Promise.resolve(() => 'hello world')); // $ExpectType AsyncIterableIterator<string>
        const br0 = F.repeat(20, Promise.resolve(() => 'hello world')); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Return Value is Function', async () => {
        const ar0 = await F.run(F.repeat(5, () => () => 1)); // $ExpectType AsyncIterableIterator<() => 1>
        const ar1 = await F.run(F.repeat(5, () => () => () => 'a')); // $ExpectType AsyncIterableIterator<() => () => "a">
        const ar2 = await F.run(F.repeat(5, () => () => () => () => 2)); // $ExpectType AsyncIterableIterator<() => () => () => 2>
        const br0 = await F.run(F.repeat(5, () => async () => 3)); // $ExpectType AsyncIterableIterator<() => Promise<number>>
        const br1 = await F.run(F.repeat(5, () => async () => async () => 'c' as string)); // $ExpectType AsyncIterableIterator<() => Promise<() => Promise<string>>>
        const br2 = await F.run(F.repeat(5, () => () => async () => async () => 4 as number)); // $ExpectType AsyncIterableIterator<() => () => Promise<() => Promise<number>>>
    });

    it('with run', async () => {
        const r0 = await F.run([Promise.resolve(1), 2, 'a'], (e) => F.repeat(e)); // $ExpectType AsyncIterableIterator<(string | number | Promise<number>)[]>
        const r1 = await F.run(Promise.resolve('a'), (e) => F.repeat(10, e)); // $ExpectType AsyncIterableIterator<string>
        const r2 = await F.run('a', (e) => F.repeat(Promise.resolve(10), e)); // $ExpectType AsyncIterableIterator<string>
    });
});

describe('range', () => {
    it('', async () => {
        const r0 = F.range(); // $ExpectType IterableIterator<number>
        const r1 = F.range(5); // $ExpectType IterableIterator<number>
        const r2 = F.range(0, 5); // $ExpectType IterableIterator<number>
        const r3 = F.range(0, 5, 1); // $ExpectType IterableIterator<number>
    });
});

describe('iterate', () => {
    it('from Normal Value', async () => {
        const r0 = F.iterate(F.inc, 0); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.iterate(F.inc, 0); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const r0 = F.iterate<number>(F.inc)(Promise.resolve(0)); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.iterate(F.inc, Promise.resolve(0)); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Normal Array', async () => {
        const fibo = (a: number[]) => [a[1], a[0] + a[1]];

        const r0 = F.iterate<number[]>(fibo)([0, 1]); // $ExpectType AsyncIterableIterator<number[]>
        const r1 = F.iterate(fibo, [0, 1]); // $ExpectType AsyncIterableIterator<number[]>
    });

    it('from Promise Array', async () => {
        const fibo = (a: number[]) => [a[0], a[0] + a[1]];

        const r0 = F.iterate<number[]>(fibo)(Promise.resolve([0, 1])); // $ExpectType AsyncIterableIterator<number[]>
        const r1 = F.iterate(fibo, Promise.resolve([0, 1])); // $ExpectType AsyncIterableIterator<number[]>
    });
});

//
// parellel.js
//
describe('parallel_set_fetch_count', () => {
    it('', () => {
        F.parallel_set_fetch_count(200);
    });
});

describe('pmap', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const r0 = F.pmap<number, number>(e => e ** e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pmap(e => e ** e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.pmap<string, string>(e => e + e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.pmap(e => e + e, a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5, 6, 7, 8, 9, Promise.resolve(10)];

        const r0 = F.pmap<number, number>(e => e ** e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pmap(e => e ** e, a); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('pfilter', () => {
    it('from Normal Value', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const r0 = F.pfilter<number>(e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pfilter(e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.pfilter<string>(e => e === 'l')(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.pfilter(e => e === 'l', a); // $ExpectType AsyncIterableIterator<string>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve(1), 2, 3, 4, 5, 6, 7, 8, 9, Promise.resolve(10)];

        const r0 = F.pfilter<number>(e => e % 2 === 0)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pfilter(e => e % 2 === 0, a); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('pcalls', () => {
    it('from Generator Function', async () => {
        function* gfn0() {
            yield () => 1;
            yield () => 2;
            yield async () => 3;
            yield async () => (async () => 4)();
        }

        const r0 = F.pcalls(gfn0()); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Async Generator Function', async () => {
        async function* gfn0() {
            yield () => 1;
            yield () => 2;
            yield async () => 3;
            yield async () => (async () => 4)();
        }
        const r0 = F.pcalls(gfn0()); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Normal Functions / Async Functions', async () => {
        const fn0 = () => 1;
        const fn1 = () => 2;
        const fn2 = async () => 3;
        const fn3 = async () => (async () => 4)();

        const r0 = F.pcalls(fn0, fn1, fn2, fn3); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Parameter Length 10 or Less and Union Type', async () => {
        function* gfn0() {
            yield () => 1;
            yield () => 'a';
            yield async () => 3;
            yield async () => (async () => 'b')();
        }

        const fn0 = () => 1;
        const fn1 = () => 'a';
        const fn2 = async () => 3;
        const fn3 = async () => (async () => 'b')();

        const r0 = F.pcalls(gfn0()); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.pcalls(fn0, fn1, fn2, fn3); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('from Parameter Length Unknown or Over 10 and Union Type', async () => {
        const a = await F.run(F.repeat(5, () => () => 1));
        const b = await F.run(F.repeat(5, () => () => 'a'));
        const c = await F.run(F.repeat(5, () => async () => 2));
        const d = await F.run(F.repeat(5, () => async () => 'b'));
        const abcd = await F.run(F.concat(a, b), F.concat(c), F.concat(d), e => F.collect(e));

        const r0 = F.pcalls<number | string>(...abcd); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.pcalls(...abcd); // $ExpectType AsyncIterableIterator<any>
    });
});

describe('pfmap', () => {
    it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.pfmap<typeof a, number[]>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pfmap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve([1]), [Promise.resolve(2)], [3], [4], [5]];

        const r0 = F.pfmap<typeof a, F.PFlat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pfmap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.pfmap<typeof a, string>(e => e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.pfmap(e => [[e]], a); // $ExpectType AsyncIterableIterator<string[]>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.pfmap<typeof a, F.PFlat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.pfmap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
    });
});
