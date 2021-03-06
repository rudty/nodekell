import * as F from '../..';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

const thanos = Math.random() >= 0.5;
const thanosp = Promise.resolve(Math.random() >= 0.5);

describe('otherwise', () => {
    it('otherwise', () => {
        const r = F.otherwise(); // $ExpectType true
    });
});

describe('cond', () => {
    it('from Boolean Literal', async () => {
        // tslint:disable-next-line: no-unnecessary-type-assertion
        const pt = Promise.resolve(true) as Promise<true>;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        const pf = Promise.resolve(false) as Promise<false>;

        // use type assertion
        const r0 = await F.cond(true as true, 0, false as false, 1); // $ExpectType number
        const r1 = await F.cond(false as false, 0, true as true, 1); // $ExpectType number
        const r2 = await F.cond(pt, 0, pf, 1); // $ExpectType number
        const r3 = await F.cond(pf, 0, pt, 1); // $ExpectType number

        // don't use type assertion
        // const r4 = await F.cond(true, 0, false, 1); // $ExpectType number
        // const r5 = await F.cond(false, 0, true, 1); // $ExpectType number
        const r6 = await F.cond(Promise.resolve(true), 0, Promise.resolve(false), 1); // $ExpectType number | undefined
        const r7 = await F.cond(Promise.resolve(false), 0, Promise.resolve(true), 1); // $ExpectType number | undefined
    });

    it('from Normal Value', async () => {
        const r0 = await F.cond(thanos, 1); // $ExpectType number | undefined
        const r1 = await F.cond(thanos, 1, thanos, 'a'); // $ExpectType string | number | undefined
    });

    it('from Promise Value', async () => {
        const r0 = await F.cond(thanosp, Promise.resolve(1)); // $ExpectType number | undefined
        const r1 = await F.cond(thanosp, Promise.resolve(1), thanosp, Promise.resolve('a')); // $ExpectType string | number | undefined
    });

    it('from Function Value', async () => {
        const a = (aa: number) => 'a';
        const b = (bb: string) => (bbb: number) => 0;
        const c = async (cc: number) => 'b';
        const d = async (dd: string) => async (ddd: number) => 1;

        // $ExpectType ((aa: number) => string) | ((bb: string) => (bbb: number) => number) | undefined
        const r0 = await F.cond(thanos, a, thanos, b);
        // $ExpectType ((aa: number) => string) | ((bb: string) => (bbb: number) => number) | ((cc: number) => Promise<string>) | ((dd: string) => Promise<(ddd: number) => Promise<number>>) | undefined
        const r1 = await F.cond(thanos, a, thanos, b, thanos, c, thanos, d);
    });

    it('use otherwise', async () => {
        const r0 = await F.cond(thanos, 1, thanosp, 2, F.otherwise, 'a'); // $ExpectType string | number
        const r1 = await F.cond(thanos, 'a', thanos, Promise.resolve(1), thanosp, 2, thanos, Promise.resolve('b'), F.otherwise, null); // $ExpectType string | number | null
    });
});

