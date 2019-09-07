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

    it('equals', () => {
        const equals0 = F.equals(2)(1); // $ExpectType boolean
        const equals1 = F.equals(1, 2); // $ExpectType boolean
    });
});

describe('get', () => {
    describe('from Map', () => {
        const a = new Map([['a', 1]]);
        const b = new Map([[1, 'a']]);

        it('has property or key', () => {
            const ar0 = F.get<typeof a, 'get'>('get')(a); // $ExpectType number | ((key: string) => number | undefined)
            const ar1 = F.get('size', a); // $ExpectType number

            const br0 = F.get<typeof b, 'set'>('set')(b); // $ExpectType (key: number, value: string) => Map<number, string>
            const br1 = F.get('size', b); // $ExpectType number
        });

        it('has key', () => {
            const ar0 = F.get<typeof a, 'a'>('a')(a); // $ExpectType number | undefined
            const ar1 = F.get('b', a); // $ExpectType number | undefined

            const br0 = F.get<typeof b, 1>(1)(b); // $ExpectType string | undefined
            const br1 = F.get(2, b); // $ExpectType string | undefined
        });

        it('has not property', () => {
            const r0 = F.get<typeof a, 1>(1)(a); // $ExpectType undefined
            const r1 = F.get('d', b); // $ExpectType undefined
        });
    });

    describe('from Object', () => {
        const a = { a: 1, b: 'a', get: 'get' };
        const b = { a: 1, b: 'a', get: () => {} };

        it('has property', () => {
            const ar0 = F.get<typeof a, 'get'>('get')(a); // $ExpectType string
            const ar1 = F.get('b', a); // $ExpectType string

            const br0 = F.get<typeof b, 'b'>('b')(b); // $ExpectType string
            const br1 = F.get('get', b); // $ExpectType () => void
        });

        it('has not property', () => {
            const r0 = F.get<typeof a, 'c'>('c')(a); // $ExpectType undefined
            const r1 = F.get('d', b); // $ExpectType undefined
        });
    });

    describe('from Array', () => {
        const a = [1, 2, 3, 4, 5, 6];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];

        it('index', () => {
            const ar0 = F.get<typeof a, 0>(0, a); // $ExpectType number | undefined
            const ar1 = F.get(190, a); // $ExpectType number | undefined

            const br0 = F.get<typeof b, 0>(0, b); // $ExpectType string | undefined
            const br1 = F.get(190, b); // $ExpectType string | undefined
        });

        it('has property', () => {
            const ar0 = F.get<typeof a, 'length'>('length', a); // $ExpectType number
            const ar1 = F.get('reverse', a); // $ExpectType () => number[]

            const br0 = F.get<typeof b, 'length'>('length', b); // $ExpectType number
            const br1 = F.get('reverse', b); // $ExpectType () => string[]
        });

        it('has not property', () => {
            const r0 = F.get<typeof a, 'n'>('n')(a); // $ExpectType undefined
            const r1 = F.get('d', b); // $ExpectType undefined
        });
    });

    it('get & sort array', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }];
        const r0 = F.sortBy(F.get('value'), F.asc, a); // $ExpectType AsyncIterableIterator<{ value: number; }>
    });
});

describe('has', () => {
    it('string', () => {
        const a = 'hello world';

        const r0 = F.has('length')(a); // $ExpectType boolean
        const r1 = F.has('length', a); // $ExpectType boolean
    });

    it('has not property in type', () => {
        const a = {};

        const r0 = F.has('abcd')(a); // $ExpectType boolean
        const r1 = F.has('efgh', a); // $ExpectType boolean
    });

    it('with filter', () => {
        const a = ['hello', 1234];

        const r0 = F.filter(F.has('toFixed'), a); // $ExpectType AsyncIterableIterator<string | number>
    });
});

describe('prop', () => {
    it('string', () => {
        const a = 'hello world';

        const r0 = F.prop<string, 'valueOf'>('valueOf')(a); // $ExpectType () => string
        const r1 = F.prop('length', a); // $ExpectType number
    });

    it('with sortBy', () => {
        const a = ['hello world', 'a', 'ab', 'abcde', 'abcd', 'abc'];

        const r0 = F.sortBy(F.prop('length'), F.asc, a); // $ExpectType AsyncIterableIterator<string>
    });
});

