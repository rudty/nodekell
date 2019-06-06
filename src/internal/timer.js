export const getDuration = async duration => {
    duration = await duration;

    if (duration instanceof Function) {
        duration = await duration();
    }

    if (duration <= 0) {
        throw new Error("duration > 0 required")
    }
    return duration;
};

export const errorSleep = t => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("timeout error"));
    }, t);
});
