import prizes from "../../data/prize-data.json";
import {get} from "../../interfaces/state";
import {prop} from "ramda";

export const getPrizeModel = uuid => {
    const country = get("country");
    const dict    = prop(country, prizes);

    if (dict) {
        const result = dict.find(entry => entry.uuid === uuid);
        if (result) {
            return result;
        } else {
            console.log("no prize found for uuuid", uuid);
            return null;
        }
    } else {
        console.warn("no prizes for country", country);
        return null;
    }
};
