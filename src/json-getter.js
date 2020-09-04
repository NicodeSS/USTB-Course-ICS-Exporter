import processJSON from "./json-processor";
import { config } from "./instance";

/* Get semester, initial day*/
export default function getInitialDay() {
  let request = new XMLHttpRequest();
  request.open("get", config.infoUrl);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      let json = JSON.parse(request.responseText);
      if (json.code === "SUCCESS") {
        let content = json.body.curSchoolDate;
        let { year, month, day, schoolWeek, dayOfWeek } = content;
        let _month = month - 1,
          _day = day - (schoolWeek - 1) * 7 - dayOfWeek + 1;

        config.semester = content.semester;
        let initDay = new Date(year, _month, _day, 12, 0, 0);
        if (config.semester === 1 && !config.nationalDayWeek) {
          config.nationalDayWeek =
            // use which week year-10-03 in as holiday week
            Math.floor(
              (new Date(year, 9, 3, 12, 0, 0) - initDay) / 86400000 / 7
            ) + 1;
        }
        config.initialDay = initDay.toISOString().substr(0, 10);
      } else {
        let fallbackInitialDay = "2020-09-14";
        config.semester = 1;
        config.nationalDayWeek = 3;
        alert(
          "获取学期开始日期失败！使用 " +
            fallbackInitialDay +
            " 作为第一周周一。"
        );
        config.initialDay = fallbackInitialDay;
      }
    } else {
      alert(
        request.status == 401
          ? "您还未登录微教务！"
          : "发生错误：" + request.status + "，请到Console中查看。"
      );
      let fallbackInitialDay = "2020-09-14";
      config.semester = 1;
      config.nationalDayWeek = 3;
      alert(
        "获取学期开始日期失败！使用 " + fallbackInitialDay + " 作为第一周周一。"
      );
      config.initialDay = fallbackInitialDay;
    }
    // For browser compatibility, use serial process instead of ES6 async/await.
    getJSON();
  };
}

/* get course information */
export function getJSON() {
  let request = new XMLHttpRequest();
  request.open("get", config.jsonUrl);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      let json = JSON.parse(request.responseText);
      if (json.code === "SUCCESS") {
        processJSON(json.body);
      } else {
        alert("微教务后台获取课表失败！");
      }
    } else if (request.status == 401) {
      alert("您还未登录微教务！");
    } else {
      alert("发生错误：" + request.status + "，请到Console中查看。");
    }
  };
}