describe('memoizeBy', () => {
    it('normal', async () => {
        const a = (n: number) => n + n;

        const r0 = F.memoizeBy<(n: number) => number>(n => n)(a); // $ExpectType (n: number) => Promise<number>
        const r1 = await r0(1); // $ExpectType number

        const r2 = F.memoizeBy(n => n, a); // $ExpectType (n: number) => Promise<number>
        const r3 = await r2(1); // $ExpectType number
    });

    it('async', async () => {
        const a = async (n: number) => n + n;

        const r0 = F.memoizeBy<(n: number) => Promise<number>>(n => n)(a); // $ExpectType (n: number) => Promise<number>
        const r1 = await r0(1); // $ExpectType number

        const r2 = F.memoizeBy(n => n, a); // $ExpectType (n: number) => Promise<number>
        const r3 = await r2(2); // $ExpectType number
    });

    it('multiple', async () => {
        const a = (n0: number, n1: number, n2: number) => (n0 + n1) * n2;

        const r0 = F.memoizeBy<(n0: number, n1: number, n2: number) => number>((n0, n1) => [n0, n1])(a); // $ExpectType (n0: number, n1: number, n2: number) => Promise<number>
        const r1 = await r0(1, 2, 3); // $ExpectType number

        const r2 = F.memoizeBy((n0, n1, n2) => [n0, n1, n2], a); // $ExpectType (n0: number, n1: number, n2: number) => Promise<number>
        const r3 = await r2(1, 2, 3); // $ExpectType number
    });

    it('callFn has overload type', async () => {
        const ar0 = F.memoizeBy<(a: number, b: number) => number>((a, b) => [a, b])(F.add); // $ExpectType (a: number, b: number) => Promise<number>
        const ar1 = await ar0(1, 2); // $ExpectType number

        const ar2 = F.memoizeBy<[number, number], number>((a, b) => [a, b], F.add); // $ExpectType (args_0: number, args_1: number) => Promise<number>
        const ar3 = await ar2(1, 2); // $ExpectType number

        const br0 = F.memoizeBy<(a: string, b: string) => string>((a, b) => [a, b])(F.add); // $ExepctType (a: string, b: string) => Promise<string>
        const br1 = await br0('hello', 'world'); // $ExpectType string

        const br2 = F.memoizeBy<[string, string], string>((a, b) => [a, b], F.add); // $ExepctType (args_0: string, args_1: string) => Promise<string>
        const br3 = await br2('hello', 'world'); // $ExpectType string

        const cr0 = F.memoizeBy<((a: string, b: string) => string) | ((a: number, b: number) => number)>((a, b) => [a, b])(F.add);
        const cr1 = await cr0('hello', 'world') as string; // $ExpectType string
        const cr2 = await cr0(1, 2) as number; // $ExpectType number

        const cr3 = F.memoizeBy<((a: string, b: string) => string) | ((a: number, b: number) => number)>((a, b) => [a, b], F.add);
        const cr4 = await cr3('hello', 'world') as string; // $ExpectType string
        const cr5 = await cr3(1, 2) as number; // $ExpectType number

        /* const cr0 = F.memoize<typeof F.add>(F.add); // (a: string) => Promise<(b: string) => string> ???
        const cr1 = cr0(1, 2); // Expected 1 arguments, but got 2. ts(2554) */
    });
});

describe('memoize', () => {
    it('normal', async () => {
        const a = (n: number) => n + n;

        const r0 = F.memoize(a); // $ExpectType (n: number) => Promise<number>
        const r1 = await r0(1); // $ExpectType number
    });

    it('async', async () => {
        const a = async (n: number) => n + n;

        const r0 = F.memoize(a); // $ExpectType (n: number) => Promise<number>
        const r1 = await r0(2); // $ExpectType number
    });

    it('multiple', async () => {
        const a = (n0: number, n1: number, n2: number) => (n0 + n1) * n2;

        const r0 = F.memoize(a); // $ExpectType (n0: number, n1: number, n2: number) => Promise<number>
        const r1 = await r0(1, 2, 3); // $ExpectType number
    });

    it('callFn has overload type', async () => {
        const ar0 = F.memoize<[number, number], number>(F.add); // $ExpectType (args_0: number, args_1: number) => Promise<number>
        const ar1 = await ar0(1, 2); // $ExpectType number

        const br0 = F.memoize<(a: string, b: string) => string>(F.add); // $ExepctType (a: string, b: string) => Promise<string>
        const br1 = await br0('hello', 'world'); // $ExpectType string

        const cr0 = F.memoize<((a: string, b: string) => string) | ((a: number, b: number) => number)>(F.add); // $ExpectType (...args: [number, number] | [string, string]) => Promise<string | number>
        const cr1 = await cr0('hello', 'world') as string; // $ExpectType string
        const cr2 = await cr0(1, 2) as number; // $ExpectType number

        /* const cr0 = F.memoize<typeof F.add>(F.add); // (a: string) => Promise<(b: string) => string> ???
        const cr1 = cr0(1, 2); // Expected 1 arguments, but got 2. ts(2554) */
    });

    // it('callFn is curried')
});

