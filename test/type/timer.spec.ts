import * as F from '../../';

type Done = () => any;

declare function describe(s: string, f: () => any): void;
declare function it(s: string, f: (done: Done) => any): void;

describe('sleep', () => {
    it('sleep', async () => {
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

    it('with run', async () => {
        const testDurationFunction = (t: number) => () => t;
        const testDurationAsyncFunction = (t: number) => () => t;

        const a = F.map(async e => {
            await F.sleep(5);
            return e;
        }, [Promise.resolve(1), 2, 'a', Promise.resolve('b'), null]);

        const ar0 = await F.run(a, F.withTimeout<string | number | null>(50)); // $ExpectType AsyncIterableIterator<string | number | null>
        const ar1 = await F.run(a, F.withTimeout<string | number | null>(Promise.resolve(50))); // $ExpectType AsyncIterableIterator<string | number | null>
        const ar2 = await F.run(a, F.withTimeout<string | number | null>(testDurationFunction(50))); // $ExpectType AsyncIterableIterator<string | number | null>
        const ar3 = await F.run(a, F.withTimeout<string | number | null>(testDurationAsyncFunction(50))); // $ExpectType AsyncIterableIterator<string | number | null>

        const br0 = await F.run(a, F.withTimeout(50)); // $ExpectType AsyncIterableIterator<string | number | null>
        const br1 = await F.run(a, F.withTimeout(Promise.resolve(50))); // $ExpectType AsyncIterableIterator<string | number | null>
        const br2 = await F.run(a, F.withTimeout(testDurationFunction(50))); // $ExpectType AsyncIterableIterator<string | number | null>
        const br3 = await F.run(a, F.withTimeout(testDurationAsyncFunction(50))); // $ExpectType AsyncIterableIterator<string | number | null>
    });
});

describe('timeout', () => {
    it('from Normal Duration', () => {
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

		return new Promise(async (resolve, reject) => {
			try {
				const ar0 = await F.timeout<string>(100)(testTimeoutFuncA(42)).then(F.identity); // $ExpectType string
				const ar1 = await F.timeout<string>(testDurationFunction(100))(testTimeoutFuncA(43)).then(F.identity); // $ExpectType string
				const ar2 = await F.timeout(100, testTimeoutFuncA(48)).then(F.identity); // $ExpectType string
				const ar3 = await F.timeout(testDurationFunction(100), testTimeoutFuncA(46)).then(F.identity); // $ExpectType string

				const br0 = await F.timeout<AsyncIterableIterator<number>>(100)(testTimeoutFuncB(27)).then(F.identity); // $ExpectType AsyncIterableIterator<number>
				const br1 = await F.timeout<AsyncIterableIterator<number>>(testDurationFunction(100))(testTimeoutFuncB(84)).then(F.identity); // $ExpectType AsyncIterableIterator<number>
				const br2 = await F.timeout(100, testTimeoutFuncB(23)).then(F.identity); // $ExpectType AsyncIterableIterator<number>
				const br3 = await F.timeout(testDurationFunction(20), testTimeoutFuncB(51)).then(F.identity); // $ExpectType AsyncIterableIterator<number>

				resolve();
			} catch (e) {
				if (e.message === 'timeout error') {
					resolve();
				}
				reject(e);
			}
		});
    });

    it('from Promise Duration', () => {
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

		return new Promise(async (resolve, reject) => {
			try {
				const ar0 = await F.timeout<string>(100)(testTimeoutFuncA(42)).then(F.identity); // $ExpectType string
				const ar1 = await F.timeout<string>(testDurationFunction(100))(testTimeoutFuncA(43)).then(F.identity); // $ExpectType string
				const ar2 = await F.timeout(100, testTimeoutFuncA(48)).then(F.identity); // $ExpectType string
				const ar3 = await F.timeout(testDurationFunction(100), testTimeoutFuncA(46)).then(F.identity); // $ExpectType string

				const br0 = await F.timeout<AsyncIterableIterator<number>>(100)(testTimeoutFuncB(50)).then(F.identity); // $ExpectType AsyncIterableIterator<number>
				const br1 = await F.timeout<AsyncIterableIterator<number>>(testDurationFunction(100))(testTimeoutFuncB(50)).then(F.identity); // $ExpectType AsyncIterableIterator<number>
				const br2 = await F.timeout(100, testTimeoutFuncB(23)).then(F.identity); // $ExpectType AsyncIterableIterator<number>
				const br3 = await F.timeout(testDurationFunction(20), testTimeoutFuncB(51)).then(F.identity); // $ExpectType AsyncIterableIterator<number>

				resolve();
			} catch (e) {
				if (e.message === 'timeout error') {
					resolve();
				}
				reject(e);
			}
		});
    });
});

describe('interval', () => {
    it('interval', () => {
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
    it('rangeInterval', () => {
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

    it('with run', async () => {
        const ar0 = await F.run(50, F.rangeInterval); // $ExpectType AsyncIterableIterator<number>
        const ar1 = await F.run(Promise.resolve(50), F.rangeInterval); // $ExpectType AsyncIterableIterator<number>
        const ar2 = await F.run(() => 50, F.rangeInterval); // $ExpectType AsyncIterableIterator<number>
        const ar3 = await F.run(async () => 50, F.rangeInterval); // $ExpectType AsyncIterableIterator<number>
    });
});
