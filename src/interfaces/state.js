import {curry, forEachObjIndexed, pick as _pick, __} from "ramda";

const listeners = {};
const state     = load();

export const pick = keys => _pick(keys, state);

export const get = key => state[key];

export const getState = () => ({...state});

export const set = curry((key, value) => {
    if (state[key] !== value) {
        state[key] = value;
        trigger(key, value);
    }
    return value;
});

export const update = object => {
    forEachObjIndexed((value, key) => set(key, value), object);
    return object;
};

export const on = curry((key, fn) => {
    if (listeners[key]) {
        listeners[key].push(fn);
    } else {
        listeners[key] = [fn];
    }
    return fn;
});

export const once = (key, fn) => {
    const f1 = on(key, (val) => {
        fn(val);
        off(key, f1);
    });
};

export const off = curry((key, fn) => {
    listeners[key] = listeners[key].filter(f => f !== fn);
});

export const setter = curry((key, value) => () => set(key, value));

export function save (keys = ["agreed_to_terms"]) {
    const toSave     = pick(keys);
    const savedState = load();
    localStorage.setItem("oreo-state", JSON.stringify({...savedState, ...toSave}));
}

export function clear (array = Object.keys(state)) {
    clearLS(array);
    array.forEach(key => {
        delete state[key];
        trigger(key, undefined);
    });
}

export function clearLS (array) {
    const savedState = load();
    array.forEach(key => {
        delete savedState[key];
    });
    localStorage.setItem("oreo-state", JSON.stringify(savedState));
}

function load () {
    const savedState = localStorage.getItem("oreo-state");
    if (savedState) {
        return JSON.parse(savedState);
    } else {
        return {};
    }
}

function trigger (key, value) {
    //console.log("state.trigger", key, value);
    if (listeners[key]) {
        //console.log("state.trigger inside if", key, value);
        listeners[key].forEach(fn => {
            //console.log("calling function with ", value);
            fn(value);
        });
    }
}