describe('getOrElse', () => {
    describe('from Map', () => {
        const a = new Map([['a', 1]]);
        const b = new Map([[1, 'a']]);

        it('has property or key', () => {
            const ar0 = F.getOrElse<typeof a, 0, 'get'>('get', 0)(a); // $ExpectType number | ((key: string) => number | undefined)
            const ar1 = F.getOrElse('size', "hello" + 0, a); // $ExpectType string | number

            const br0 = F.getOrElse<typeof b, number, 'set'>('set')(0, b); // $ExpectType number | ((key: number, value: string) => Map<number, string>)
            const br1 = F.getOrElse('size', 0, b); // $ExpectType number
        });

        it('has key', () => {
            const ar0 = F.getOrElse<typeof a, string, 'a'>('a', 'b')(a); // $ExpectType string | number | undefined
            const ar1 = F.getOrElse('b', 0, a); // $ExpectType number | undefined

            const br0 = F.getOrElse<typeof b, string, 1>(1, "hello")(b); // $ExpectType string | undefined
            const br1 = F.getOrElse(2, "world", b); // $ExpectType string | undefined
        });

        it('has not property', () => {
            const r0 = F.getOrElse<typeof a, number, 1>(1, 1)(a); // $ExpectType number
            const r1 = F.getOrElse('d', 'a' + 0, b); // $ExpectType string
        });
    });

    describe('from Object', () => {
        const a = { a: 1, b: 'a', get: 'get' };
        const b = { a: 1, b: 'a', get: () => {} };

        it('has property', () => {
            const ar0 = F.getOrElse<typeof a, number, 'get'>('get', 1)(a); // $ExpectType string | number
            const ar1 = F.getOrElse('b', 0 + 0, a); // $ExpectType string | number

            const br0 = F.getOrElse<typeof b, number, 'b'>('b')(0, b); // $ExpectType string | number
            const br1 = F.getOrElse('get', 2 + 1, b); // $ExpectType number | (() => void)
        });

        it('has not property', () => {
            const r0 = F.getOrElse<typeof a, number, 'c'>('c', 1)(a); // $ExpectType number
            const r1 = F.getOrElse('d', 2 + 0, b); // $ExpectType number
        });
    });

    describe('from Array', () => {
        const a = [1, 2, 3, 4, 5, 6];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];

        it('index', () => {
            const ar0 = F.getOrElse<typeof a, string, 0>(0, "a" + "a", a); // $ExpectType string | number | undefined
            const ar1 = F.getOrElse(190, "a" + "a", a); // $ExpectType string | number | undefined

            const br0 = F.getOrElse<typeof b, number, 0>(0, 1 + 0, b); // $ExpectType string | number | undefined
            const br1 = F.getOrElse(190, 0 + 0, b); // $ExpectType string | number | undefined
        });

        it('has property', () => {
            const ar0 = F.getOrElse<typeof a, number, 'length'>('length', 0, a); // $ExpectType number
            const ar1 = F.getOrElse('reverse', () => 3 + 0, a); // $ExpectType (() => number[]) | (() => number)

            const br0 = F.getOrElse<typeof b, number, 'length'>('length', 0, b); // $ExpectType number
            const br1 = F.getOrElse('reverse', 3 + 0, b); // $ExpectType number | (() => string[])
        });

        it('has not property', () => {
            const r0 = F.getOrElse<typeof a, number, 'n'>('n', 3)(a); // $ExpectType number
            const r1 = F.getOrElse('d', 3 + 0, b); // $ExpectType number
        });
    });

    it('get & sort array', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }];
        const r0 = F.sortBy(F.getOrElse('value', 0), F.asc, a); // $ExpectType AsyncIterableIterator<{ value: number; }>
    });
});

describe('propOrElse', () => {
    it('string', () => {
        const a = 'hello world';

        const r0 = F.propOrElse<string, string, 'valueOf'>('valueOf', "a")(a); // $ExpectType string | (() => string)
        const r1 = F.propOrElse('length', 3 + 0, a); // $ExpectType number
    });

    it('with sortBy', () => {
        const a = ['hello world', 'a', 'ab', 'abcde', 'abcd', 'abc'];

        const r0 = F.sortBy(F.propOrElse('length', 0), F.asc, a); // $ExpectType AsyncIterableIterator<string>
    });
});
