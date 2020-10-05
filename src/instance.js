import icsFormatter from "./ics-formatter";
import axios from "axios";
import { configuration } from "./config";

export const config = new configuration();
export const icsObj = new icsFormatter(config.alarmOn);
export const axiosObj = axios.create({
    baseURL: "http://" + config.checkDomain + "/",
    timeout: 10000
});

