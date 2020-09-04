import icsFormatter from "./ics-formatter";
import { configuration } from "./config";

export let config = new configuration();
export let icsObj = new icsFormatter(config.alarmOn);
