import { getDuration } from "./internal/timer";
import { range } from "./range";
import { sleep } from "./sleep";

export const rangeInterval = async function*(duration, ...k) {
    duration = await getDuration(duration);

    await sleep(duration);
    for (const e of range(...k)) {
        yield e;
        await sleep(duration);
    }
};
