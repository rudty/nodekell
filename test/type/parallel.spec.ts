import * as F from '../..';

type Done = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: Done) => any): void;

describe('parallel_set_fetch_count', () => {
    it('parallel_set_fetch_count', () => {
        F.parallel_set_fetch_count(200); // $ExpectType void
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
        const fn3 = async () => (async () => 4);

        const r0 = F.pcalls(fn0, fn1, fn2, fn3); // $ExpectType AsyncIterableIterator<number | (() => Promise<number>)>
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

    it('from Many Parameters', async () => {
        const a = F.repeat(5, () => () => 1);
        const b = F.repeat(5, () => () => 'a');
        const c = F.repeat(5, () => async () => 2);
        const d = F.repeat(5, () => async () => 'b');
        const abcd = await F.run(F.concat(a, b), F.concat(c), F.concat(d), F.collect);

        const r0 = F.pcalls(...abcd, ...abcd, ...abcd, ...abcd); // $ExpectType AsyncIterableIterator<string | number>
	});

	it('use Generic', async () => {
		const a = F.repeat(5, () => () => 1);
        const b = F.repeat(5, () => () => 'a');
        const c = F.repeat(5, () => async () => 2);
        const d = F.repeat(5, () => async () => 'b');
        const abcd = await F.run(F.concat(a, b), F.concat(c), F.concat(d), F.collect);

        const r0 = F.pcalls<string | number>(...abcd, ...abcd, ...abcd, ...abcd); // $ExpectType AsyncIterableIterator<string | number>
	});
});

describe('pfmap', () => {
    it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.pfmap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pfmap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve([1]), [Promise.resolve(2)], [3], [4], [5]];

        const r0 = F.pfmap<F.Flat<typeof a>>(async e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pfmap(async e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.pfmap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.pfmap(e => [[e]], a); // $ExpectType AsyncIterableIterator<string[]>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.pfmap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.pfmap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
	});

	it('wrap array', async () => {
		const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

		const r0 = F.pfmap<F.Flat<typeof a>, F.PFlat<typeof a>[]>(e => [e])(a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
		const r1 = F.pfmap(e => [e], a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
	});

    it('with run', async () => {
        const a = [[1], Promise.resolve(['a']), [4], [5], [Promise.resolve('b')]];
        const b = [[1], Promise.resolve([2]), Promise.resolve([3]), [4], [5]];

        const ar0 = await F.run(a, F.pfmap(e => { // $ExpectType AsyncIterableIterator<string | number>
            e; // $ExpectType string[] | number[] | Promise<string>[]
            return e;
        }));

        const br0 = await F.run(b, F.pfmap(e => e)); // $ExpectType AsyncIterableIterator<number>
    });
});

describe('pflatMap', () => {
    it('from Normal Value', async () => {
        const a = [[1], [2], [3], [4], [5]];

        const r0 = F.pflatMap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pflatMap(e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from Promise Value', async () => {
        const a = [Promise.resolve([1]), [Promise.resolve(2)], [3], [4], [5]];

        const r0 = F.pflatMap<F.Flat<typeof a>>(async e => e)(a); // $ExpectType AsyncIterableIterator<number>
        const r1 = F.pflatMap(async e => e, a); // $ExpectType AsyncIterableIterator<number>
    });

    it('from String', async () => {
        const a = 'hello world';

        const r0 = F.pflatMap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string>
        const r1 = F.pflatMap(e => [[e]], a); // $ExpectType AsyncIterableIterator<string[]>
    });

    it('from Normal / Promise Union', async () => {
        const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

        const r0 = F.pflatMap<F.Flat<typeof a>>(e => e)(a); // $ExpectType AsyncIterableIterator<string | number>
        const r1 = F.pflatMap(e => e, a); // $ExpectType AsyncIterableIterator<string | number>
	});

	it('wrap array', async () => {
		const a = [[1], [Promise.resolve('a')], [2], [Promise.resolve(3)], Promise.resolve([4]), Promise.resolve(['b'])];

		const r0 = F.pflatMap<F.Flat<typeof a>, F.PFlat<typeof a>[]>(e => [e])(a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
		const r1 = F.pflatMap(e => [e], a); // $ExpectType AsyncIterableIterator<string[] | number[] | Promise<number>[] | Promise<string>[]>
	});

    it('with run', async () => {
        const a = [[1], Promise.resolve(['a']), [4], [5]];
        const b = [[1], Promise.resolve([2]), Promise.resolve([3]), [4], [5]];

        const ar0 = await F.run(a, e0 => F.pflatMap(e1 => e1, e0)); // $ExpectType AsyncIterableIterator<string | number>

        const br0 = await F.run(b, F.pflatMap(e => e)); // $ExpectType AsyncIterableIterator<number>
    });
});
