import {GET, POST} from "./request";
import config from "../../data/config";
import prizeData from "../../data/prize-data.json";
import {getPrizeModel} from './prize-map';
import {on, off, get, set, pick, update} from "../state";
import {tap, path, pipe, adjust, join, split, toUpper, converge, always, pipeP, both, prop, complement, applySpec, propOr} from "ramda";
const getLocale = () => {
    const locale = `${get("language").split("-")[0]}_${get("country")}`;
    if (locale === "fr_US") {
        console.warn("fr_US is not a valid locale");
        return "fr_CA";
    } else {
        return locale;
    }
};

export const getSignupData = () => ({
    email                : get("email"),
    firstName            : get("first_name"),
    lastName             : get("last_name"),
    countryCodeAbbr      : get("country"),
    locale               : getLocale(),
    referralCode         : get("referral_id") || "",
    optIntoEmailCampaign : get("primary_opt_in") || false,
    over18               : get("agreed_to_terms"),
    recaptchaValue       : get("recaptcha")
});

export const getSocialActivationData = () => ({
    countryCodeAbbr      : get("country"),
    locale               : getLocale(),
    referralCode         : get("referral_code") || "",
    optIntoEmailCampaign : get("primary_opt_in"),
    over18               : get("agreed_to_terms")
});

const translateProfileKeys = applySpec({
    first_name              : prop("firstName"),
    last_name               : prop("lastName"),
    email                   : prop("email"),
    user_id                 : prop("id"),
    can_play                : prop("canPlay"),
    needs_social_activation : prop("needsSocialActivation"),
    is_logged_in            : prop("isLoggedIn"),
    return_user             : both(
        prop("isLoggedIn"),
        complement(prop("needsSocialActivation"))
    )
});

const saveProfile = pipe(
    tap(profile => console.log("api :: got api response", profile)),
    translateProfileKeys,
    tap(profile => console.log("api :: updating state with", profile)),
    update
);

const debug = f => f;

const _play  = (methodOfEntry) => {
    if (config.api.override_win) {
        return Promise.resolve(update({
            user_won   : true,
            first_loss : false
        }));
    } else if (config.api.override_lose) {
        return Promise.resolve(update({
            user_won   : false,
            first_loss : false
        }));
    } else {
        if (methodOfEntry) {
            console.log("api :: play", methodOfEntry);
            if (get("can_play")) {
                return POST(`/api/Contest/Play/?methodOfEntry=${methodOfEntry}`, {}).then(result => {
                    if (result.playCompleted) {
                        console.log("api :: play completed", result);
                        if (result.prizeCopy) {
                            set("prize", result.prizeCopy.name);
                        }
                        return update({
                            user_won   : !!result.didWin,
                            first_loss : !!result.firstLoss
                        });;
                    } else {
                        console.error("api :: playCompleted was false. This indicates an error with hello world API", result);
                        return update({
                            user_won   : false,
                            first_loss : false
                        });
                    }
                });
            } else {
                console.log("api :: user cannot play, so not hitting the API");
                return Promise.resolve(update({
                    "first_loss" : false,
                    "user_won"   : false
                }));
            }
        } else {
            return Promise.reject(new Error("play requires a method of entry"));
        }
    }
};
_play.losses = 0;
_play.mock = ({id, token}) => {
    const isWinner = Math.random() > 0;
    if (!isWinner) {
        _play.losses++;
    }
    set("first_loss", _play.losses === 1);
    set("user_won", isWinner);
    return Promise.resolve({
        "playCompleted"  : true,
        "playsRemaining" : 0,
        "firstLoss"      : _play.losses > 1,
        "prizeCopy"      : "",
        "didWin"         : isWinner
    });
};

const _prelaunchEmail = (recaptchaValue) => {
    return POST("/api/Contestant/PreLaunch", {
        email          : get("email"),
        locale         : getLocale(),
        recaptchaValue : recaptchaValue
    });
};

const _getTodaysPrize = () => {
    console.log("api :: fetching today's prize");
    return GET(`/api/Contest/DailyPrize/today/${getLocale()}`)().then(response => {
        const prizeData = path(["prizes", "0"], response) || {};
        const info      = getPrizeModel(prizeData.uuid);
        if (!info) {
            console.log("missing prize for uuid", prizeData);
        }
        console.log("api :: got today's prize");
        return {
            uuid              : prizeData.uuid,
            prize_reveal_copy : prizeData.name,
            ...info
        };
    });
};

