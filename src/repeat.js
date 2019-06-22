export const repeat = async function *(a, ...b) {
    let supply = a;
    let len = Infinity;
    if (b.length > 0) {
        supply = b[0];
        len = await a;
    }
    supply = await supply;
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield await supply();
        }
    } else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};
