/**
 * arity 1 : [Infinity, arg1]
 * arity 2 : [arg1, arg2]
 */
const repeatFetchArgument = async (a, b) => {
    a = await a;
    if (b.length > 0) {
        return [a, await b[0]];
    }
    return [Infinity, a];
};

/**
 * supply
 * F.repeat(5) => [5,5,5,....]
 * 
 * count and supply
 * F.repeat(3, 5) => [5,5,5]
 * 
 * 
 * @param {Number | any} a  count or supply
 * @param  {any?} b supply
 */
export const repeat = async function *(a, ...b) {
    const [len, supply] = await repeatFetchArgument(a, b);
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield supply();
        }
    } else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};
