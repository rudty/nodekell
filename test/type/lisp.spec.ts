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
        const arr = [1,
            Promise.resolve(2),
            'c',
            Promise.resolve(4),
            Promise.resolve(5)];

        const r0 = F.juxtA([add])(arr); // $ExpectType Promise<(string | number)[]>
        await r0; // $ExpectType (string | number)[]

        const r1 = F.juxtA([add], arr); // $ExpectType Promise<(string | number)[]>
        await r1; // $ExpectType (string | number)[]
    });
});
