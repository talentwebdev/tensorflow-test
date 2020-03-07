import Modernizr from "./modernizr";
import {get, set, on} from "./state";
import {isAndroid, isMobileOnly} from "react-device-detect";

const mediaQueries = [
    {label: "xsmall",  query: "(max-width: 480px)"},
    {label: "small",  query: "(max-width: 839px)"},
    {label: "medium",  query: "(max-width: 1024px)"},
    {label: "large",  query: "(min-width: 1025px)"}
];

let root = document.getElementById("root");

const updateSize = () => {
    const container = document.querySelector(".container");
    let W, H;

    const minHeight = get("prelaunch") ? 720 : isMobileOnly ? 550 : 660;

    if (container) {
        W = container.clientWidth;
        H = container.clientHeight;//Math.max(minHeight, container.clientHeight);
    } else {
        W = window.innerWidth;
        H = window.innerHeight;//Math.max(minHeight, window.innerHeight);
    }

    const app_width  = get("app_width");
    const app_height = get("app_height");

    const changed = app_width !== W || app_height !== H;

    if (app_width !== W) {
        set("app_width", W);
    }

    if (app_height !== H) {
        set("app_height", H);
        if (!root) {
            root = document.getElementById("root");
        }
        if (root) {
            root.style.height = `${H}px`;
        }
    }

    if (changed) {
        //console.log("change size", W, H);
        const mq = mediaQueries.find(q => Modernizr.mq(q.query));
        set("mq", mq.label);

        if (isAndroid) {
            const viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute("content", `height=${H}, width=${W}, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no`);
        }
    }
    requestAnimationFrame(updateSize);
};
on("prelaunch", updateSize);
export const init = () => {
    //const handler = createHandler();
    requestAnimationFrame(updateSize);
};
