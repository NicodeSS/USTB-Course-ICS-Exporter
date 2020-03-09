let courseExporterVersion = "1.1";
let initialDay = "2020-02-24";
let alarmOn = false;
/* FileSaver
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */
var saveAs =
  saveAs ||
  (function(e) {
    "use strict";
    if (
      typeof e === "undefined" ||
      (typeof navigator !== "undefined" &&
        /MSIE [1-9]\./.test(navigator.userAgent))
    ) {
      return;
    }
    let t = e.document,
      n = function() {
        return e.URL || e.webkitURL || e;
      },
      r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
      o = "download" in r,
      a = function(e) {
        let t = new MouseEvent("click");
        e.dispatchEvent(t);
      },
      i = /constructor/i.test(e.HTMLElement) || e.safari,
      f = /CriOS\/[\d]+/.test(navigator.userAgent),
      u = function(t) {
        (e.setImmediate || e.setTimeout)(function() {
          throw t;
        }, 0);
      },
      s = "application/octet-stream",
      d = 1e3 * 40,
      c = function(e) {
        let t = function() {
          if (typeof e === "string") {
            n().revokeObjectURL(e);
          } else {
            e.remove();
          }
        };
        setTimeout(t, d);
      },
      l = function(e, t, n) {
        t = [].concat(t);
        let r = t.length;
        while (r--) {
          let o = e["on" + t[r]];
          if (typeof o === "function") {
            try {
              o.call(e, n || e);
            } catch (a) {
              u(a);
            }
          }
        }
      },
      p = function(e) {
        if (
          /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
            e.type
          )
        ) {
          return new Blob([String.fromCharCode(65279), e], { type: e.type });
        }
        return e;
      },
      v = function(t, u, d) {
        if (!d) {
          t = p(t);
        }
        let v = this,
          w = t.type,
          m = w === s,
          y,
          h = function() {
            l(v, "writestart progress write writeend".split(" "));
          },
          S = function() {
            if ((f || (m && i)) && e.FileReader) {
              let r = new FileReader();
              r.onloadend = function() {
                let t = f
                  ? r.result
                  : r.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                let n = e.open(t, "_blank");
                if (!n) e.location.href = t;
                t = undefined;
                v.readyState = v.DONE;
                h();
              };
              r.readAsDataURL(t);
              v.readyState = v.INIT;
              return;
            }
            if (!y) {
              y = n().createObjectURL(t);
            }
            if (m) {
              e.location.href = y;
            } else {
              let o = e.open(y, "_blank");
              if (!o) {
                e.location.href = y;
              }
            }
            v.readyState = v.DONE;
            h();
            c(y);
          };
        v.readyState = v.INIT;
        if (o) {
          y = n().createObjectURL(t);
          setTimeout(function() {
            r.href = y;
            r.download = u;
            a(r);
            h();
            c(y);
            v.readyState = v.DONE;
          });
          return;
        }
        S();
      },
      w = v.prototype,
      m = function(e, t, n) {
        return new v(e, t || e.name || "download", n);
      };
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
      return function(e, t, n) {
        t = t || e.name || "download";
        if (!n) {
          e = p(e);
        }
        return navigator.msSaveOrOpenBlob(e, t);
      };
    }
    w.abort = function() {};
    w.readyState = w.INIT = 0;
    w.WRITING = 1;
    w.DONE = 2;
    w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null;
    return m;
  })(
    (typeof self !== "undefined" && self) ||
      (typeof window !== "undefined" && window) ||
      this.content
  );
if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (
  typeof define !== "undefined" &&
  define !== null &&
  define.amd !== null
) {
  define("FileSaver.js", function() {
    return saveAs;
  });
}

/* USTB CourseTable ICS Exporter
 * Export 北京科技大学微教务课表 to standard iCalendar .ics File
 * By Nicode
 */

