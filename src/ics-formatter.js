/* USTB CourseTable ICS Exporter
 * Export 北京科技大学微教务课表 to standard iCalendar .ics File
 * By Nicode
 */

import saveAs from "file-saver";
export default function icsFormatter(alarmOn) {
    "use strict";
    if (navigator.userAgent.includes("MSIE")) {
        alert("This Script don't support IE Browser!");
        return;
    }

    let SEPARATOR = navigator.appVersion.includes("Win") ? "\r\n" : "\n";

    let calendarName = "Calendar";
    let calendarEvents = [];
    let alarmEnabled = alarmOn;
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
            return calendarStart.join(SEPARATOR);
        },
        buildCalendarEnd: function() {
            return "END:VCALENDAR";
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
        setAlarmEnabled: function(enabled) {
            alarmEnabled = enabled;
        },
        addEvent: function(
            title,
            description,
            location,
            begin,
            end,
            rrule,
            alarms
        ) {
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
        formatEvent: function(
            title,
            description,
            location,
            begin,
            end,
            rrule,
            alarms
        ) {
            function timeConvert(t) {
                let tYear = ("0000" + t.getUTCFullYear().toString()).slice(-4),
                    tMonth = ("00" + (t.getUTCMonth() + 1).toString()).slice(-2),
                    tDay = ("00" + t.getUTCDate().toString()).slice(-2),
                    tHours = ("00" + t.getUTCHours().toString()).slice(-2),
                    tMinutes = ("00" + t.getUTCMinutes().toString()).slice(-2),
                    tSeconds = ("00" + t.getUTCSeconds().toString()).slice(-2);

                let tDate = tYear + tMonth + tDay,
                    tTime = "T" + tHours + tMinutes + tSeconds + "Z";
                return tDate + tTime;
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
                "DTEND:" + timeConvert(end)
            );
            if (typeof location !== "undefined")
                eventContent.push("LOCATION:" + location);
            if (typeof description !== "undefined")
                eventContent.push("DESCRIPTION:" + description);
            if (typeof rrule !== "undefined") {
                if (typeof rrule.FREQ === "undefined")
                    throw new TypeError("RRULE.FREQ undefined!");
                if (
                    !(
                        rrule.FREQ === "DAILY" ||
                        rrule.FREQ === "WEEKLY" ||
                        rrule.FREQ === "MONTHLY" ||
                        rrule.FREQ === "YEARLY"
                    )
                )
                    throw "RRule.FREQ = " + rrule.FREQ + " is illegal.";
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
                for (let item = 0 ; item<alarms.length ; item ++) {
                    if (typeof alarms[item].ACTION === "undefined")
                        throw new TypeError("Alarm.ACTION undefined!");
                    if (typeof alarms[item].TRIGGER === "undefined")
                        throw new TypeError("Alarm.TRIGGER undefined!");

                    let alarmContent = [],
                        uuid = this.UUID();
                    alarmContent.push(
                        "BEGIN:VALARM",
                        "UID:" + uuid,
                        "X-WR-ALARMUID:" + uuid,
                        "ACTION:" + alarms[item].ACTION,
                        "TRIGGER:" + alarms[item].TRIGGER
                    );
                    switch (alarms[item].ACTION) {
                        case "AUDIO":
                            if (typeof alarms[item].ATTACH !== "undefined")
                                alarmContent.push("ATTACH;" + alarms[item].ATTACH);
                            alarmContent.push("X-APPLE-DEFAULT-ALARM:TRUE");
                            break;
                        case "DISPLAY":
                            if (typeof alarms[item].DESCRIPTION === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is DISPLAY but DESCRIPTION undefined"
                                );
                            alarmContent.push("DESCRIPTION:" + alarms[item].DESCRIPTION);
                            break;
                        case "EMAIL":
                            if (typeof alarms[item].DESCRIPTION === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is EMAIL but DESCRIPTION undefined"
                                );
                            if (typeof alarms[item].SUMMARY === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is EMAIL but SUMMARY undefined"
                                );
                            alarmContent.push(
                                "SUMMARY:" + alarms[item].SUMMARY,
                                "DESCRIPTION:" + alarms[item].DESCRIPTION
                            );
                            if (typeof alarms[item].ATTENDEE !== "undefined")
                                alarmContent.push("ATTENDEE:" + alarms[item].ATTENDEE);
                            if (typeof alarms[item].ATTACH !== "undefined")
                                alarmContent.push("ATTACH;" + alarms[item].ATTACH);
                            break;
                        case "PROCEDURE":
                            if (typeof alarms[item].ATTACH === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is PROCEDURE but ATTACH undefined"
                                );
                            alarmContent.push("ATTACH;" + alarms[item].ATTACH);
                            if (typeof alarms[item].DESCRIPTION !== "undefined")
                                alarmContent.push("DESCRIPTION:" + alarms[item].DESCRIPTION);
                            break;
                        default:
                            throw new TypeError("Alarm.ACTION is illegal.");
                    }
                    if (
                        typeof alarms[item].REPEAT !== "undefined" &&
                        typeof alarms[item].DURATION !== "undefined"
                    ) {
                        alarmContent.push(
                            "REPEAT:" + alarms[item].REPEAT,
                            "DURATION:" + alarms[item].DURATION
                        );
                    } else if (
                        typeof alarms[item].REPEAT === "undefined" &&
                        typeof alarms[item].DURATION === "undefined"
                    );
                    else
                        throw new TypeError(
                            "Alarm has only one attribute between REPEAT and DURATION"
                        );
                    alarmContent.push("END:VALARM");
                    eventContent = eventContent.concat(alarmContent);
                }
            }
            eventContent.push("UID:" + this.UUID(), "TRANSP:OPAQUE", "END:VEVENT");
            return eventContent.join(SEPARATOR);
        },
        generateICS: function() {
            let formattedEvents = [];
            for (let item = 0; item < calendarEvents.length; item++) {
                try {
                    let temp = this.formatEvent(
                        calendarEvents[item].title,
                        calendarEvents[item].description,
                        calendarEvents[item].location,
                        calendarEvents[item].begin,
                        calendarEvents[item].end,
                        calendarEvents[item].rrule,
                        calendarEvents[item].alarms
                    );
                    if (temp) formattedEvents.push(temp);
                } catch (error) {
                    console.log(calendarEvents[item]);
                    console.log(error);
                }
            }
            return this.buildCalendarBegin() +
                SEPARATOR +
                formattedEvents.join(SEPARATOR) +
                SEPARATOR +
                this.buildCalendarEnd();
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