import addClass from "./class-adder";
import {icsObj} from "./instance";

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
                            duration: durations[i]
                        };
                        addClass(classEvent);
                    }
                }
            }
    icsObj.download();
}