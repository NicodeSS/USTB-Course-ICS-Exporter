import getInitialDay from "./json-getter";
import { config } from "./instance";

if (document.domain === config.checkDomain) {
  if (!config.semester || !config.initialDay) getInitialDay();
} else {
  alert("您当前所在网页不是微教务网页，无法获取课表！");
}
