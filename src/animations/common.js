const LONG_DURATION    = 1000;
const DEFAULT_DURATION = 600;
const SHORT_DURATION   = 300;
const SWIPE_DISTANCE   = Math.min(500, window.innerWidth);

export const longDuration    = {duration: LONG_DURATION};
export const defaultDuration = {duration: DEFAULT_DURATION};
export const shortDuration   = {duration: SHORT_DURATION};

export const fadeIn          = {opacity: {value: 1}};
export const fadeOut         = {opacity: {value: 0}};

export const easeOutQuad     = {easing: "easeOutQuad"};
export const easeInQuad      = {easing: "easeInQuad"};
export const easeInOutQuad   = {easing: "easeInOutCubic"};

export const fadeEnter = {
    opacity  : [0, 1],
    easing   : "linear",
    duration : SHORT_DURATION,
    delay    : SHORT_DURATION
};

export const fadeExit = {
    opacity  : [1, 0],
    easing   : "linear",
    duration : SHORT_DURATION
};

export const exitToLeft = {
    ...defaultDuration,
    ...fadeOut,
    ...easeInOutQuad,
    ...{
        translateX : {
            value : -SWIPE_DISTANCE
        }
    }
};

export const exitToRight = {
    ...defaultDuration,
    ...fadeOut,
    ...easeInOutQuad,
    ...{
        translateX : {
            value : SWIPE_DISTANCE
        }
    }
};

export const enterFromLeft = {
    ...defaultDuration,
    ...fadeIn,
    ...easeInOutQuad,
    ...{
        translateX : {
            value : [SWIPE_DISTANCE, 0]
        }
    }
};

export const enterFromRight = {
    ...defaultDuration,
    ...fadeIn,
    ...easeInOutQuad,
    ...{
        translateX : {
            value : [-SWIPE_DISTANCE, 0]
        }
    }
};
