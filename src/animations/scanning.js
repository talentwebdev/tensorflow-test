/*
    animations and timnings for the scanning animation (after you scan a cookie)
    not sure if this is currently used uo be honest since we've redone the scanning animation
 */
import {Animation} from ".";

export const timings = {
    scanningDuration      : 6000, // how long the scanning animation lasts in total
    cookieAppearDelay     : 4000, // how long before the cookie appears
    overlayRevealDuration : 400
};

export const revealOverlay = Animation({
    targets  : "#overlay-circle",
    r        : target => [window.innerHeight, parseFloat(target.getAttribute("r"))],
    easing   : "easeOutQuad",
    duration : timings.overlayRevealDuration
});
