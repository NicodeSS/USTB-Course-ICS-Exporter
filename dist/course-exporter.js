/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){\"use strict\";function b(a,b){return\"undefined\"==typeof b?b={autoBom:!1}:\"object\"!=typeof b&&(console.warn(\"Deprecated: Expected third argument to be a object\"),b={autoBom:!b}),b.autoBom&&/^\\s*(?:text\\/\\S*|application\\/xml|\\S*\\/\\S*\\+xml)\\s*;.*charset\\s*=\\s*utf-8/i.test(a.type)?new Blob([\"\\uFEFF\",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open(\"GET\",b),e.responseType=\"blob\",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error(\"could not download file\")},e.send()}function d(a){var b=new XMLHttpRequest;b.open(\"HEAD\",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent(\"click\"))}catch(c){var b=document.createEvent(\"MouseEvents\");b.initMouseEvent(\"click\",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f=\"object\"==typeof window&&window.window===window?window:\"object\"==typeof self&&self.self===self?self:\"object\"==typeof global&&global.global===global?global:void 0,a=f.saveAs||(\"object\"!=typeof window||window!==f?function(){}:\"download\"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement(\"a\");g=g||b.name||\"download\",j.download=g,j.rel=\"noopener\",\"string\"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target=\"_blank\")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:\"msSaveOrOpenBlob\"in navigator?function(f,g,h){if(g=g||f.name||\"download\",\"string\"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement(\"a\");i.href=f,i.target=\"_blank\",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open(\"\",\"_blank\"),e&&(e.document.title=e.document.body.innerText=\"downloading...\"),\"string\"==typeof a)return c(a,b,d);var g=\"application/octet-stream\"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\\/[\\d]+/.test(navigator.userAgent);if((i||g&&h)&&\"object\"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,\"data:attachment/file;\"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});\n\n//# sourceMappingURL=FileSaver.min.js.map\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/file-saver/dist/FileSaver.min.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/class-adder.js":
/*!****************************!*\
  !*** ./src/class-adder.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addClass; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instance */ \"./src/instance.js\");\n\n\n\nfunction addClass(classEvent) {\n    // flag 0: class start time  2: class end time\n    function getTargetTime(week, day, section, flag) {\n        let classTable = _config__WEBPACK_IMPORTED_MODULE_0__[\"config\"].classTable;\n        let target = new Date(_config__WEBPACK_IMPORTED_MODULE_0__[\"config\"].initialDay);\n        target.setDate(target.getDate() + (week - 1) * 7 + day - 1);\n        target.setHours(classTable[section][flag]);\n        target.setMinutes(classTable[section][flag + 1]);\n        target.setSeconds(0);\n        return target;\n    }\n    function getFullLocation(location) {\n        if (location === \"未知\")\n            return location;\n        let identifier = location[0];\n        for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__[\"config\"].locationFullName.length; i++){\n            if(identifier === _config__WEBPACK_IMPORTED_MODULE_0__[\"config\"].locationFullName[i][0])\n                return _config__WEBPACK_IMPORTED_MODULE_0__[\"config\"].locationFullName[i][1].concat(location.substr(1));\n        }\n        return location;\n    }\n    let title = classEvent.title,\n        location = getFullLocation(classEvent.location),\n        day = classEvent.day,\n        section = classEvent.section,\n        duration = classEvent.duration;\n\n    let description = title + \" \" + location + \" \" + duration,\n        rrule = {\n            FREQ: \"WEEKLY\"\n        },\n        alarms = [{\n        \"ACTION\": \"DISPLAY\",\n        \"TRIGGER\": \"-PT10M\",\n        \"DESCRIPTION\": \"距\"+title+\"上课还有10分钟\"\n        }],\n        startTime,\n        endTime;\n\n    if (duration.includes(\"单\")) {\n        duration = duration.replace(\"单\", \"\");\n        startTime = Number.parseInt(duration.substring(0, duration.indexOf(\"-\")));\n        endTime = Number.parseInt(\n            duration.substring(duration.indexOf(\"-\") + 1, duration.length)\n        );\n        if (!startTime % 2) startTime += 1;\n        if (!endTime % 2) endTime -= 1;\n        rrule.INTERVAL = 2;\n        rrule.COUNT = (endTime - startTime) / 2 + 1;\n    } else if (duration.includes(\"双\")) {\n        duration = duration.replace(\"双\", \"\");\n        startTime = Number.parseInt(duration.substring(0, duration.indexOf(\"-\")));\n        endTime = Number.parseInt(\n            duration.substring(duration.indexOf(\"-\") + 1, duration.length)\n        );\n        if (startTime % 2) startTime += 1;\n        if (endTime % 2) endTime -= 1;\n        rrule.INTERVAL = 2;\n        rrule.COUNT = (endTime - startTime) / 2 + 1;\n    } else if (duration.includes(\"-\")) {\n        startTime = Number.parseInt(duration.substring(0, duration.indexOf(\"-\")));\n        endTime = Number.parseInt(\n            duration.substring(duration.indexOf(\"-\") + 1, duration.length)\n        );\n        rrule.INTERVAL = 1;\n        rrule.COUNT = endTime - startTime + 1;\n    } else {\n        startTime = Number.parseInt(duration);\n        rrule = undefined;\n    }\n    let begin = getTargetTime(startTime, day, section, 0),\n        end = getTargetTime(startTime, day, section, 2);\n\n    let event = {\n        title: title,\n        description: description,\n        location: location,\n        begin: begin,\n        end: end,\n        rrule: rrule,\n        alarms: alarms\n    };\n    _instance__WEBPACK_IMPORTED_MODULE_1__[\"icsObj\"].importEvent(event);\n}\n\n//# sourceURL=webpack:///./src/class-adder.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config; });\nclass config {}\nconfig.checkDomain = \"jwstu.ustb.edu.cn\";\nconfig.jsonUrl = \"http://jwstu.ustb.edu.cn/smvc/StuQueryInfoService/viewStuCourseSchedule.json\";\nconfig.initialDay = \"2020-02-24\";\nconfig.alarmOn = true;\nconfig.classTable = [\n    [0, 0, 0, 0],\n    [8, 0, 9, 35],\n    [9, 55, 11, 30],\n    [13, 30, 15, 5],\n    [15, 20, 16, 55],\n    [17, 10, 18, 45],\n    [19, 30, 21, 5]\n];\nconfig.locationFullName = [\n    [\"信\",\"机电楼\"],\n    [\"逸\",\"逸夫楼\"],\n    [\"教\",\"教学楼\"],\n    [\"理\",\"理化楼\"],\n    [\"网\",\"网络楼\"],\n    [\"高\",\"高工楼\"],\n    [\"实\",\"实验楼\"],\n    [\"图\",\"图书馆\"],\n    [\"科\",\"科技楼\"]\n];\n\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/ics-formatter.js":
/*!******************************!*\
  !*** ./src/ics-formatter.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return icsFormatter; });\n/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ \"./node_modules/file-saver/dist/FileSaver.min.js\");\n/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);\n/* USTB CourseTable ICS Exporter\n * Export 北京科技大学微教务课表 to standard iCalendar .ics File\n * By Nicode\n */\n\n\nfunction icsFormatter(alarmOn) {\n    \"use strict\";\n    if (navigator.userAgent.includes(\"MSIE\")) {\n        alert(\"This Script don't support IE Browser!\");\n        return;\n    }\n\n    let SEPARATOR = navigator.appVersion.includes(\"Win\") ? \"\\r\\n\" : \"\\n\";\n\n    let calendarName = \"Calendar\";\n    let calendarEvents = [];\n    let alarmEnabled = alarmOn;\n    let prodID = \"-//Nicode//iCalendar Generator//CN\";\n\n    return {\n        buildCalendarBegin: function() {\n            let calendarStart = [];\n            calendarStart.push(\n                \"BEGIN:VCALENDAR\",\n                \"METHOD:PUBLISH\",\n                \"VERSION:2.0\",\n                \"PRODID:\" + prodID,\n                \"CALSCALE:GREGORIAN\",\n                \"X-WR-CALNAME:\" + calendarName,\n                \"X-WR-TIMEZONE:Asia/Shanghai\"\n            );\n            return calendarStart.join(SEPARATOR);\n        },\n        buildCalendarEnd: function() {\n            return \"END:VCALENDAR\";\n        },\n        events: function() {\n            return calendarEvents;\n        },\n        empty: function() {\n            calendarEvents = [];\n        },\n        /**\n         * Generate a random upper case UUID string.\n         * @returns {string} Standard Upper Case UUID String\n         * @constructor\n         */\n        UUID: function() {\n            function S4() {\n                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);\n            }\n            return (\n                S4() +\n                S4() +\n                \"-\" +\n                S4() +\n                \"-\" +\n                S4() +\n                \"-\" +\n                S4() +\n                \"-\" +\n                S4() +\n                S4() +\n                S4()\n            ).toUpperCase();\n        },\n        setCalendarName: function(name) {\n            calendarName = name;\n        },\n        /**\n         * Set whether event alarm is working.\n         * only if it's set \"true\" ,your alarm will take effect.\n         * @param {Boolean} enabled\n         */\n        setAlarmEnabled: function(enabled) {\n            alarmEnabled = enabled;\n        },\n        importEvent: function(event) {\n          calendarEvents.push(event);\n        },\n        addEvent: function(\n            title,\n            description,\n            location,\n            begin,\n            end,\n            rrule,\n            alarms\n        ) {\n            let event = {\n                title: title,\n                description: description,\n                location: location,\n                begin: begin,\n                end: end,\n                rrule: rrule,\n                alarms: alarms\n            };\n            calendarEvents.push(event);\n        },\n        formatEvent: function(event) {\n            function timeConvert(t) {\n                let tYear = (\"0000\" + t.getUTCFullYear().toString()).slice(-4),\n                    tMonth = (\"00\" + (t.getUTCMonth() + 1).toString()).slice(-2),\n                    tDay = (\"00\" + t.getUTCDate().toString()).slice(-2),\n                    tHours = (\"00\" + t.getUTCHours().toString()).slice(-2),\n                    tMinutes = (\"00\" + t.getUTCMinutes().toString()).slice(-2),\n                    tSeconds = (\"00\" + t.getUTCSeconds().toString()).slice(-2);\n\n                let tDate = tYear + tMonth + tDay,\n                    tTime = \"T\" + tHours + tMinutes + tSeconds + \"Z\";\n                return tDate + tTime;\n            }\n            if (typeof event.title === \"undefined\")\n                throw new TypeError(\"VEVENT has no TITLE!\");\n            if (typeof event.begin === \"undefined\")\n                throw new TypeError(\"VEVENT has no DTSTART!\");\n            if (typeof event.end === \"undefined\")\n                throw new TypeError(\"VEVENT has no DTEND!\");\n            let eventContent = [];\n            eventContent.push(\n                \"BEGIN:VEVENT\",\n                \"X-MICROSOFT-CDO-BUSYSTATUS:BUSY\",\n                \"X-MICROSOFT-CDO-IMPORTANCE:1\",\n                \"X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\",\n                \"SUMMARY:\" + event.title,\n                \"DTSTART:\" + timeConvert(event.begin),\n                \"DTEND:\" + timeConvert(event.end)\n            );\n            if (typeof event.location !== \"undefined\")\n                eventContent.push(\"LOCATION:\" + event.location);\n            if (typeof event.description !== \"undefined\")\n                eventContent.push(\"DESCRIPTION:\" + event.description);\n            if (typeof event.rrule !== \"undefined\") {\n                if (typeof event.rrule.FREQ === \"undefined\")\n                    throw new TypeError(\"RRULE.FREQ undefined!\");\n                if (\n                    !(\n                        event.rrule.FREQ === \"DAILY\" ||\n                        event.rrule.FREQ === \"WEEKLY\" ||\n                        event.rrule.FREQ === \"MONTHLY\" ||\n                        event.rrule.FREQ === \"YEARLY\"\n                    )\n                )\n                    throw \"RRule.FREQ = \" + event.rrule.FREQ + \" is illegal.\";\n                let rrulestr = \"\";\n                rrulestr += \"FREQ=\" + event.rrule.FREQ + \";\";\n                if (typeof event.rrule.COUNT !== \"undefined\")\n                    rrulestr += \"COUNT=\" + event.rrule.COUNT + \";\";\n                if (typeof event.rrule.INTERVAL !== \"undefined\")\n                    rrulestr += \"INTERVAL=\" + event.rrule.INTERVAL + \";\";\n                if (typeof event.rrule.UNTIL !== \"undefined\")\n                    rrulestr += \"UNTIL=\" + event.rrule.UNTIL + \";\";\n                eventContent.push(\"RRULE:\" + rrulestr);\n            }\n            if (typeof event.alarms !== \"undefined\" && alarmEnabled) {\n                for (let item = 0 ; item<event.alarms.length ; item ++) {\n                    let alarm = event.alarms[item];\n                    \n                    if (typeof alarm.ACTION === \"undefined\")\n                        throw new TypeError(\"Alarm.ACTION undefined!\");\n                    if (typeof alarm.TRIGGER === \"undefined\")\n                        throw new TypeError(\"Alarm.TRIGGER undefined!\");\n\n                    let alarmContent = [],\n                        uuid = this.UUID();\n                    alarmContent.push(\n                        \"BEGIN:VALARM\",\n                        \"UID:\" + uuid,\n                        \"X-WR-ALARMUID:\" + uuid,\n                        \"ACTION:\" + alarm.ACTION,\n                        \"TRIGGER:\" + alarm.TRIGGER\n                    );\n                    switch (alarm.ACTION) {\n                        case \"AUDIO\":\n                            if (typeof alarm.ATTACH !== \"undefined\")\n                                alarmContent.push(\"ATTACH;\" + alarm.ATTACH);\n                            alarmContent.push(\"X-APPLE-DEFAULT-ALARM:TRUE\");\n                            break;\n                        case \"DISPLAY\":\n                            if (typeof alarm.DESCRIPTION === \"undefined\")\n                                throw new TypeError(\n                                    \"Alarm's ACTION is DISPLAY but DESCRIPTION undefined\"\n                                );\n                            alarmContent.push(\"DESCRIPTION:\" + alarm.DESCRIPTION);\n                            break;\n                        case \"EMAIL\":\n                            if (typeof alarm.DESCRIPTION === \"undefined\")\n                                throw new TypeError(\n                                    \"Alarm's ACTION is EMAIL but DESCRIPTION undefined\"\n                                );\n                            if (typeof alarm.SUMMARY === \"undefined\")\n                                throw new TypeError(\n                                    \"Alarm's ACTION is EMAIL but SUMMARY undefined\"\n                                );\n                            alarmContent.push(\n                                \"SUMMARY:\" + alarm.SUMMARY,\n                                \"DESCRIPTION:\" + alarm.DESCRIPTION\n                            );\n                            if (typeof alarm.ATTENDEE !== \"undefined\")\n                                alarmContent.push(\"ATTENDEE:\" + alarm.ATTENDEE);\n                            if (typeof alarm.ATTACH !== \"undefined\")\n                                alarmContent.push(\"ATTACH;\" + alarm.ATTACH);\n                            break;\n                        case \"PROCEDURE\":\n                            if (typeof alarm.ATTACH === \"undefined\")\n                                throw new TypeError(\n                                    \"Alarm's ACTION is PROCEDURE but ATTACH undefined\"\n                                );\n                            alarmContent.push(\"ATTACH;\" + alarm.ATTACH);\n                            if (typeof alarm.DESCRIPTION !== \"undefined\")\n                                alarmContent.push(\"DESCRIPTION:\" + alarm.DESCRIPTION);\n                            break;\n                        default:\n                            throw new TypeError(\"Alarm.ACTION is illegal.\");\n                    }\n                    if (\n                        typeof alarm.REPEAT !== \"undefined\" &&\n                        typeof alarm.DURATION !== \"undefined\"\n                    ) {\n                        alarmContent.push(\n                            \"REPEAT:\" + alarm.REPEAT,\n                            \"DURATION:\" + alarm.DURATION\n                        );\n                    } else if (\n                        typeof alarm.REPEAT === \"undefined\" &&\n                        typeof alarm.DURATION === \"undefined\"\n                    );\n                    else\n                        throw new TypeError(\n                            \"Alarm has only one attribute between REPEAT and DURATION\"\n                        );\n                    alarmContent.push(\"END:VALARM\");\n                    eventContent = eventContent.concat(alarmContent);\n                }\n            }\n            eventContent.push(\"UID:\" + this.UUID(), \"TRANSP:OPAQUE\", \"END:VEVENT\");\n            return eventContent.join(SEPARATOR);\n        },\n        generateICS: function() {\n            let formattedEvents = [];\n            for (let item = 0; item < calendarEvents.length; item++) {\n                try {\n                    let event = calendarEvents[item],\n                        temp = this.formatEvent(event);\n                    if (temp) formattedEvents.push(temp);\n                } catch (error) {\n                    console.log(calendarEvents[item]);\n                    console.log(error);\n                }\n            }\n            return this.buildCalendarBegin() +\n                SEPARATOR +\n                formattedEvents.join(SEPARATOR) +\n                SEPARATOR +\n                this.buildCalendarEnd();\n        },\n        download: function(filename, ext) {\n            let calendar = this.generateICS();\n            if (calendar) {\n                filename = typeof filename !== \"undefined\" ? filename : \"Calendar\";\n                ext = typeof ext !== \"undefined\" ? ext : \".ics\";\n\n                let blob = new Blob([calendar], {\n                    type: \"attachment/csv;charset=utf-8\"\n                });\n                file_saver__WEBPACK_IMPORTED_MODULE_0___default()(blob, filename + ext);\n            }\n            return false;\n        }\n    };\n};\n\n//# sourceURL=webpack:///./src/ics-formatter.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _json_getter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-getter */ \"./src/json-getter.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n\n\n\nif( document.domain === _config__WEBPACK_IMPORTED_MODULE_1__[\"config\"].checkDomain) {\n  Object(_json_getter__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_config__WEBPACK_IMPORTED_MODULE_1__[\"config\"].jsonUrl);\n}\nelse {\n  alert(\"您当前所在网页不是微教务网页，无法获取课表！\");\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/instance.js":
/*!*************************!*\
  !*** ./src/instance.js ***!
  \*************************/
/*! exports provided: icsObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"icsObj\", function() { return icsObj; });\n/* harmony import */ var _ics_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ics-formatter */ \"./src/ics-formatter.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n\n\n\nlet icsObj = new _ics_formatter__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_config__WEBPACK_IMPORTED_MODULE_1__[\"config\"].alarmOn);\n\n//# sourceURL=webpack:///./src/instance.js?");

/***/ }),

