import {Animation} from "./index";

const prizeRevealDelay = 3000;
const prizeRevealDur   = 1000;

// When we're entering the prize reveal, we should fade out more slowly because
// the prize reveal animation should have the camera behind it for a few seconds
export const prizeRevealEnterFadeOut = Animation({
    opacity  : 0,
    delay    : prizeRevealDelay,
    duration : prizeRevealDur,
    easing   : "linear"
});

// When we're entering prize reveal, we wait a bit to fade in the UI
export const prizeRevealEnterFadeIn = Animation({
    opacity  : 1,
    delay    : prizeRevealDelay,
    duration : prizeRevealDur,
    easing   : "linear"
});
