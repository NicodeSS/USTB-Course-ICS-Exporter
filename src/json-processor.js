import addClass from "./class-adder";
import { icsObj, config } from "./instance";

export default function processJSON(data) {
  function getDurations(str) {
    let ret = [];
    const regex = /周/gi;
    str = str.replace(regex, "");
    while (str.includes(",")) {
      ret.push(str.substring(0, str.indexOf(",")));
      str = str.substring(str.indexOf(",") + 1, str.length);
    }
    ret.push(str);

    if (config.semester === 1) {
      let _ret = [];
      for (let i = 0; i < ret.length; i++) {
        let t = ret[i].toString();
        if (t.includes("单")) {
          let startWeek = Number.parseInt(t.substring(0, t.indexOf("-"))),
            endWeek = Number.parseInt(
              t.substring(t.indexOf("-") + 1, t.length - 1)
            );
          if (
            startWeek < config.nationalDayWeek &&
            config.nationalDayWeek <= endWeek
          ) {
            if (
              config.nationalDayWeek % 2 &&
              config.nationalDayWeek - 2 === startWeek
            )
              _ret.push(startWeek.toString());
            else
              _ret.push(
                startWeek +
                  "-" +
                  (config.nationalDayWeek - 1 - (config.nationalDayWeek % 2)) +
                  "单"
              );
            if (config.nationalDayWeek === endWeek)
              _ret.push(endWeek.toString());
            else _ret.push(config.nationalDayWeek + "-" + endWeek + "单");
          } else _ret.push(t);
        } else if (t.includes("双")) {
          let startWeek = Number.parseInt(t.substring(0, t.indexOf("-"))),
            endWeek = Number.parseInt(
              t.substring(t.indexOf("-") + 1, t.length - 1)
            );
          if (
            startWeek < config.nationalDayWeek &&
            config.nationalDayWeek <= endWeek
          ) {
            if (
              !config.nationalDayWeek % 2 &&
              config.nationalDayWeek - 2 === startWeek
            )
              _ret.push(startWeek.toString());
            else
              _ret.push(
                startWeek +
                  "-" +
                  (config.nationalDayWeek - 2 + (config.nationalDayWeek % 2)) +
                  "双"
              );
            if (config.nationalDayWeek === endWeek)
              _ret.push(endWeek.toString());
            else _ret.push(config.nationalDayWeek + "-" + endWeek + "双");
          } else _ret.push(t);
        } else if (t.includes("-")) {
          let startWeek = Number.parseInt(t.substring(0, t.indexOf("-"))),
            endWeek = Number.parseInt(
              t.substring(t.indexOf("-") + 1, t.length)
            );
          if (
            startWeek < config.nationalDayWeek &&
            config.nationalDayWeek <= endWeek
          ) {
            if (startWeek === config.nationalDayWeek - 1)
              _ret.push(startWeek.toString());
            else _ret.push(startWeek + "-" + (config.nationalDayWeek - 1));
            if (config.nationalDayWeek === endWeek)
              _ret.push(endWeek.toString());
            else _ret.push(config.nationalDayWeek + "-" + endWeek);
          } else _ret.push(t);
        } else _ret.push(t);
      }
      ret = _ret;
    }

    return ret;
  }

  icsObj.empty();
  for (let iday = 1; iday <= 7; iday++)
    for (let isection = 1; isection <= 6; isection++)
      for (let iseq = 0; iseq < data.map[isection][iday].length; iseq++) {
        let temp = data.map[isection][iday][iseq];
        if (temp.length !== 0) {
          let title = temp.courseName,
            location =
              temp["classroom.roomNickname"] != null
                ? temp["classroom.roomNickname"]
                : "未知",
            durations = getDurations(temp.SKZCZFC);
          for (let i = 0; i < durations.length; i++) {
            let classEvent = {
              title: title,
              location: location,
              day: iday,
              section: isection,
              duration: durations[i],
            };
            addClass(classEvent);
          }
        }
      }
  icsObj.download();
}
