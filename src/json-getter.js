import processJSON from "./json-processor";
import { config, axiosObj } from "./instance";

/* Get semester, initial day*/
export async function getInfo() {
  if (!config.semester || !config.initialDay) {
    try {
      const result = await axiosObj.get(config.infoUrl);
      if (result.data.code !== "SUCCESS")
        throw result;
      let { year, month, day, schoolWeek, dayOfWeek, semester } = result.data.body.curSchoolDate;
      let _month = month - 1, _day = day - (schoolWeek - 1) * 7 - dayOfWeek + 1;

      config.semester = config.semester || semester;
      config.initialDay = config.initialDay || new Date(year, _month, _day, 12, 0, 0).toISOString().substr(0, 10);
    } catch (error) {
      console.error(error);
      if (error.toJSON().message.includes("401")) {
        alert("您还未登陆微教务，请登录后重试！");
        throw "401 Unauthorized";
      }
      else
        alert("服务器错误：" + error.message + "，请打开Console查看。")
      config.initialDay = config.initialDay || "2020-09-14";
      config.semester = config.semester || 1;
      alert(
        "获取学期开始日期失败！使用 " + config.initialDay + " 作为第一周周一。"
      );
    }
  }
  if (config.semester === 1 && !config.nationalDayWeek)
    config.nationalDayWeek =
      // use which week year-10-03 in as holiday week
      Math.floor(
        (new Date(config.initialDay.substr(0, 4), 9, 3, 12, 0, 0) - new Date(config.initDay + " 12:00:00")) / 86400000 / 7
      ) + 1;
}

/* get course information */
export async function getJson() {
  try {
    const result = await axiosObj.get(config.jsonUrl);
    if (result.data.code !== "SUCCESS")
      throw result;
    processJSON(result.data.body);
  } catch (error) {
    console.error(error);
    if (error.toJSON().message.includes("401")) {
      alert("您还未登陆微教务，请登录后重试！");
      throw "401 Unauthorized";
    }
    else
      alert("服务器错误：" + error.message + "，请打开Console查看。")
  }
}