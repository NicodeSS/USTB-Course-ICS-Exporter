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
        importEvent: function(event) {
          calendarEvents.push(event);
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
            let event = {
                title: title,
                description: description,
                location: location,
                begin: begin,
                end: end,
                rrule: rrule,
                alarms: alarms
            };
            calendarEvents.push(event);
        },
        formatEvent: function(event) {
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
            if (typeof event.title === "undefined")
                throw new TypeError("VEVENT has no TITLE!");
            if (typeof event.begin === "undefined")
                throw new TypeError("VEVENT has no DTSTART!");
            if (typeof event.end === "undefined")
                throw new TypeError("VEVENT has no DTEND!");
            let eventContent = [];
            eventContent.push(
                "BEGIN:VEVENT",
                "X-MICROSOFT-CDO-BUSYSTATUS:BUSY",
                "X-MICROSOFT-CDO-IMPORTANCE:1",
                "X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC",
                "SUMMARY:" + event.title,
                "DTSTART:" + timeConvert(event.begin),
                "DTEND:" + timeConvert(event.end)
            );
            if (typeof event.location !== "undefined")
                eventContent.push("LOCATION:" + event.location);
            if (typeof event.description !== "undefined")
                eventContent.push("DESCRIPTION:" + event.description);
            if (typeof event.rrule !== "undefined") {
                if (typeof event.rrule.FREQ === "undefined")
                    throw new TypeError("RRULE.FREQ undefined!");
                if (
                    !(
                        event.rrule.FREQ === "DAILY" ||
                        event.rrule.FREQ === "WEEKLY" ||
                        event.rrule.FREQ === "MONTHLY" ||
                        event.rrule.FREQ === "YEARLY"
                    )
                )
                    throw "RRule.FREQ = " + event.rrule.FREQ + " is illegal.";
                let rrulestr = "";
                rrulestr += "FREQ=" + event.rrule.FREQ + ";";
                if (typeof event.rrule.COUNT !== "undefined")
                    rrulestr += "COUNT=" + event.rrule.COUNT + ";";
                if (typeof event.rrule.INTERVAL !== "undefined")
                    rrulestr += "INTERVAL=" + event.rrule.INTERVAL + ";";
                if (typeof event.rrule.UNTIL !== "undefined")
                    rrulestr += "UNTIL=" + event.rrule.UNTIL + ";";
                eventContent.push("RRULE:" + rrulestr);
            }
            if (typeof event.alarms !== "undefined" && alarmEnabled) {
                for (let item = 0 ; item<event.alarms.length ; item ++) {
                    let alarm = event.alarms[item];
                    
                    if (typeof alarm.ACTION === "undefined")
                        throw new TypeError("Alarm.ACTION undefined!");
                    if (typeof alarm.TRIGGER === "undefined")
                        throw new TypeError("Alarm.TRIGGER undefined!");

                    let alarmContent = [],
                        uuid = this.UUID();
                    alarmContent.push(
                        "BEGIN:VALARM",
                        "UID:" + uuid,
                        "X-WR-ALARMUID:" + uuid,
                        "ACTION:" + alarm.ACTION,
                        "TRIGGER:" + alarm.TRIGGER
                    );
                    switch (alarm.ACTION) {
                        case "AUDIO":
                            if (typeof alarm.ATTACH !== "undefined")
                                alarmContent.push("ATTACH;" + alarm.ATTACH);
                            alarmContent.push("X-APPLE-DEFAULT-ALARM:TRUE");
                            break;
                        case "DISPLAY":
                            if (typeof alarm.DESCRIPTION === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is DISPLAY but DESCRIPTION undefined"
                                );
                            alarmContent.push("DESCRIPTION:" + alarm.DESCRIPTION);
                            break;
                        case "EMAIL":
                            if (typeof alarm.DESCRIPTION === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is EMAIL but DESCRIPTION undefined"
                                );
                            if (typeof alarm.SUMMARY === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is EMAIL but SUMMARY undefined"
                                );
                            alarmContent.push(
                                "SUMMARY:" + alarm.SUMMARY,
                                "DESCRIPTION:" + alarm.DESCRIPTION
                            );
                            if (typeof alarm.ATTENDEE !== "undefined")
                                alarmContent.push("ATTENDEE:" + alarm.ATTENDEE);
                            if (typeof alarm.ATTACH !== "undefined")
                                alarmContent.push("ATTACH;" + alarm.ATTACH);
                            break;
                        case "PROCEDURE":
                            if (typeof alarm.ATTACH === "undefined")
                                throw new TypeError(
                                    "Alarm's ACTION is PROCEDURE but ATTACH undefined"
                                );
                            alarmContent.push("ATTACH;" + alarm.ATTACH);
                            if (typeof alarm.DESCRIPTION !== "undefined")
                                alarmContent.push("DESCRIPTION:" + alarm.DESCRIPTION);
                            break;
                        default:
                            throw new TypeError("Alarm.ACTION is illegal.");
                    }
                    if (
                        typeof alarm.REPEAT !== "undefined" &&
                        typeof alarm.DURATION !== "undefined"
                    ) {
                        alarmContent.push(
                            "REPEAT:" + alarm.REPEAT,
                            "DURATION:" + alarm.DURATION
                        );
                    } else if (
                        typeof alarm.REPEAT === "undefined" &&
                        typeof alarm.DURATION === "undefined"
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
                    let event = calendarEvents[item],
                        temp = this.formatEvent(event);
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