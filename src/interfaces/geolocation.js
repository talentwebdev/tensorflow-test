import {get, set, save} from "./state";
import {getUserLang} from "./copy";
import {pipeP, hasPath, always, prop, ifElse, tail, head, identity, equals, pipe, match, split, map, fromPairs} from "ramda";
import config from "../data/config";

const api_key    = "a2682cedb1c12173703fe2fac87f1805";
const setCountry = set("country");
const setOutside = () =>
    set("outside_na", true);

const fromURL = pipe(
    always(window.location.search),
    ifElse(
        pipe(head, equals("?")),
        tail,
        identity
    ),
    split("&"),
    map(split("=")),
    fromPairs
);

export const init = () => {
    if (process.env.NODE_ENV === "development" && config.override_country) {
        set("country", config.override_country);
        save(["country"]);
        return Promise.resolve(config.override_country);
    } else {
        const fromLS = get("country");
        if (fromLS) {
            // if the user already signed up and we stored in Local Storage, just use that value
            return Promise.resolve(fromLS);
        } else {
            if (!/stufinside.com/.test(window.location.href)) {
                // TODO : Disable this in production
                const params = fromURL();
                if (params && params.country) {
                    set("country", params.country);
                    save(["country"]);
                    return Promise.resolve(params.country);
                }
            }
            // else try getting from the API
            return getFromAPI()
                .then(setCountry)
                // if we can't get from the API, default to using the user's language
                .catch(onAPIError)
                .then(setCountry);
        }
    }
};

const getFromLanguage = () => {
    const lang  = getUserLang();
    switch (lang) {
        case "en-us": return Promise.resolve("US");
        case "en-ca": return Promise.resolve("CA");
        case "fr-ca": return Promise.resolve("CA");
        default:
            return Promise.resolve("US");
            // setOutside();
            // return Promise.reject(new Error("User was outside the US or CA"));
    }
};

const getFromAPI = pipeP(
    () => fetch(`https://api.ipstack.com/check?access_key=${api_key}&fields=country_code`),
    res => res.json(),
    res => {
        if (res && res.country_code) {
            const country = res.country_code;
            console.log("geolocation :: found country", country);
            if (country === "US" || country === "PR") {
                return "US";
            } else if (country === "CA") {
                return country;
            } else {
                return "US";
                // setOutside();
                // return Promise.reject(new Error("User was outside the US or CA"));
            }
        } else {
            console.warn(`geolocation :: Unexpected api response`, res);
            return Promise.reject(new Error(`Unexpected api response`));
        }
    }
);

const onAPIError = error => {
    console.log("geolocation :: could not determine locale by IP", error);
    return getFromLanguage();
};