describe('memoizeWithTimeout', () => {
    it('normal', async () => {
        const a = (n: number) => n + n;

        const r0 = F.memoizeWithTimeout<(n: number) => number>(1)(a); // $ExpectType (n: number) => Promise<number>
        const r1 = await r0(1); // $ExpectType number

        const r2 = F.memoizeWithTimeout(1, a); // $ExpectType (n: number) => Promise<number>
        const r3 = await r2(1); // $ExpectType number
    });

    it('async', async () => {
        const a = async (n: number) => n + n;

        const r0 = F.memoizeWithTimeout<(n: number) => Promise<number>>(1)(a); // $ExpectType (n: number) => Promise<number>
        const r1 = await r0(1); // $ExpectType number

        const r2 = F.memoizeWithTimeout(1, a); // $ExpectType (n: number) => Promise<number>
        const r3 = await r2(2); // $ExpectType number
    });

    it('multiple', async () => {
        const a = (n0: number, n1: number, n2: number) => (n0 + n1) * n2;

        const r0 = F.memoizeWithTimeout<(n0: number, n1: number, n2: number) => number>(1)(a); // $ExpectType (n0: number, n1: number, n2: number) => Promise<number>
        const r1 = await r0(1, 2, 3); // $ExpectType number

        const r2 = F.memoizeWithTimeout(1, a); // $ExpectType (n0: number, n1: number, n2: number) => Promise<number>
        const r3 = await r2(1, 2, 3); // $ExpectType number
    });

    it('callFn has overload type', async () => {
        const ar0 = F.memoizeWithTimeout<(a: number, b: number) => number>(1)(F.add); // $ExpectType (a: number, b: number) => Promise<number>
        const ar1 = await ar0(1, 2); // $ExpectType number

        const ar2 = F.memoizeWithTimeout<[number, number], number>(1, F.add); // $ExpectType (args_0: number, args_1: number) => Promise<number>
        const ar3 = await ar2(1, 2); // $ExpectType number

        const br0 = F.memoizeWithTimeout<(a: string, b: string) => string>(1)(F.add); // $ExepctType (a: string, b: string) => Promise<string>
        const br1 = await br0('hello', 'world'); // $ExpectType string

        const br2 = F.memoizeWithTimeout<[string, string], string>(1, F.add); // $ExepctType (args_0: string, args_1: string) => Promise<string>
        const br3 = await br2('hello', 'world'); // $ExpectType string

        const cr0 = F.memoizeWithTimeout<((a: string, b: string) => string) | ((a: number, b: number) => number)>(1)(F.add);
        const cr1 = await cr0('hello', 'world') as string; // $ExpectType string
        const cr2 = await cr0(1, 2) as number; // $ExpectType number

        const cr3 = F.memoizeWithTimeout<((a: string, b: string) => string) | ((a: number, b: number) => number)>(1, F.add);
        const cr4 = await cr3('hello', 'world') as string; // $ExpectType string
        const cr5 = await cr3(1, 2) as number; // $ExpectType number
    });
});

describe('juxtA', () => {
    it('normal', async () => {
        const arr = [1, 2, 3, 4, 5];

        const r0 = F.juxtA([Math.max, Math.min])(arr); // $ExpectType Promise<number[]>
        await r0; // $ExpectType number[]

        const r1 = F.juxtA([Math.max, Math.min], arr); // $ExpectType Promise<number[]>
        await r1; // $ExpectType number[]
    });

    it('promise value', async () => {
        const arr = [Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3),
            Promise.resolve(4),
            Promise.resolve(5)];

        const r0 = F.juxtA([Math.max, Math.min])(arr); // $ExpectType Promise<number[]>
        await r0; // $ExpectType number[]

        const r1 = F.juxtA([Math.max, Math.min], arr); // $ExpectType Promise<number[]>
        await r1; // $ExpectType number[]
    });

    it('promise + number value', async () => {
        const arr = [1,
            Promise.resolve(2),
            3,
            Promise.resolve(4),
            Promise.resolve(5)];

        const r0 = F.juxtA([Math.max, Math.min])(arr); // $ExpectType Promise<number[]>
        await r0; // $ExpectType number[]

        const r1 = F.juxtA([Math.max, Math.min], arr); // $ExpectType Promise<number[]>
        await r1; // $ExpectType number[]
    });

    it('string + number value', async () => {
        const add = (a: string | number, b: string | number) => a.toString() + b.toString();
        const ret0 = (a: string | number, b: string | number) => 0 + 0;
        const arr = [1,
            Promise.resolve(2),
            'c',
            Promise.resolve(4),
            Promise.resolve(5)];

        const r0 = F.juxtA([add])(arr); // $ExpectType Promise<string[]>
        await r0; // $ExpectType string[]

        const r1 = F.juxtA([add], arr); // $ExpectType Promise<string[]>
        await r1; // $ExpectType string[]

        const r2 = F.juxtA([ret0], arr); // $ExpectType Promise<number[]>
        await r2; // $ExpectType number[]

        const r3 = F.juxtA([add, ret0], arr); // $ExpectType Promise<(string | number)[]>
        await r3; // $ExpectType (string | number)[]
    });

    it('number + string value', async () => {
        const add = (a: number, b: number) => a + b;
        const addstr = (a: number, b: number) => a.toString() + b.toString();
        const arr = [1,
            Promise.resolve(2),
            3,
            Promise.resolve(4),
            Promise.resolve(5)];

        const r0 = F.juxtA([add, addstr])(arr); // $ExpectType Promise<(string | number)[]>
        await r0; // $ExpectType (string | number)[]

        const r1 = F.juxtA([add, addstr], arr); // $ExpectType Promise<(string | number)[]>
        await r1; // $ExpectType (string | number)[]
    });
});

