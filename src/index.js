import getJSON from "./json-getter";
import { config } from "./instance";

if (document.domain === config.checkDomain) {
  getJSON(config.jsonUrl);
} else {
  alert("您当前所在网页不是微教务网页，无法获取课表！");
}
