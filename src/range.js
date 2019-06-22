export const range = function*(...k) {
    let begin = 0;
    let end = Infinity;
    let n = 1;
    const len = k.length;

    switch(len) {
    case 1:
        end = k[0];
        break;
    case 2:
        begin = k[0];
        end = k[1];
        break;
    case 3:
        begin = k[0];
        end = k[1];
        n = k[2];
        break;
    }

    for (let i = begin; i !== end; i += n) {
        yield i;
    }
};
