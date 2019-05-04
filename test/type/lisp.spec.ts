import * as F from '../..';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

const thanos = () => Math.random() >= 0.5;
const asyncThanos = async () => thanos();

describe('cond', () => {
    it('from Normal Value', async () => {
        const r0 = await F.cond(thanos, 1); // $ExpectType number | undefined
        const r1 = await F.cond(thanos, 1, thanos, 'a'); // $ExpectType string | number | undefined
    });

    it('from Promise Value', async () => {
        const r0 = await F.cond(asyncThanos, Promise.resolve(1)); // $ExpectType number | undefined
        const r1 = await F.cond(asyncThanos, Promise.resolve(1), asyncThanos, Promise.resolve('a')); // $ExpectType string | number | undefined
    });

    it('from Function', async () => {
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
        const r0 = await F.cond(thanos, 1, asyncThanos, 2, F.otherwise, 'a'); // $ExpectType string | number
        const r1 = await F.cond(thanos, 'a', thanos, Promise.resolve(1), asyncThanos, 2, thanos, Promise.resolve('b'), F.otherwise, null); // $ExpectType string | number | null
    });
});

/* describe('condv', () => {
    it('from Normal Value', async () => {
        const r0 = await F.condv('Thanos', (v) => thanos(), 'lives');
        const r1 = await F.condv('Thanos', (v) => thanos(), 'lives', (v) => thanos(), 'lives');
    })
}) */
