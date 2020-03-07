import React from "react";
import {Link} from "react-router-dom";
import copyJSON from "../data/copy";
import {get, set, on, getState} from "./state";
import config from "../data/config";

import {
    split,
    over,
    toUpper,
    join,
    lensIndex,
    memoizeWith,
    converge,
    identity,
    partial,
    toLower,
    replace,
    always,
    ifElse,
    when,
    length,
    equals,
    match,
    nthArg,
    until,
    pipe,
    test,
    prop,
    nth,
    map,
    tap,
    __,
    lt,
    forEach,
    forEachObjIndexed
} from "ramda";


const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

let prize_data = null;
const set_prize_copy = () => {
    if (prize_data) {
        const lang = get("language");
        if (lang === "fr-ca") {
            set("prize", prize_data.copy_fr);
        } else {
            set("prize", prize_data.copy_en);
        }
    }
};

const assignFullName = () => {
    const fn = get("first_name");
    const ln = get("last_name");
    if (fn && ln) {
        set("full_name", `${fn} ${ln}`);
    }
};

on("first_name", assignFullName);
on("last_name", assignFullName);
on("todays_prize", todays_prize => {
    prize_data = todays_prize;
    set_prize_copy();
});

on("language", lang => {
    set_prize_copy();
});

const defaults = {
    prize            : "a prize",
    tp_name          : "a prize",
    email            : "user@email.com",
    user_email       : "user@email.com",
    first_name       : "John",
    last_name        : "Doe",
    full_name        : "John Doe",
    browser          : iOS ? "Safari" : "Chrome",
    "#_of_days_left" : "19"
};

const getStateCopy = always(copyJSON);
const getStateLang = partial(get, ["language"]);

export const init = () => {
    set("language", getLang());
    set("copy", getCopy());
    on("language", lang => set("copy", getCopy()));
};
const proxyToJSX = obj => {
    return new Proxy(obj, {
        get : (obj, prop) => {
            if (prop === "_reactFragment" || prop === "@@functional/placeholder") {
                return undefined;
            }
            if (obj.hasOwnProperty(prop)) {
                return toJSX(obj[prop]);
            } else {
                return "";
            }
        }
    });
};


export const getCopy = pipe(
    converge(prop, [
        getStateLang,
        getStateCopy
    ]),
    proxyToJSX
);

export const getURLLang = () => {
    const url_lang = /(en-us|en-ca|fr-ca)/.exec(window.location.href);
    if (url_lang && url_lang[1]) {
        return url_lang[1];
    } else {
        return "";
    }
};

export const getUserLang = memoizeWith(identity, pipe(
    partial(prop, ["language", navigator]),
    toLower
));

export const getLang = pipe(
    ifElse(
        () => process.env.NODE_ENV === "development" && config.override_language,
        always(config.override_language),
        pipe(
            getURLLang,
            ifElse(
                Boolean,
                identity,
                pipe(
                    getStateLang,
                    ifElse(
                        Boolean,
                        identity,
                        ifElse(
                            converge(prop, [getUserLang, getStateCopy]),
                            getUserLang,
                            always("en-us")
                        )
                    )
                )
            )
        )
    )
);

const isLocalLink = test(/^\//);

const withDefault = ifElse(
    pipe(get, Boolean),
    get,
    prop(__, defaults)
);

const replaceLink = when(
    pipe(match(/\[(.*)\]\((.*)\)/), length, equals(3)),
    pipe(
        match(/(.*)\[([^\]]*)\]\(([^\)]*)\)(.*)/),
        ([_, before, copy, link, after]) =>(
            <React.Fragment>
                {replaceLink(before)}
                {isLocalLink(link) ? <Link to={link}>{copy}</Link> : <a href={link}>{copy}</a>}
                {replaceLink(after)}
            </React.Fragment>
        )
    )
);

const replaceReference = replace(/\[([a-z_\#]+)\]/g, pipe(nthArg(1), withDefault));

const replaceRedemtion = (string) => {
    const [before, after] = string.split(/\[redemption_url\]/);
    const url = `http://www.oreo.com/wallpaper?sc_lang=${getLang()}`;
    return (
        <React.Fragment>
            {before}
            <a href={url} target="_blank">{url}</a>
            {after}
        </React.Fragment>

    );
};

const toJSX = ifElse(
    test(/\[redemption_url\]/),
    replaceRedemtion,
    pipe(
        replaceReference,
        replaceLink
    )
);