let icsFormatter = function() {
  "use strict";
  if (navigator.userAgent.includes("MSIE")) {
    alert("This Script don't support IE Browser!");
    return;
  }

  let SEPARATOR = navigator.appVersion.includes("Win") ? "\r\n" : "\n";

  let calendarName = "Calendar";
  let calendarEvents = [];
  let alarmEnabled = false;
  let prodID = "-//Nicode//iCalendar Generator//CN";

  return {
    buildCalendarBegin: function() {
      let calendarStart = [];
      calendarStart.push(
          "BEGIN:VCALENDAR",
          "METHOD:PUBLISH",
          "VERSION:2.0",
          "PRODID:" + prodID,
          "CALSCALE:GREGORIAN",
          "X-WR-CALNAME:" + calendarName,
          "X-WR-TIMEZONE:Asia/Shanghai"
      );
      let ret = calendarStart.join(SEPARATOR);
      return ret;
    },
    buildCalendarEnd: function() {
      let ret = "END:VCALENDAR";
      return ret;
    },
    events: function() {
      return calendarEvents;
    },
    empty: function() {
      calendarEvents = [];
    },
    /**
     * Generate a random upper case UUID string.
     * @returns {string} Standard Upper Case UUID String
     * @constructor
     */
    UUID: function() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      ).toUpperCase();
    },
    setCalendarName: function(name) {
      calendarName = name;
    },
    /**
     * Set whether event alarm is working.
     * only if it's set "true" ,your alarm will take effect.
     * @param {Boolean} enabled
     */
    setAlarmEnabled: function(enabled){
      alarmEnabled = enabled;
    },
    addEvent: function(title, description, location, begin, end, rrule, alarms) {
      calendarEvents.push({
        title: title,
        description: description,
        location: location,
        begin: begin,
        end: end,
        rrule: rrule,
        alarms: alarms
      });
    },
    formatEvent: function(title, description, location, begin, end, rrule, alarms) {
      function timeConvert(t) {
        let tYear = ("0000" + t.getUTCFullYear().toString()).slice(-4),
            tMonth = ("00" + (t.getUTCMonth() + 1).toString()).slice(-2),
            tDay = ("00" + t.getUTCDate().toString()).slice(-2),
            tHours = ("00" + t.getUTCHours().toString()).slice(-2),
            tMinutes = ("00" + t.getUTCMinutes().toString()).slice(-2),
            tSeconds = ("00" + t.getUTCSeconds().toString()).slice(-2);

        let tDate = tYear + tMonth + tDay,
            tTime = 'T' + tHours + tMinutes + tSeconds + 'Z';
        let ret = tDate + tTime;
        return ret;
      }
      if (typeof title === "undefined")
        throw new TypeError("VEVENT has no TITLE!");
      if (typeof begin === "undefined")
        throw new TypeError("VEVENT has no DTSTART!");
      if (typeof end === "undefined")
        throw new TypeError("VEVENT has no DTEND!");
      let eventContent = [];
      eventContent.push(
          "BEGIN:VEVENT",
          "X-MICROSOFT-CDO-BUSYSTATUS:BUSY",
          "X-MICROSOFT-CDO-IMPORTANCE:1",
          "X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC",
          "SUMMARY:" + title,
          "DTSTART:" + timeConvert(begin),
          "DTEND:" + timeConvert(end),
      );
      if (typeof location !== "undefined")
        eventContent.push("LOCATION:" + location);
      if (typeof description !== "undefined")
        eventContent.push("DESCRIPTION:" + description);
      if (typeof rrule !== "undefined") {
        if (typeof rrule.FREQ === "undefined")
          throw new TypeError("RRULE.FREQ undefined!");
        if(!(rrule.FREQ === "DAILY" || rrule.FREQ === "WEEKLY" || rrule.FREQ === "MONTHLY" || rrule.FREQ === "YEARLY"))
          throw "RRule.FREQ = " + rrule.FREQ +" is illegal.";
        let rrulestr = "";
        rrulestr += "FREQ=" + rrule.FREQ + ";";
        if (typeof rrule.COUNT !== "undefined")
          rrulestr += "COUNT=" + rrule.COUNT + ";";
        if (typeof rrule.INTERVAL !== "undefined")
          rrulestr += "INTERVAL=" + rrule.INTERVAL + ";";
        if (typeof rrule.UNTIL !== "undefined")
          rrulestr += "UNTIL=" + rrule.UNTIL + ";";
        eventContent.push("RRULE:" + rrulestr);
      }
      if (typeof alarms !== "undefined" && alarmEnabled) {
        for (let i in alarms) {
          if (typeof alarms[i].ACTION === "undefined")
            throw new TypeError("Alarm.ACTION undefined!");
          if (typeof alarms[i].TRIGGER === "undefined")
            throw new TypeError("Alarm.TRIGGER undefined!");

          let alarmContent = [], uuid = this.UUID();
          alarmContent.push(
              "BEGIN:VALARM",
              "UID:" + uuid,
              "X-WR-ALARMUID:" + uuid,
              "ACTION:" + alarms[i].ACTION,
              "TRIGGER:" + alarms[i].TRIGGER
          );
          switch (alarms[i].ACTION) {
            case "AUDIO":
              if (typeof alarms[i].ATTACH !== "undefined")
                alarmContent.push("ATTACH;" + alarms[i].ATTACH);
              alarmContent.push("X-APPLE-DEFAULT-ALARM:TRUE");
              break;
            case "DISPLAY":
              if (typeof alarms[i].DESCRIPTION === "undefined")
                throw new TypeError("Alarm's ACTION is DISPLAY but DESCRIPTION undefined");
              alarmContent.push("DESCRIPTION:" + alarms[i].DESCRIPTION);
              break;
            case "EMAIL":
              if (typeof alarms[i].DESCRIPTION === "undefined")
                throw new TypeError("Alarm's ACTION is EMAIL but DESCRIPTION undefined");
              if (typeof alarms[i].SUMMARY === "undefined")
                throw new TypeError("Alarm's ACTION is EMAIL but SUMMARY undefined");
              alarmContent.push(
                  "SUMMARY:" + alarms[i].SUMMARY,
                  "DESCRIPTION:" + alarms[i].DESCRIPTION
              );
              if (typeof alarms[i].ATTENDEE !== "undefined")
                alarmContent.push("ATTENDEE:" + alarms[i].ATTENDEE);
              if (typeof alarms[i].ATTACH !== "undefined")
                alarmContent.push("ATTACH;" + alarms[i].ATTACH);
              break;
            case "PROCEDURE":
              if (typeof alarms[i].ATTACH === "undefined")
                throw new TypeError("Alarm's ACTION is PROCEDURE but ATTACH undefined");
              alarmContent.push("ATTACH;" + alarms[i].ATTACH);
              if (typeof alarms[i].DESCRIPTION !== "undefined")
                alarmContent.push("DESCRIPTION:" + alarms[i].DESCRIPTION);
              break;
            default:
              throw new TypeError("Alarm.ACTION is illegal.");
          }
          if (typeof alarms[i].REPEAT !== "undefined" && typeof alarms[i].DURATION !== "undefined") {
            alarmContent.push(
                "REPEAT:" + alarms[i].REPEAT,
                "DURATION:" + alarms[i].DURATION
            );
          } else if (typeof alarms[i].REPEAT === "undefined" && typeof alarms[i].DURATION === "undefined") ;
          else throw new TypeError("Alarm has only one attribute between REPEAT and DURATION");
          alarmContent.push("END:VALARM");
          eventContent = eventContent.concat(alarmContent);
        }
      }
      eventContent.push(
          "UID:" + this.UUID(),
          "TRANSP:OPAQUE",
          "END:VEVENT"
      );
      let ret = eventContent.join(SEPARATOR);
      return ret;
    },
    generateICS: function() {
      let formattedEvents = [];
      for (let i in calendarEvents) {
        let temp = this.formatEvent(
          calendarEvents[i].title,
          calendarEvents[i].description,
          calendarEvents[i].location,
          calendarEvents[i].begin,
          calendarEvents[i].end,
          calendarEvents[i].rrule,
          calendarEvents[i].alarms
        );
        if (temp)
          formattedEvents.push(temp);
      }
      let ret =
        this.buildCalendarBegin() +
        SEPARATOR +
        formattedEvents.join(SEPARATOR) +
        SEPARATOR +
        this.buildCalendarEnd();

      return ret;
    },
    download: function(filename, ext) {
      let calendar = this.generateICS();
      if (calendar) {
        filename = typeof filename !== "undefined" ? filename : "Calendar";
        ext = typeof ext !== "undefined" ? ext : ".ics";

        let blob = new Blob([calendar], {
          type: "attachment/csv;charset=utf-8"
        });
        saveAs(blob, filename + ext);
      }
      return false;
    }
  };
};
let icsObj = icsFormatter();