/***/ "./src/json-getter.js":
/*!****************************!*\
  !*** ./src/json-getter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getJSON; });\n/* harmony import */ var _json_processor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-processor */ \"./src/json-processor.js\");\n\n\nfunction getJSON(url) {\n    let request = new XMLHttpRequest();\n    request.open(\"get\", url);\n    request.send(null);\n    request.onload = function() {\n        if (request.status == 200) {\n            let json = JSON.parse(request.responseText);\n            if (json.code === \"SUCCESS\") {\n                Object(_json_processor__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(json.body);\n            }\n            else{\n                alert(\"微教务后台获取课表失败！\");\n            }\n        } else if(request.status == 401) {\n            alert(\"您还未登录微教务！\");\n        } else {\n            alert(\"发生错误：\" + request.status + \"，请到Console中查看。\");\n        }\n    };\n}\n\n//# sourceURL=webpack:///./src/json-getter.js?");

/***/ }),

/***/ "./src/json-processor.js":
/*!*******************************!*\
  !*** ./src/json-processor.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return processJSON; });\n/* harmony import */ var _class_adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-adder */ \"./src/class-adder.js\");\n/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instance */ \"./src/instance.js\");\n\n\n\nfunction processJSON(data) {\n    function getDurations(str) {\n        let ret = [];\n        const regex = /周/gi;\n        str = str.replace(regex, \"\");\n        while (str.includes(\",\")) {\n            ret.push(str.substring(0, str.indexOf(\",\")));\n            str = str.substring(str.indexOf(\",\") + 1, str.length);\n        }\n        ret.push(str);\n        return ret;\n    }\n\n    _instance__WEBPACK_IMPORTED_MODULE_1__[\"icsObj\"].empty();\n    for (let iday = 1; iday <= 7; iday++)\n        for (let isection = 1; isection <= 6; isection++)\n            for (let iseq = 0; iseq < data.map[isection][iday].length; iseq++) {\n                let temp = data.map[isection][iday][iseq];\n                if (temp.length !== 0) {\n                    let title = temp.courseName,\n                        location =\n                            temp[\"classroom.roomNickname\"] != null\n                                ? temp[\"classroom.roomNickname\"]\n                                : \"未知\",\n                        durations = getDurations(temp.SKZCZFC);\n                    for (let i = 0; i < durations.length; i++) {\n                        let classEvent = {\n                            title: title,\n                            location: location,\n                            day: iday,\n                            section: isection,\n                            duration: durations[i]\n                        };\n                        Object(_class_adder__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(classEvent);\n                    }\n                }\n            }\n    _instance__WEBPACK_IMPORTED_MODULE_1__[\"icsObj\"].download();\n}\n\n//# sourceURL=webpack:///./src/json-processor.js?");

/***/ })

/******/ });