import {set} from "./state";

const getOfflineStatus = () => {
    if ("onLine" in navigator) {
        return !navigator.onLine;
    } else {
        return true;
    }
};

const onofflinechange = event => {
    console.log("offline :: ", event.type);
    set("offline", event.type === "offline" || getOfflineStatus());
};

export const init = () => {
    window.addEventListener("online",  onofflinechange, false);
    window.addEventListener("offline", onofflinechange, false);
    set("offline", getOfflineStatus());
};