function addClass(icsObj, title, location, day, section, duration) {
  // flag 0: class start time  2: class end time
  function getTargetTime(week, day, section, flag) {
    let classTable = [
      [0, 0, 0, 0],
      [8, 0, 9, 35],
      [9, 55, 11, 30],
      [13, 30, 15, 5],
      [15, 25, 16, 55],
      [17, 10, 18, 45],
      [19, 30, 21, 5]
    ];
    let target = new Date(initialDay);
    target.setDate(target.getDate() + (week - 1) * 7 + day - 1);
    target.setHours(classTable[section][flag]);
    target.setMinutes(classTable[section][flag + 1]);
    target.setSeconds(0);
    return target;
  }

  let description = title + " " + location + " " + duration;
  let startTime, endTime;
  let rrule = {};
  rrule.FREQ = "WEEKLY";
  let alarm = undefined;

  if (duration.includes("单")) {
    duration = duration.replace("单", "");
    startTime = Number.parseInt(duration.substring(0, duration.indexOf("-")));
    endTime = Number.parseInt(duration.substring(duration.indexOf("-") + 1, duration.length));
    if (!startTime % 2) startTime += 1;
    if (!endTime % 2) endTime -= 1;
    rrule.INTERVAL = 2;
    rrule.COUNT = (endTime - startTime) / 2 + 1;
  } else if (duration.includes("双")) {
    duration = duration.replace("双", "");
    startTime = Number.parseInt(duration.substring(0, duration.indexOf("-")));
    endTime = Number.parseInt(duration.substring(duration.indexOf("-") + 1, duration.length));
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
    endTime = startTime;
    rrule = undefined;
  }
  let begin = getTargetTime(startTime, day, section, 0),
      end = getTargetTime(startTime, day, section, 2);
  try{
    icsObj.addEvent(title, description, location, begin, end, rrule, alarm);
  } catch (e) {
    console.log(e);
  }
}

