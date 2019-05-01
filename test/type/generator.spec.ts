import * as F from '../../';

type Done = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: Done) => any): void;

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
        const ar0 = F.repeat(5, () => () => 1); // $ExpectType AsyncIterableIterator<() => 1>
        const ar1 = F.repeat(5, () => () => () => 'a'); // $ExpectType AsyncIterableIterator<() => () => "a">
        const ar2 = F.repeat(5, () => () => () => () => 2); // $ExpectType AsyncIterableIterator<() => () => () => 2>
        const ar3 = F.repeat(5, () => () => () => () => () => () => () => 2); // $ExpectType AsyncIterableIterator<() => () => () => () => () => () => 2>

        const br0 = F.repeat(5, () => async () => 3); // $ExpectType AsyncIterableIterator<() => Promise<number>>
        const br1 = F.repeat(5, () => async () => async () => 'c' as string); // $ExpectType AsyncIterableIterator<() => Promise<() => Promise<string>>>
        const br2 = F.repeat(5, () => () => async () => async () => 4 as number); // $ExpectType AsyncIterableIterator<() => () => Promise<() => Promise<number>>>
    });

    it('with run', async () => {
        const r0 = await F.run([Promise.resolve(1), 2, 'a'], (e) => F.repeat(e)); // $ExpectType AsyncIterableIterator<(string | number | Promise<number>)[]>
        const r1 = await F.run(Promise.resolve('a'), (e) => F.repeat(10, e)); // $ExpectType AsyncIterableIterator<string>
        const r2 = await F.run('a', (e) => F.repeat(Promise.resolve(10), e)); // $ExpectType AsyncIterableIterator<string>
    });
});

describe('range', () => {
    it('range', async () => {
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
