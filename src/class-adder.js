import { config, icsObj } from "./instance";

export default function addClass(classEvent) {
  // flag 0: class start time  2: class end time
  function getTargetTime(week, day, section, flag) {
    let classTable = config.classTable;
    let target = new Date(config.initialDay);
    let offset =
      config.semester === 1 && week >= config.nationalDayWeek ? 1 : 0;
    target.setDate(target.getDate() + (week + offset - 1) * 7 + day - 1);
    target.setHours(classTable[section][flag]);
    target.setMinutes(classTable[section][flag + 1]);
    target.setSeconds(0);
    return target;
  }
  function getFullLocation(location) {
    if (location === "未知") return location;
    let identifier = location[0];
    for (let i = 0; i < config.locationFullName.length; i++) {
      if (identifier === config.locationFullName[i][0])
        return config.locationFullName[i][1].concat(location.substr(1));
    }
    return location;
  }

  let title = classEvent.title,
    location = getFullLocation(classEvent.location),
    day = classEvent.day,
    section = classEvent.section,
    duration = classEvent.duration;

  let description = title + " " + location + " " + duration,
    rrule = {
      FREQ: "WEEKLY",
    },
    alarms = [
      {
        ACTION: "DISPLAY",
        TRIGGER: "-PT10M",
        DESCRIPTION: "距" + title + "上课还有10分钟",
      },
    ],
    startTime,
    endTime;

  if (duration.includes("单")) {
    duration = duration.replace("单", "");
    startTime = Number.parseInt(duration.substring(0, duration.indexOf("-")));
    endTime = Number.parseInt(
      duration.substring(duration.indexOf("-") + 1, duration.length)
    );
    if (!startTime % 2) startTime += 1;
    if (!endTime % 2) endTime -= 1;
    rrule.INTERVAL = 2;
    rrule.COUNT = (endTime - startTime) / 2 + 1;
  } else if (duration.includes("双")) {
    duration = duration.replace("双", "");
    startTime = Number.parseInt(duration.substring(0, duration.indexOf("-")));
    endTime = Number.parseInt(
      duration.substring(duration.indexOf("-") + 1, duration.length)
    );
    if (startTime % 2) startTime += 1;
    if (endTime % 2) endTime -= 1;
    rrule.INTERVAL = 2;
    rrule.COUNT = (endTime - startTime) / 2 + 1;
  } else if (duration.includes("-")) {
    startTime = Number.parseInt(duration.substring(0, duration.indexOf("-")));
    endTime = Number.parseInt(
      duration.substring(duration.indexOf("-") + 1, duration.length)
    );
    rrule.INTERVAL = 1;
    rrule.COUNT = endTime - startTime + 1;
  } else {
    startTime = Number.parseInt(duration);
    rrule = undefined;
  }
  let begin = getTargetTime(startTime, day, section, 0),
    end = getTargetTime(startTime, day, section, 2);

  let event = {
    title: title,
    description: description,
    location: location,
    begin: begin,
    end: end,
    rrule: rrule,
    alarms: alarms,
  };
  icsObj.importEvent(event);
}