_getTodaysPrize.mock = () => {
    console.log("api.mock :: getTodaysPrize");
    const prizes  = prizeData[get("country")];
    return Promise.resolve(prizes[~~(Math.random() * prizes.length)]);
};

const _getTomorrowsPrize = () => {
    return GET(`/api/Contest/DailyPrize/tomorrow/${getLocale()}`)().then(response => {
        const prizeData = path(["prizes", "0"], response) || {};
        const model = getPrizeModel(prizeData.uuid);
        if (!model) {
            console.log("missing prize for uuid", prizeData);
        }
        const res = {...prizeData, ...model};
        set("tomorrows_prize", res);
        set("tp_name", get("language") === "fr-ca" ? res.copy_fr : res.copy_en);
        if (_getTomorrowsPrize.listener) {
            off("language", _getTomorrowsPrize.listener);
        }
        on("language", lang => set("tp_name", lang === "fr-ca" ? res.copy_fr : res.copy_en));
        return res;
    });
};

_getTomorrowsPrize.mock = () => {
    console.log("api.mock :: getTomorrowsPrize");
    const prizes  = prizeData[get("country")];
    return Promise.resolve(prizes[~~(Math.random() * prizes.length)]);
};

const _getTwitterConfirmation = () => {
    if (get("is_logged_in")) {
        return POST("/api/Contest/Twitter", {}).then(result => {
            if (result.didSucceed) {
                console.log("api :: tweet confirmed", result);
                return result;
            } else {
                console.log(result);
                throw new Error("didSucceed was false. This indicates an error with hello world API");
            }
        });
    } else {
        return Promise.reject("not logged in");
    }
};

_getTwitterConfirmation.mock = () => {
    console.log("api.mock :: getTwitterConfimration");
    return Promise.resolve({
        "isLimited"  : 0,
        "didSucceed" : true
    });
};

const _login = pipeP(
    GET("/api/Contestant/Profile"),
    saveProfile
);

_login.mock = () => {
    const return_user = get("agreed_to_terms");
    if (return_user) {
        const result = {
            canPlay               : true,
            firstName             : get("first_name"),
            isLoggedIn            : true,
            lastName              : get("last_name"),
            needsSocialActivation : false,
            playsRemaining        : 0
        };
        return Promise.resolve(result);
    } else {
        const result = {
            canPlay               : false,
            firstName             : "",
            isloggedIn            : false,
            lastname              : "",
            needsSocialActivation : false,
            playsRemaining        : 0
        };
        return Promise.resolve(result);
    }
};

const _signup = pipeP(
    converge(POST, [
        always("/api/Contestant/Signup"),
        pipe(getSignupData, tap(console.log))
    ]),
    saveProfile
);
_signup.mock = _login.mock;

const _activateSocial = pipeP(
    converge(POST, [
        always("/api/Contestant/ActivateSocial"),
        getSocialActivationData
    ]),
    saveProfile
);
_signup.mock = _login.mock;

const _twitterShare = () => fetch("/api/Contest/Twitter", {
    method  : "POST",
    headers : {
        "Accept"       : "application/json",
        "Content-Type" : "application/json"
    }
});

_twitterShare.mock = () => {
    return Promise.resolve({
        result : {isLimited: 0}
    });
};

const _contestIsLive = GET("/api/Contest/Launched");

/* if (config.api.override_live) {
    _contestIsLive = () => Promise.resolve({result: config.api.override_live});
} else {
    _contestIsLive = GET("/api/Contest/Launched");
} */

export const logout = () => fetch("/api/Contestant/Logout", {method: "POST"});
export const contestIsLive          = debug(_contestIsLive);
export const play                   = debug(_play);
export const prelaunchEmail         = debug(_prelaunchEmail);
export const getTodaysPrize         = debug(_getTodaysPrize);
export const getTomorrowsPrize      = debug(_getTomorrowsPrize);
export const login                  = debug(_login);
export const signup                 = debug(_signup);
export const activateSocial         = debug(_activateSocial);
export const twitterShare           = debug(_twitterShare);
export const getTwitterConfirmation = debug(_getTwitterConfirmation);