describe('juxtO', () => {
    describe('from Map', () => {
        const a = new Map([['a', 1]]);
        const b = new Map([[1, 'a']]);

        it('has property or key', async () => {
            const ar0 = await F.juxtO<typeof a, 'get'>(['get'])(a); // $ExpectType (number | ((key: string) => number | undefined))[]
            const ar1 = await F.juxtO(['size', 'has'], a); // $ExpectType (number | ((key: string) => boolean))[]

            const br0 = await F.juxtO<typeof b, 'set'>(['set'])(b); // $ExpectType ((key: number, value: string) => Map<number, string>)[]
            const br1 = await F.juxtO(['size'], b); // $ExpectType number[]
        });
    });

    describe('from Object', () => {
        const a = { a: 1, b: 'a', get: 'get' };
        const b = { a: 1, b: 'a', get: () => {} };

        it('has property', async () => {
            const ar0 = await F.juxtO<typeof a, 'a' | 'b'>(['b', 'a'])(a); // $ExpectType (string | number)[]
            const ar1 = await F.juxtO(['b', 'a'], a); // $ExpectType (string | number)[]
        });

        it('has not property', async () => {
            const r0 = await F.juxtO<typeof a, 'c' | 'd'>(['c', 'd'])(a); // $ExpectType undefined[]
            const r1 = await F.juxtO(['c', 'd'], b); // $ExpectType undefined[]
        });
    });

    describe('from Array', () => {
        const a = [1, 2, 3, 4, 5, 6];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];

        it('index', async () => {
            const ar0 = await F.juxtO([0], a); // $ExpectType (number | undefined)[]
            const ar1 = await F.juxtO([190], a); // $ExpectType (number | undefined)[]

            const br0 = await F.juxtO([0], b); // $ExpectType (string | undefined)[]
            const br1 = await F.juxtO([190], b); // $ExpectType (string | undefined)[]
        });

        it('has property', async () => {
            const ar0 = await F.juxtO(['length'], a); // $ExpectType number[]
            const ar1 = await F.juxtO(['reverse'], a); // $ExpectType (() => number[])[]

            const br0 = await F.juxtO(['length'], b); // $ExpectType number[]
            const br1 = await F.juxtO(['reverse'], b); // $ExpectType (() => string[])[]

            const cr0 = await F.juxtO(['length', 'reverse'], a); // $ExpectType (number | (() => number[]))[]
            const cr1 = await F.juxtO(['length', 'reverse'], b); // $ExpectType (number | (() => string[]))[]
        });
    });
});

describe('shuffle', () => {
    it('string', () => {
        const s = "Hello World";
        const ar0 = F.shuffle(s);  // $ExpectType string[]
    });

    it('array', () => {
        const arri = [1, 2, 3, 4, 5];
        const ar0 = F.shuffle(arri); // $ExpectType number[]

        const arrs = ["1", "2", "3", "4", "5"];
        const ar1 = F.shuffle(arrs); // $ExpectType string[]

        const arro = [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }];
        const ar2 = F.shuffle(arro); // $ExpectType { a: number; }[]
    });

    it('generator', () => {
        const gi = function*() {
            for (let i = 0; i < 10; ++i) {
                yield i;
            }
        };
        const ar0 = F.shuffle(gi()); // $ExpectType Promise<number[]>

        const gs = function*() {
            for (let i = 0; i < 10; ++i) {
                yield "" + i;
            }
        };
        const ar1 = F.shuffle(gs()); // $ExpectType Promise<string[]>

        const go = function*() {
            for (let i = 0; i < 10; ++i) {
                yield { a: i };
            }
        };
        const ar2 = F.shuffle(go()); // $ExpectType Promise<{ a: number; }[]>
    });

    it('async generator', () => {
        const gi = async function*() {
            for (let i = 0; i < 10; ++i) {
                yield i;
            }
        };
        const ar0 = F.shuffle(gi()); // $ExpectType Promise<number[]>

        const gs = async function*() {
            for (let i = 0; i < 10; ++i) {
                yield "" + i;
            }
        };
        const ar1 = F.shuffle(gs()); // $ExpectType Promise<string[]>

        const go = async function*() {
            for (let i = 0; i < 10; ++i) {
                yield { a: i };
            }
        };
        const ar2 = F.shuffle(go()); // $ExpectType Promise<{ a: number; }[]>
    });
});

