import modernizr from "./modernizr";
import {isMobile, isIOS, isChrome, osVersion} from "react-device-detect";
import {set} from "./state";

export const isWebView = () => isMobile && isIOS && osVersion >= 11 && !modernizr.getusermedia;

export const init = () => {
    //console.log(`support :: isSupported ${!isWebView()}`);
    set("unsupported_browser", isWebView());
    if (isIOS && isChrome) {
        set("chrome_ios", true);
    }
};
