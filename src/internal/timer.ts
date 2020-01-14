import { _takeValue } from "./runtime";

export const getDuration = async (duration: any): Promise<number> => {
    duration = await _takeValue(duration);
    if (duration <= 0) {
        throw new Error("duration > 0 required");
    }
    return duration;
};

export const errorSleep = (t: number) => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("timeout error"));
    }, t);
});
