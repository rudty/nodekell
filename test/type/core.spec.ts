import * as F from '../../';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

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

describe('utils', () => {
    it('seq', async () => {
        const range0 = F.range(0, 5, 1); // $ExpectType IterableIterator<number>
        const range1 = F.range(5); // $ExpectType IterableIterator<number>

        const seq0 = F.seq(['1', '2', '3', '4']); // $ExpectType AsyncIterableIterator<string>
        const seq1 = F.seq(range1); // $ExpectType AsyncIterableIterator<number>
        const seq2 = F.seq(seq1); // $ExpectType AsyncIterableIterator<number>
        const seq3 = F.seq('hello'); // $ExpectType AsyncIterableIterator<string>
        const seq4 = F.seq([Promise.resolve(1), 2, 'a', Promise.resolve('b'), 3, 4]); // $ExpectType AsyncIterableIterator<string | number>

        const seq5 = await F.run([Promise.resolve(1), 2, 'a', Promise.resolve('b'), 3, 4], F.seq); // $ExpectType AsyncIterableIterator<string | number>
    });

    it('identity', () => {
        const identity = F.identity(null); // $ExpectType null
    });

    it('fnothing', () => {
        const fnothing = F.fnothing(); // $ExpectType void
    });

    it('add', () => {
        const adds = F.add('1', '2'); // $ExpectType string
        const addn = F.add(1, 2); // $ExpectType number

        const adds1 = F.add('1');
        const adds1s = adds1('2'); // $ExpectType string

        const addn1 = F.add(1);
        const addn1n = addn1(2); // $ExpectType number
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

describe('get', () => {
    it('get & sort array', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }];
        const r = F.sortBy(F.get("value"), F.asc, a); // $ExpectType AsyncIterableIterator<any>
    });
});
