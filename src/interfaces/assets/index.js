import {tap, forEachObjIndexed, map, ifElse, curryN, path, pipe, nAry, apply, __} from "ramda";

import envmapLoader from "./envmap-loader";
import gltfLoader from "./gltf-loader";

const loaders = {
    envmap  : envmapLoader,
    gltf    : gltfLoader,
    texture : () => {}
};

const assets = {
    envmap  : {},
    gltf    : {},
    texture : {}
};

// getAssets :: () -> Object
export const getAssets = () => assets;

// resolve :: a -> Promise(a)
const resolve = x =>
    Promise.resolve(x);

// reject :: String -> Promise(Error(string))
const reject = message =>
    Promise.reject(new Error(message));

// assign :: (String, String) -> Asset -> Asset
const assign = (type, key) =>
    asset => assets[type][key] = asset;

// load :: (String, String, Object) -> Promise(Asset)
const load = (type, key, params) =>
    loaders[type] ?
        (loaders[type](params)
            .then(assign(type, key))) :
        reject(`No loader registered for ${type}`);

// get :: (String, String, Object) -> Promise(Asset)
export const get = curryN(2, (type, key, params) =>
    assets[type][key] ?
        resolve(assets[type][key]) :
        load(type, key, params));

// get.asObject :: Object -> Promise(Object)
export const loadList = obj => {
    const promises = [];

    forEachObjIndexed((list, type) => {
        forEachObjIndexed((params, key) => {
            if (params.url && /undefined/.test(params.url)) {
                console.log(obj);
                throw new Error("url undefined");
            }
            promises.push(get(type, key, params));
        }, list);
    }, obj);

    return Promise.all(promises)
        .then(() => assets);
};
