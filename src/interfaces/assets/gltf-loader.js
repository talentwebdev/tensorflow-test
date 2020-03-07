//import DRACOLoader from "./draco/DRACOLoader";
import GLTFLoader from "three-gltf-loader";
import Mesh from "../../components/canvas/mesh";
import {DoubleSide, AnimationMixer, sRGBEncoding, LinearEncoding} from "three";
import {when, test, replace} from "ramda";
import runCorrections from "./gltf-corrections";
//DRACOLoader.setDecoderPath(`/assets/draco/`);

const gltfLoader  = new GLTFLoader();
//const dracoLoader = new DRACOLoader();
//gltfLoader.setDRACOLoader(dracoLoader);

export default ({url, manager}) => new Promise((resolve, reject) => {
    if (manager) {
        gltfLoader.manager = manager;
    }

    const onprogress = () => {};
    const onerror    = err => {
        console.log("error loading", url);
        console.log(err);
        reject(err);
    };
    const onload = gltf => {
        if (gltf.animations.length) {
            gltf.animations.forEach(anim => anim.validate() && anim.optimize());
            gltf.mixer = new AnimationMixer(gltf.scene);
        }
        gltf.url = url;
        runCorrections(gltf);
        setEncoding(url, gltf);
        resolve(new Mesh(gltf));
    };

    gltfLoader.load(correctOptimizedPath(url), onload, onprogress, onerror);
});

const correctOptimizedPath = when(
    test(/djbox/),
    replace(/optimized_/, "")
);

const setEncoding = (url, gltf) => {
    let encoding;
    if (/prizes/.test(url) && !/oreo_cookie/.test(url)) {
        encoding = sRGBEncoding;
    } else {
        encoding = LinearEncoding;
    }
    gltf.scene.traverse(obj => {
        if (obj.isMesh) {
            const material = obj.material;
            if (material.map) {
                material.map.encoding = encoding;
            }
            if (material.emissiveMap) {
                material.emissiveMap.encoding = encoding;
            }
        }
    });
};
