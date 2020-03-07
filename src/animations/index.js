/*
    animations/index.js

    This just contains some helper classes to use across the app for creating and playing animations.
    The rationale with this folder in general is to keep all animations here, so they can be re-used in different places.

 */

import {mergeDeepRight, curryN, pipe, keys, length, converge, assoc, identity} from "ramda";
import anime from "animejs";
import * as common from "./common";

/*
    mergeTimeline :: [AnimeJSParams] -> [AnimeJSParams]

    This function allows you to merge two arrays of objects together
    This allows you to specify the "pre-runtime" part of an animation such as duration, easings, etc.
    and then later, you can specify the runtime part of it (the targets) as well as override any default params
*/
const mergeTimeline = curryN(2, pipe(
    mergeDeepRight,
    converge(assoc("length"), [
        pipe(keys, length),
        identity
    ]),
    Array.from
));

/*
    Animation :: -> AnimeJSParams -> AnimeJSParams -> AnimeJSAnimation
    This function allows you to specify some default params, then returns a funtion that accepts runtime params,
    returns a new animation
 */
export const Animation = params =>
    runtime =>
        anime(runtime ? mergeDeepRight(params, runtime) : params);
/*
    Timeline :: ([AnimeJSParmas], AnimeTimelineParams) -> [AnimeJSParams] -> AnimeJSAnimation
    Similar to the above, except it works with timelines (as arrays), it will handle adding each element of the array
    automatically
 */
export const Timeline = (list, init) =>
    runtime =>
        (runtime ? mergeTimeline(list, runtime) : list).reduce((tl, el) =>
            tl.add(el), anime.timeline(init));

// default fade in/out transitions, used on all routes
export const fadeEnter = Animation(common.fadeEnter);
export const fadeExit  = Animation(common.fadeExit);
