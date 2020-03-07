let running = false;
const fps = {
    last    : null,
    current : null,
    fps     : 0
};
let fpsInterval = null;
const fpsHistory = [];

const calcFps = () => {
    fps.current = Date.now();
    fps.fps = Math.round(1000 / (fps.current - fps.last));
    fps.last = fps.current;
    if (running) {
        requestAnimationFrame(calcFps);
    }
};

const startCounter = () => {
    requestAnimationFrame(calcFps);
};

export const run = (interval = 500) => {
    running = true;
    startCounter();
    fpsInterval = setInterval(() => {
        fpsHistory.push(fps.fps);
    }, interval);
};

export const end = () => {
    clearTimeout(fpsInterval);
    running = false;
};

export const getFps = () => {
    return fps.fps;
};

export const getAverageFps = () => {
    return Math.round(fpsHistory.reduce((prev, curr) => prev + curr) / fpsHistory.length);
};