describe('sample', () => {
    it('array like', () => {
        const arr = [1, 2, 3, 4, 5];
        const ar0 = F.sample(arr); // $ExpectType number

        const str = "Hello World";
        const ar1 = F.sample(str); // $ExpectType string

        const i32a = new Int32Array(0);
        const ar2 = F.sample(i32a); // $ExpectType number
    });

    it('generator', () => {
        const gi = function*() {
            for (let i = 0; i < 10; ++i) {
                yield i;
            }
        };
        const ar0 = F.sample(gi()); // $ExpectType Promise<number>

        const gs = function*() {
            for (let i = 0; i < 10; ++i) {
                yield "" + i;
            }
        };
        const ar1 = F.sample(gs()); // $ExpectType Promise<string>

        const go = function*() {
            for (let i = 0; i < 10; ++i) {
                yield { a: i };
            }
        };
        const ar2 = F.sample(go()); // $ExpectType Promise<{ a: number; }>
    });
});

describe('match', () => {
    it('match2', () => {
        const arr = [1, 2];
        const r0 = F.match(arr, [1, 2], () => 1 + 1);
        r0; // $ExpectType number | undefined

        const r1 = F.match(arr, [1, 2], async () => 1 + 1);
        r1; // $ExpectType Promise<number> | undefined

        const r2 = F.match(arr, F._, async () => ({}));
        r2; // $ExpectType Promise<{}> | undefined

        const r3 = F.match(arr, [0], async () => ({}));
        r3; // $ExpectType Promise<{}> | undefined

        const r4 = F.match(arr, [0], 1 + 1);
        r4; // $ExpectType number | undefined
    });

    it('match4', () => {
        const arr = [1, 2];
        const r0 = F.match(arr,
            [3, 2], () => 1 + 1,
            [1, 2], () => "2" + 1);
        r0; // $ExpectType string | number | undefined

        const r1 = F.match(arr,
            [1, 2], async () => 1 + 1,
            [3, 4], () => 3 + 1);
        r1; // $ExpectType number | Promise<number> | undefined

        const r2 = F.match(arr, F._, async () => ({}));
        r2; // $ExpectType Promise<{}> | undefined

        const r3 = F.match(arr,
            [3, 2], () => {
                return ([1, 2])[Symbol.iterator]();
            },
            [1, 2], () => "2" + 1);
        r3; // $ExpectType string | IterableIterator<number> | undefined

        const r4 = F.match(arr,
            [3, 2], () => {
                return ([1, 2])[Symbol.iterator]();
            },
            [5, 6], "2" + 1);
        r4; // $ExpectType string | IterableIterator<number> | undefined
    });

    it('match6', () => {
        const arr = [1, 2];
        const r0 = F.match(arr,
            [3, 2], () => 1 + 1,
            [1, 2], () => "2" + 1,
            F._, () => "hello" + 1);
        r0; // $ExpectType string | number | undefined

        const r1 = F.match(arr,
            [3, 2], () => 1 + 1,
            [1, 2], () => "2" + 1,
            F._, () => ({ a: 1, b: 2 }));
        r1; // $ExpectType string | number | { a: number; b: number; } | undefined

        const r2 = F.match(arr,
            [3, 2], () => 1 + 1,
            [1, 2], "2" + 1,
            F._, () => ({ a: 1, b: 2 }));
        r2; // $ExpectType string | number | { a: number; b: number; } | undefined
    });
});

describe('mergeMap', () => {
    it('map map', async () => {
        const m1 = new Map([["a", "b"]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);
        const m3 = new Map([[Promise.resolve(3), Promise.resolve(1)]]);

        const r0 = F.mergeMap(m1, m1); // $ExpectType Promise<Map<string, string>>
        const r1 = F.mergeMap(m1, m2); // $ExpectType Promise<Map<string, string>>
        const r2 = F.mergeMap(m2, m3); // $ExpectType Promise<Map<string | number, string | number>>
        const r3 = F.mergeMap(m1, m1, m1); // $ExpectType Promise<Map<string, string>>
        const r4 = F.mergeMap(m1, m1, m3, m2); // $ExpectType Promise<Map<any, any>>
    });

    it('map object', async () => {
        const o1 = { a: 1 };
        const o2 = { a: Promise.resolve(1) };
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);

        const r0 = F.mergeMap(m1, o1); // $ExpectType Promise<Map<string, string | number>>
        const r1 = F.mergeMap(m1, o2); // $ExpectType Promise<Map<string, string | number>>
        const r2 = F.mergeMap(o1, m1); // $ExpectType Promise<Map<string, string | number>>
        const r3 = F.mergeMap(o1, m2); // $ExpectType Promise<Map<string, string | number>>
    });

    it('object object', async () => {
        const o1 = { a: Promise.resolve("") };
        const o2 = { a: Promise.resolve(1) };
        const o3 = { a: Promise.resolve([1, 2, 3]) };

        const r0 = F.mergeMap(o1, o1); // $ExpectType Promise<Map<string, string>>
        const r1 = F.mergeMap(o1, o2); // $ExpectType Promise<Map<string, string | number>>
        const r2 = F.mergeMap(o1, o3); // $ExpectType Promise<Map<string, string | number[]>>
    });

    it('curry', async () => {
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const o1 = { a: Promise.resolve("") };
        const r0 = F.mergeMap(m1)(m1); // $ExpectType Promise<Map<any, any>>
        const r1 = F.mergeMap(o1)(m1); // $ExpectType Promise<Map<any, any>>
    });
});

