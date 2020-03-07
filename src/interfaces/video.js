import config from "../data/config";
import {curryN} from "ramda";

const canvas   = document.createElement("canvas");
const ctx      = canvas.getContext("2d");

canvas.width   = config.WIDTH;
canvas.height  = config.HEIGHT;

export const initCamera = curryN(2, async (video, mediaStream) => {

    if (video.srcObject === mediaStream) {
        return Promise.resolve(video);
    }
    video.srcObject = mediaStream;
    return new Promise((resolve, reject) => {
        video.onloadedmetadata = () => {
            video.play();
            video.addEventListener("playing", () => resolve(video));
        };
        video.onerror = reject;
    });
});

export const initSrc = curryN(2, async (video, src) => {
    return new Promise((resolve, reject) => {
        video.pause();
        video.src = src;
        video.onloadedmetadata = () => {
            video.play();
            video.height = 256;
            video.width  = 256;
            video.addEventListener("playing", () => {
                resolve(video);
            });
        };
        video.onerror = reject;
    });
});
