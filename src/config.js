export class configuration {
  constructor() {
    this.checkDomain = "jwstu.ustb.edu.cn";
    this.jsonUrl =
      "http://jwstu.ustb.edu.cn/smvc/StuQueryInfoService/viewStuCourseSchedule.json";
    this.infoUrl =
      "http://jwstu.ustb.edu.cn/smvc/CommonService/obtainCommonInfo.json";
    this.initialDay = null;
    this.semester = null;
    this.nationalDayWeek = null;
    this.alarmOn = true;
    this.classTable = [
      [0, 0, 0, 0],
      [8, 0, 9, 35],
      [9, 55, 11, 30],
      [13, 30, 15, 5],
      [15, 20, 16, 55],
      [17, 10, 18, 45],
      [19, 30, 21, 5],
    ];
    this.locationFullName = [
      ["信", "机电楼"],
      ["逸", "逸夫楼"],
      ["教", "教学楼"],
      ["理", "理化楼"],
      ["网", "网络楼"],
      ["高", "高工楼"],
      ["实", "实验楼"],
      ["图", "图书馆"],
      ["科", "科技楼"],
    ];
  }
}