function process(data) {
  function getDurations(str) {
    let ret = [];
    const regex = /周/gi;
    str = str.replace(regex, "");
    while (str.includes(",")) {
      ret.push(str.substring(0, str.indexOf(",")));
      str = str.substring(str.indexOf(",") + 1, str.length);
    }
    ret.push(str);
    return ret;
  }
  for (let iday = 1; iday <= 7; iday++)
    for (let isection = 1; isection <= 6; isection++)
      for (let iseq = 0; iseq < data.map[isection][iday].length; iseq++) {
        let temp = data.map[isection][iday][iseq];
        if (temp.length != 0) {
          let title = temp.courseName,
              location = temp["classroom.roomNickname"] != null ? temp["classroom.roomNickname"] : "未知",
              durations = getDurations(temp.SKZCZFC);
          for (let i = 0; i < durations.length; i++)
            addClass(icsObj, title, location, iday, isection, durations[i]);
        }
      }
}
function getJSON() {
  // http://jwstu.ustb.edu.cn/smvc/StuQueryInfoService/viewStuCourseSchedule.json
  let url = "http://jwstu.ustb.edu.cn/smvc/StuQueryInfoService/viewStuCourseSchedule.json";
  let request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function() {
    if (request.status == 200) {
      let json = JSON.parse(request.responseText);
      if (json.code == "SUCCESS") {
        console.log(json.body);
        process(json.body);
        icsObj.download();
      }
    }
  };
}
getJSON();
