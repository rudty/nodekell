
const generatorConstructor = (function *(){}).constructor;

const _collectAsyncIterable = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};

const _collectIterable = (iter) => {
    const res = [];
    for (const e of iter) {
        res.push(e);
    }
    return Promise.all(iter);
};

/**
 * make array
 * iterator to array
 */
export const collect = async (a) => {

    if (Array.isArray(a)) {
        return Promise.all(a);
    }

    if (a === generatorConstructor) {
        return _collectIterable(a);
    }
    
    return _collectAsyncIterable(a);
};