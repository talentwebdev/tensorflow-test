const is_dev = process.env.NODE_ENV === "development";
const oreo_official_recaptcha_key = "6LeJoo0UAAAAAOiGx5r4k2h2nbXshF-jmN1uDzUV";
const localhost_recaptcha_key     = "6LeEwo0UAAAAAGjZX1_Um9P8IupZ557VMidHnlQ_";
// automatically setting recaptcha key here based on dev mode or not
const recaptcha_key               = is_dev ?
    localhost_recaptcha_key : oreo_official_recaptcha_key;

export default {
    // dev mode enables routes on all pages, without this you can't nav to /prize-reveal (for example)
    dev_mode          : is_dev && false,
    // allows you to override the user's country
    override_country  : is_dev ? "" : "",
    override_language : is_dev ? "" : "",
    api               : {
        // used to override the live state with a value (helpful if someone else is testing with time-travel)
        override_live : is_dev && {isLive: false},
        // use to make it so you can always win (helpful for testing the win animations)
        override_win  : is_dev && false,
        override_lose : is_dev && false
    },
    tensorflow : {
        // this controls how long we will wait before showing the help message
        scanTimeout  : 3000,
        // if true, this allows you to tap on the scanner screen three times rather than showing an actual cookie
        debugProceed : is_dev && false,
        // width/height are the size of the canvas sent to tensorflow (DO NOT EDIT)
        WIDTH        : 256,
        HEIGHT       : 256,
        // how confident must we be (e.g. 70%) that an oreo cookie has been found before proceeding?
        threshold    : .8,
        // how often do we sample the camera feed to run predictions?
        samplerate   : 1000,
        // used by tf.js (DO NOT EDIT)
        OREO_CLASSES : [
            "Fake Oreo",
            "No Cookie",
            "Real Oreo"
        ],
        // used by tf.js (DO NOT EDIT)
        FAKE : "Fake Oreo",
        REAL : "Real Oreo",
        NONE : "No Cookie"
    },
    pwa : {
        toastTimeout  : 8000,
        iosTipTimeout : 5000
    },
    recaptcha_key
};
