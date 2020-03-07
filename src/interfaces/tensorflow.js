import config from "../data/config";
import {pipe, head, allPass, propEq, propSatisfies, lt} from "ramda";

const MODEL_URL = `tensorflow/model.json`;
const {WIDTH, HEIGHT, OREO_CLASSES, REAL} = config.tensorflow;

const valueSort = (a, b) => b.value - a.value;
const toObj     = (value, i) => ({value, label: OREO_CLASSES[i]});
const topK      = 3;

let rafId = null;
let canvas;
let model;
let ctx;
let vid;

let LOADING = false;
let CANCEL  = false;
let tf;

const after = ms => new Promise((resolve) => setTimeout(resolve, ms));
export const load_model = async () => {
    try {
        console.log("tensorflow :: loading tf.js");
        tf = await import("@tensorflow/tfjs");
        console.log("tensorflow :: loading model");
        model = await tf.loadModel(MODEL_URL);
        console.log("tensorflow :: model loaded");
        console.log("tensorflow :: running first prediction");
        const trash = await firstPrediction();

        // huge garbage collection after doing first prediction, waiting here for that to complete so we don't clobber animations
        const x     = await after(500);

        console.log("tensorflow :: first prediction completed");
        return true;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// reject :: string -> Promise(Error(String))
const reject = string => Promise.reject(new Error(string));

// isLoaded :: () -> Boolean
export const isLoaded = () => {
    return vid && model;
};

// firstPrediction :: () -> [Prediction]
const firstPrediction = async () => {
    canvas        = canvas || document.createElement("canvas");
    ctx           = canvas.getContext("2d");
    canvas.width  = WIDTH;
    canvas.height = HEIGHT;
    // the first prediction is very slow, run this first.

    const pixels = tf.fromPixels(canvas);

    let preprocessedInput = pixels
        .resizeNearestNeighbor([224, 224])
        .toFloat();

    preprocessedInput = tf.div(preprocessedInput, 255);

    const reshapedInput = preprocessedInput.reshape([1, ...preprocessedInput.shape]);
    const logits = model.predict(reshapedInput);
    console.log("logits: ", logits);
    const predictions = tf.tidy(() => logits);
    console.log('predictions: ', predictions);
    return predictions.data().then(() => {
        predictions.dispose();
    });
};

// drawToCanvas :: () -> {}
const drawToCanvas = () => {
    ctx.drawImage(vid,
        0, 0, vid.videoWidth, vid.videoHeight,
        0, 0, WIDTH, HEIGHT
    );
};

// oreoFound :: [Prediction] -> Boolean
const oreoFound = pipe(
    head,
    allPass([
        propEq("label", REAL),
        propSatisfies(lt(config.tensorflow.threshold), "value")
    ])
);

const findLoop = callback => async function loop () {
    const predictions = await predict();
    if (rafId === null) {
        // tf was stopped
        return;
    }
    if (oreoFound(predictions)) {
        rafId = null;
        callback(true);
    } else {
        rafId = setTimeout(loop, config.tensorflow.samplerate);
    }
};

export const hasModel   = () => Boolean(model);
export const isScanning = () => Boolean(rafId);

// load :: Video -> Promise(Model)
export const load = async (video) => {
    if (video && video instanceof HTMLVideoElement) {
        vid = video;
    } else {
        return Promise.reject(new Error("You must pass a video element to load"));
    }

    if (!tf) {
        tf = await import("@tensorflow/tfjs");
    }

    LOADING = true;
    if (!model) {
        model = await tf.loadModel(MODEL_URL);
        if (CANCEL) {
            LOADING = CANCEL = false;
            dispose();
        }

        // run the first prediction
        await firstPrediction();

        if (CANCEL) {
            LOADING = CANCEL = false;
            dispose();
        }
    }

    LOADING = false;
    // return the loaded model
    return model;
};

// find :: () -> {}
export const find = callback => {
    rafId = null;
    clearTimeout(rafId);
    if (isLoaded()) {
        rafId = setTimeout(findLoop(callback), config.tensorflow.samplerate);
    } else {
        console.error("model is not loaded");
    }
};

// stop :: () -> {}
export const stop = () => {
    rafId = null;
    clearTimeout(rafId);
};

// dispose :: () -> {}
export const dispose = () => {
    if (LOADING) {
        CANCEL = true;
        return;
    }
    stop();
    if (model) {
        model.dispose();
        model = null;
    }
    if (vid) {
        vid = null;
    }
};

// predict () -> [Prediction]
export const predict = () => {
    if (!isLoaded()) {
        return reject("model is not loaded");
    };

    drawToCanvas(vid);
    const predictions = getPredictions();

    /* const pixels = tf.fromPixels(canvas);

    let preprocessedInput = pixels
        .resizeNearestNeighbor([224, 224])
        .toFloat();

    preprocessedInput = tf.div(preprocessedInput, 255);

    const reshapedInput = preprocessedInput.reshape([1, ...preprocessedInput.shape]);
    const logits = model.predict(reshapedInput);
    const predictions = tf.tidy(() => logits); */
    return predictions.data().then(values => {
        predictions.dispose();
        return Array.from(values).map(toObj).sort(valueSort).slice(0, topK);
    });
};

const getPredictions = () => tf.tidy(() => {
    const pixels = tf.fromPixels(canvas);

    let preprocessedInput = pixels
        .resizeNearestNeighbor([224, 224])
        .toFloat();

    preprocessedInput = tf.div(preprocessedInput, 255);

    const reshapedInput = preprocessedInput.reshape([1, ...preprocessedInput.shape]);

    return model.predict(reshapedInput);
});

export const getCanvas = () => canvas;
