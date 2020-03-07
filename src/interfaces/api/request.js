import {tap, nthArg, concat, converge, curryN, nAry, pipe, pipeP, assoc, always, partial, __} from "ramda";

const postParams = {
    method  : "POST",
    headers : {
        "Accept"       : "application/json",
        "Content-Type" : "application/json"
    },
    body : {}
};

const getParams = {
    method  : "GET",
    headers : {
        "Accept" : "application/json"
    }
};

const assignBody = pipe(
    nAry(1, JSON.stringify),
    assoc("body", __, postParams)
);

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

const toJSON = response => {
    return response.json();
};


// request :: (string, object) -> Promise(object)
export const POST = curryN(2, pipeP(
    converge((url, init) => fetch(url, init), [
        nthArg(0),
        pipe(nthArg(1), assignBody)
    ]),
    checkStatus,
    toJSON
));

export const GET = endpoint => pipeP(
    () => fetch(`${endpoint}`, getParams),
    checkStatus,
    toJSON
);
