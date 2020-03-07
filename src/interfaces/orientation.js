import {isMobileOnly} from "react-device-detect";
import {test, hasPath, path, pipe, replace, prop, always, __} from "ramda";
import {set} from "./state";

const ORIENTATIONS = {
    "0"    : "portrait:primary",
    "-90"  : "landscape:primary",
    "90"   : "landscape:primary",
    "-180" : "portrait:secondary",
    "180"  : "portrait:secondary",
    "-270" : "landscape:secondary"
};

const isLandscape = test(/landscape/);

const screenOrientation = pipe(
    always(window),
    prop("screen.orientation.type"),
    isLandscape
);

const windowOrientation = pipe(
    always(window),
    prop("orientation"),
    prop(__, ORIENTATIONS),
    isLandscape
);

const onchange = landscape => {
    console.log(`orientation :: ${landscape ? "landscape" : "portrait"}`);
    set("landscape", landscape);
    if (landscape) {
        document.body.classList.add("landscape");
    } else {
        document.body.classList.remove("landscape");
    }
};

export const init = () => {
    if (hasPath(["screen", "orientation", "type"], window)) {
        console.log("orientation :: using window.screen.orientation");
        window.screen.orientation.onchange = pipe(screenOrientation, onchange);
        window.scree.onorientation.onchange();
    } else if (hasPath(["orientation"], window)) {
        console.log("orientation :: using window.orientation");
        window.onorientationchange = pipe(windowOrientation, onchange);
        window.onorientationchange();
    } else {
        //console.warn("orientation :: orientation events are not supported");
    }
};
