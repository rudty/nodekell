/**
 * like python enumerate
 */
export const enumerate = async function *(iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};