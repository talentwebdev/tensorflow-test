import {DoubleSide} from "three";
import {prop, pipe, test} from "ramda";


const makeDoubleSided = gltf => {
    gltf.traverse(obj => obj.isMesh && (obj.material.side = DoubleSide));
};
/* Aneisa mentioned something about the xbox console mateiral...trying some adjustments */
/* const checkXbox = (gltf) => {
    gltf.traverse(obj => {
        if (obj.material && obj.material.name === "Xbox_One_X_console") {
            obj.material.envMapIntensity = 3;
        }
    });
}; */

const Hook = (predicate, correction) =>
    ({predicate, correction});

const hooks = [
    Hook(
        pipe(prop("url"), test(/hat_/)),
        pipe(prop("scene"), makeDoubleSided)
    )/* ,
    Hook(
        pipe(prop("url"), test(/landing_ftu/)),
        pipe(prop("scene"), checkXbox)
    ) */
];

export default gltf => hooks.forEach(hook =>
    hook.predicate(gltf) && hook.correction(gltf));