describe('mergeMapRight', () => {
    it('map map', async () => {
        const m1 = new Map([["a", "b"]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);
        const m3 = new Map([[Promise.resolve(3), Promise.resolve(1)]]);

        const r0 = F.mergeMapRight(m1, m1); // $ExpectType Promise<Map<string, string>>
        const r1 = F.mergeMapRight(m1, m2); // $ExpectType Promise<Map<string, string>>
        const r2 = F.mergeMapRight(m2, m3); // $ExpectType Promise<Map<string | number, string | number>>
    });

    it('map object', async () => {
        const o1 = { a: 1 };
        const o2 = { a: Promise.resolve(1) };
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);

        const r0 = F.mergeMapRight(m1, o1); // $ExpectType Promise<Map<string, string | number>>
        const r1 = F.mergeMapRight(m1, o2); // $ExpectType Promise<Map<string, string | number>>
        const r2 = F.mergeMapRight(o1, m1); // $ExpectType Promise<Map<string, string | number>>
        const r3 = F.mergeMapRight(o1, m2); // $ExpectType Promise<Map<string, string | number>>
    });

    it('object object', async () => {
        const o1 = { a: Promise.resolve("") };
        const o2 = { a: Promise.resolve(1) };
        const o3 = { a: Promise.resolve([1, 2, 3]) };

        const r0 = F.mergeMapRight(o1, o1); // $ExpectType Promise<Map<string, string>>
        const r1 = F.mergeMapRight(o1, o2); // $ExpectType Promise<Map<string, string | number>>
        const r2 = F.mergeMapRight(o1, o3); // $ExpectType Promise<Map<string, string | number[]>>
    });

    it('curry', async () => {
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const o1 = { a: Promise.resolve("") };
        const r0 = F.mergeMapRight(m1)(m1); // $ExpectType Promise<Map<any, any>>
        const r1 = F.mergeMapRight(o1)(m1); // $ExpectType Promise<Map<any, any>>
    });
});

describe('mergeObject', () => {
    it('map map', async () => {
        const m1 = new Map([["a", "b"]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);
        const m3 = new Map([[Promise.resolve(3), Promise.resolve(1)]]);

        const r0 = F.mergeObject(m1, m1); // $ExpectType Promise<any>
        const r1 = F.mergeObject(m1, m2); // $ExpectType Promise<any>
        const r2 = F.mergeObject(m2, m3); // $ExpectType Promise<any>
    });

    it('map object', async () => {
        const o1 = { a: 1 };
        const o2 = { a: Promise.resolve(1) };
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);

        const r0 = F.mergeObject(m1, o1); // $ExpectType Promise<any>
        const r1 = F.mergeObject(m1, o2); // $ExpectType Promise<any>
        const r2 = F.mergeObject(o1, m1); // $ExpectType Promise<any>
        const r3 = F.mergeObject(o1, m2); // $ExpectType Promise<any>
    });

    it('object object', async () => {
        const o1 = { a: Promise.resolve("") };
        const o2 = { a: Promise.resolve(1) };
        const o3 = { a: Promise.resolve([1, 2, 3]) };

        const r0 = F.mergeObject(o1, o1); // $ExpectType Promise<any>
        const r1 = F.mergeObject(o1, o2); // $ExpectType Promise<any>
        const r2 = F.mergeObject(o1, o3); // $ExpectType Promise<any>
    });

    it('curry', async () => {
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const o1 = { a: Promise.resolve("") };
        const r0 = F.mergeObject(m1)(m1); // $ExpectType Promise<any>
        const r1 = F.mergeObject(o1)(m1); // $ExpectType Promise<any>
    });
});

