import * as F from '../../';

type DoneFn = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: DoneFn) => any): void;

const thanos = Math.random() >= 0.5;

describe('cond', () => {
    it('error', async () => {
        const e0 = await F.cond(thanos); // $ExpectError
        const e1 = await F.cond(thanos, 1, 'a'); // $ExpectError
    });
});
