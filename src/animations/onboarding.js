/*
    src/animations/onboarding.js
    this file contains animations for all the onboarding content

 */

import {
    fadeEnter,
    fadeExit,
    enterFromLeft,
    enterFromRight,
    exitToLeft,
    exitToRight,
    defaultDuration,
    easeInQuad
} from "./common";
import {Animation, Timeline} from ".";
import {mergeDeepRight as merge} from "ramda";
import anime from "animejs";

export const onEnter = Timeline([
    {...fadeEnter, targets: ".onboarding", offset: 0},
    {
        targets    : ".breadcrumb",
        elasticity : 100,
        offset     : 0,
        delay      : (target, i) => 1500 + i * 100,
        translateY : [
            {value: 100, duration: 0},
            {value: [100, -20], duration: 250, easing: "easeOutQuad"},
            {value: [-20, 0], duration: 450}
        ],
        opacity : {
            delay    : 0,
            duration : 200,
            value    : [0, 1]
        }
    }
]);

export const onExit = Animation({...fadeExit, targets: ".onboarding"});

const duration   = 1800;
const swoopTime  = 700;
const offset     = 400;
const scaleDelay = swoopTime - offset;

export const slideAnimations = [
    /* onboarding 1 (calendar cookie animation) */
    {
        enterFromLeft  : Animation({...fadeEnter, targets: ".slide-0"}),
        enterFromRight : Animation({...enterFromRight, targets: ".slide-0"}),
        exitToLeft     : Animation({...exitToLeft, targets: ".slide-0"}),
        exitToRight    : Animation({...exitToRight, targets: ".slide-0"})
    },
    /* onboarding 2 (phone/laptop) */
    {
        enterFromLeft : Timeline([
            merge(enterFromLeft, {
                targets : ".slide-1",
                offset  : 0,
                opacity : {
                    value    : [0, 1],
                    duration : offset
                },
                translateX : {
                    easing   : "easeInOutCubic",
                    duration : swoopTime
                },
                translateY : {
                    delay    : swoopTime - 700,
                    duration : duration - swoopTime,
                    easing   : "easeOutQuad",
                    value    : [40, 0]
                },
                scale : [
                    {
                        delay    : 0,
                        duration : scaleDelay,
                        value    : 1.1
                    },
                    {
                        delay    : scaleDelay,
                        duration : duration - swoopTime,
                        easing   : "easeInOutCirc",
                        value    : [1.1, 1]
                    }
                ]
            }),
            {
                targets    : ".scanning-animation",
                offset     : 0,
                translateX : {
                    value    : "-50%",
                    delay    : 0,
                    duration : 0
                },
                translateY : {
                    delay    : swoopTime - 200,
                    duration : duration - swoopTime,
                    easing   : "linear",
                    value    : ["-70%", "-50%"]
                },
                scale : [
                    {
                        delay    : 0,
                        duration : scaleDelay,
                        value    : 0.8
                    },
                    {
                        delay    : scaleDelay,
                        duration : duration - swoopTime,
                        easing   : "easeInOutCirc",
                        value    : [0.8, 1]
                    }
                ]
            }
        ]),
        enterFromRight : Animation({...enterFromRight, targets: ".slide-1"}),
        exitToLeft     : Animation({...exitToLeft, targets: ".slide-1"}),
        exitToRight    : Animation({...exitToRight, targets: ".slide-1"})
    },
    /* onboarding 3 (Jeep) */
    {
        enterFromLeft : Timeline([
            {
                offset   : 0,
                targets  : ".btn-primary",
                duration : 0,
                opacity  : 0
            },
            {
                ...enterFromLeft,
                targets : ".slide-2"
            },
            {
                offset   : "-=100",
                targets  : ".btn-primary",
                duration : 400,
                opacity  : {
                    value  : [0, 1],
                    easing : "easeInQuad"
                },
                translateY : {
                    value  : [30, 0],
                    easing : "easeOutBack"
                }
            }
        ]),
        enterFromRight : Animation({...enterFromRight, targets: ".slide-2"}),
        exitToLeft     : Animation({...fadeExit, targets: ".slide-2"}),
        exitToRight    : Animation({...fadeExit, targets: ".slide-2"})
    }
];

// Bounces the small cookies a the bottom of the screen
export const bounceCookie = Animation({
    scale : [
        {
            value    : [1, 1.05],
            duration : 200,
            easing   : "linear"
        },
        {
            value      : [1.05, 1],
            delay      : 200,
            duration   : 800,
            easing     : "easeOutElastic",
            elasticity : 100
        }
    ]
});
