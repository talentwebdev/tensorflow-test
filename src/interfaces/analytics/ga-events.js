import events from "../../data/analytics";
import {get} from "../state";

const createEvent = data => () =>
    ("ga" in window) && window.ga("send", "event", data.category, data.action, data.label);

const all_events = events.reduce((acc, data) => {
    if (data.name === "experience_type") {
        acc[data.name] = () => {
            if ("ga" in window) {
                window.ga("send", "event", data.category, data.action, get("upload_type") === "amoe" ? "amoe" : "3dof");
            }
        };
    } else if (data.name === "frame_rate_avg") {
        acc[data.name] = (fps) => {
            if ("ga" in window) {
                window.ga("send", "event", data.category, data.action, data.label, fps);
            }
        };
    } else {
        acc[data.name] = createEvent(data);
    }
    return acc;
}, {});

export default all_events;
