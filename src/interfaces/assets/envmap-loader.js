import {CubeTextureLoader, RGBFormat, Math as M} from "three";

export default ({renderer, basepath, urls}) => {
    return new Promise((resolve, reject) => {
        const envMap = new CubeTextureLoader()
            .setPath(basepath)
            .load(urls, e => {
                envMap.format   = RGBFormat;
                envMap.rotation = M.degToRad(300);
                resolve({texture: envMap});
            }, () => {}, reject);
    });
};