describe('mergeObjectRight', () => {
    it('map map', async () => {
        const m1 = new Map([["a", "b"]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);
        const m3 = new Map([[Promise.resolve(3), Promise.resolve(1)]]);

        const r0 = F.mergeObjectRight(m1, m1); // $ExpectType Promise<any>
        const r1 = F.mergeObjectRight(m1, m2); // $ExpectType Promise<any>
        const r2 = F.mergeObjectRight(m2, m3); // $ExpectType Promise<any>
    });

    it('map object', async () => {
        const o1 = { a: 1 };
        const o2 = { a: Promise.resolve(1) };
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const m2 = new Map([[Promise.resolve("a"), "b"]]);

        const r0 = F.mergeObjectRight(m1, o1); // $ExpectType Promise<any>
        const r1 = F.mergeObjectRight(m1, o2); // $ExpectType Promise<any>
        const r2 = F.mergeObjectRight(o1, m1); // $ExpectType Promise<any>
        const r3 = F.mergeObjectRight(o1, m2); // $ExpectType Promise<any>
    });

    it('object object', async () => {
        const o1 = { a: Promise.resolve("") };
        const o2 = { a: Promise.resolve(1) };
        const o3 = { a: Promise.resolve([1, 2, 3]) };

        const r0 = F.mergeObjectRight(o1, o1); // $ExpectType Promise<any>
        const r1 = F.mergeObjectRight(o1, o2); // $ExpectType Promise<any>
        const r2 = F.mergeObjectRight(o1, o3); // $ExpectType Promise<any>
    });

    it('curry', async () => {
        const m1 = new Map([["a", Promise.resolve("b")]]);
        const o1 = { a: Promise.resolve("") };
        const r0 = F.mergeObjectRight(m1)(m1); // $ExpectType Promise<any>
        const r1 = F.mergeObjectRight(o1)(m1); // $ExpectType Promise<any>
    });
});

describe('keys', () => {
    it('Map<string, number>', async () => {
        const m1 = new Map([["a", 1]]);

        for await (const e of F.keys(m1)) {
            const p = e + e; // $ExpectType string
        }

        const r0 = await F.collect(F.keys(m1)); // // $ExpectType string[]
    });

    it('Map<Promise<string>, number>', async () => {
        const m1 = new Map([[Promise.resolve("a"), 1]]);

        for await (const e of F.keys(m1)) {
            const p = e + e; // $ExpectType string
        }

        const r0 = await F.collect(F.keys(m1)); // // $ExpectType string[]
    });

    it('Map<Promise<number>, Promise<string>>', async () => {
        const m1 = new Map([[Promise.resolve(3), Promise.resolve(1)]]);

        for await (const e of F.keys(m1)) {
            const p = e + e; // $ExpectType number
        }

        const r0 = await F.collect(F.keys(m1)); // // $ExpectType number[]
    });

    it('object { string: number; }', async () => {
        const m1 = { a: 1 };

        for await (const e of F.keys(m1)) {
            const p = e + e; // $ExpectType string
        }

        const r0 = await F.collect(F.keys(m1)); // // $ExpectType string[]
    });

    it('Set<number>', async () => {
        const m1 = new Set([1, 2, 3]);
        try {
            for await (const e of F.keys(m1)) {
                e; // $ExpectType unknown
            }
        } catch (_) {
        }
    });

    it('Set<number[]>', async () => {
        const m1 = new Set([[1, 1], [2, 2], [3, 3]]);

        for await (const e of F.keys(m1)) {
            const p = e + e; // $ExpectType number
        }
        const r0 = await F.collect(F.keys(m1)); // // $ExpectType number[]
    });

    it('Set<string | number[]>', async () => {
        const m1 = new Set([["1", 1], ["2", 2], ["3", 3]]);

        for await (const e of F.keys(m1)) {
            e; // $ExpectType string | number
        }
        const r0 = await F.collect(F.keys(m1)); // // $ExpectType (string | number)[]
    });

    it('Set<Promise<string> | number[]>', async () => {
        const m1 = new Set([[Promise.resolve("1"), 1], [Promise.resolve("2"), 2], [Promise.resolve("3"), 3]]);

        for await (const e of F.keys(m1)) {
            e; // $ExpectType string | number
        }
        const r0 = await F.collect(F.keys(m1)); // // $ExpectType (string | number)[]
    });

    it('custom iterator', async () => {
        const a = async function *() {
            yield [1, 2];
            yield [3, 4];
            yield [5, 6];
        };

        for await (const e of F.keys(a())) {
            e; // $ExpectType number
        }
    });
});

describe('values', () => {
    it('Map<string, number>', async () => {
        const m1 = new Map([["a", 1]]);

        for await (const e of F.values(m1)) {
            const p = e + e; // $ExpectType number
        }

        const r0 = await F.collect(F.values(m1)); // // $ExpectType number[]
    });

    it('Map<Promise<string>, number>', async () => {
        const m1 = new Map([[Promise.resolve("a"), 1]]);

        for await (const e of F.values(m1)) {
            const p = e + e; // $ExpectType number
        }

        const r0 = await F.collect(F.values(m1)); // // $ExpectType number[]
    });

    it('Map<Promise<number>, Promise<string>>', async () => {
        const m1 = new Map([[Promise.resolve(3), Promise.resolve(1)]]);

        for await (const e of F.values(m1)) {
            const p = e + e; // $ExpectType number
        }

        const r0 = await F.collect(F.values(m1)); // // $ExpectType number[]
    });

    it('object { string: number; }', async () => {
        const m1 = { a: 1 };

        for await (const e of F.values(m1)) {
            const p = e + e; // $ExpectType number
        }

        const r0 = await F.collect(F.values(m1)); // // $ExpectType number[]
    });

    it('Set<number>', async () => {
        const m1 = new Set([1, 2, 3]);
        try {
            for await (const e of F.values(m1)) {
                e; // $ExpectType unknown
            }
        } catch (_) {
        }
    });

    it('Set<number[]>', async () => {
        const m1 = new Set([[1, 1], [2, 2], [3, 3]]);

        for await (const e of F.values(m1)) {
            const p = e + e; // $ExpectType number
        }
        const r0 = await F.collect(F.values(m1)); // // $ExpectType number[]
    });

    it('Set<string | number[]>', async () => {
        const m1 = new Set([["1", 1], ["2", 2], ["3", 3]]);

        for await (const e of F.values(m1)) {
            e; // $ExpectType string | number
        }
        const r0 = await F.collect(F.values(m1)); // // $ExpectType (string | number)[]
    });

    it('Set<string | Promise<number>[]>', async () => {
        const m1 = new Set([["1", Promise.resolve(1)], ["2", Promise.resolve(2)], ["3", Promise.resolve(3)]]);

        for await (const e of F.values(m1)) {
            e; // $ExpectType string | number
        }
        const r0 = await F.collect(F.values(m1)); // // $ExpectType (string | number)[]
    });

    it('custom iterator', async () => {
        const a = async function *() {
            yield [1, 2];
            yield [3, 4];
            yield [5, 6];
        };

        for await (const e of F.keys(a())) {
            e; // $ExpectType number
        }
    });
});

describe('doto', () => {
    it('object this', async () => {
        const r = F.doto({ a: 1 }, function() {
            const self = this; // $ExpectType { a: number; }
            this.a = 3;
        });
        r; // $ExpectType Promise<{ a: number; }>
    });

    it('object arg', async () => {
        const r = F.doto({ a: 1 }, (v) => {
            const p = v; // $ExpectType { a: number; }
        });
        r; // $ExpectType Promise<{ a: number; }>
    });

    it('number', async () => {
        const r = F.doto(1, (v) => {
            const p = v; // $ExpectType number
        });
        r; // $ExpectType Promise<number>
    });

    it('string', async () => {
        const r = F.doto("hello", (v) => {
            const p = v; // $ExpectType string
        });
        r; // $ExpectType Promise<string>
    });

    it('object this2', async () => {
        const r = F.doto({ a: 1 }, function() {
            const self = this; // $ExpectType { a: number; }
            this.a = 3;
        }, function() {
            const self = this; // $ExpectType { a: number; }
            self.a = 1;
        });
        r; // $ExpectType Promise<{ a: number; }>
    });

    it('object arg2', async () => {
        const r = F.doto({ a: 1 }, (v) => {
            const p = v; // $ExpectType { a: number; }
        }, function() {
            const self = this; // $ExpectType { a: number; }
            self.a = 1;
        });
        r; // $ExpectType Promise<{ a: number; }>
    });

    it('number2', async () => {
        const r = F.doto(1, (v) => {
            const p = v; // $ExpectType number
        }, (v) => {
            const p = v; // $ExpectType number
        });
        r; // $ExpectType Promise<number>
    });

    it('string2', async () => {
        const r = F.doto("hello", (v) => {
            const p = v; // $ExpectType string
        }, (v) => {
            const p = v; // $ExpectType string
        });
        r; // $ExpectType Promise<string>
    });
});
