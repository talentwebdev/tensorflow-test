import {get} from "../state";
import gaTags from "./ga-tags";
import {FB_CA, FB_US} from "./fb-tags";
import {GTM_CA, GTM_US} from './gtm-tags';

const is_dev = process.env.NODE_ENV === "development";

export const ga = (...args) => {
    if (!is_dev) {
        //ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
        return ("ga" in window) ? window.ga("send", ...args) : null;
    }
};

export const fbq = (...args) => {
    if (!is_dev) {
        return ("fbq" in window) ? window.fbq(...args) : null;
    }
};

export const gtag = (...args) => {
    if (!is_dev) {
        return ("gtag" in window) ? window.gtag(...args) : null;
    }
};

export const gtag_homepage = () => {
    const ca = "DC-8445875/stufi0/oreoc0+standard";
    const us = "DC-8467884/stufi0/oreos0+standard";
    const cn = get("country");
    if (cn !== "US" && cn !== "CA") {
        return;
    }
    gtag("event", "conversion", {
        "allow_custom_scripts" : true,
        "send_to"              : get("country") === "US" ? us : ca
    });
};

export const gtag_signup_complete = () => {
    const ca = "DC-8445875/stufi0/oreoc000+standard";
    const us = "DC-8467884/stufi0/oreos000+standard";
    const cn = get("country");
    if (cn !== "US" && cn !== "CA") {
        return;
    }
    gtag("event", "conversion", {
        "allow_custom_scripts" : true,
        "send_to"              : get("country") === "US" ? us : ca
    });
};
export const gtag_signup_start = () => {
    const ca = "DC-8445875/stufi0/oreoc00+standard";
    const us = "DC-8467884/stufi0/oreos00+standard";
    const cn = get("country");
    if (cn !== "US" && cn !== "CA") {
        return;
    }
    gtag("event", "conversion", {
        "allow_custom_scripts" : true,
        "send_to"              : get("country") === "US" ? us : ca
    });
};

export const addTags = () => {
    if (is_dev) {
        return;
    }
    /* document.head.insertAdjacentHTML("beforeend", gaTags);
    if (get("country") === "CA") {
        document.head.insertAdjacentHTML("beforeend", GTM_CA);
        document.body.insertAdjacentHTML("afterbegin", FB_CA);
    } else {
        document.head.insertAdjacentHTML("beforeend", GTM_US);
        document.body.insertAdjacentHTML("afterbegin", FB_US);
    } */
};
