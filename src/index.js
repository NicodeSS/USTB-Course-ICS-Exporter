import { getInfo, getJson } from "./json-getter";
import { config } from "./instance";

async function GetICS() {
  try {
    if (document.domain === config.checkDomain) {
      let manualSet = window.prompt("欢迎使用北京科技大学课表日历导出脚本，您想手动设置开学日期等参数么？\ny：手动设置，其他：自动设置", "n");
      if (manualSet === "y" || manualSet === "Y") {
        config.semester = window.prompt("请选择当前学期为本年度哪个学期\n1：秋季学期，2：春季学期，3：小学期，其他：自动获取")
        if (config.semester < 1 || config.semester > 3)
          config.semester = null;
        config.initialDay = window.prompt("请输入当前学期第一天的日期\n格式：yyyy-MM-dd", "2020-09-14");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(config.initialDay))
          config.initialDay = null;
      }

      if (!config.semester || !config.initialDay || (config.semester === 1 && !config.nationalDayWeek))
        await getInfo();

      console.log("setting");
      // Ignore special vacation of 2020's National Day  
      if (config.initialDay.substr(0, 4) === "2020")
        config.nationalDayWeek = 500;

      await getJson();
    } else {
      alert("您当前所在网页不是微教务网页，无法获取课表！");
    }
  } catch (error) {
    ;//do nothing, just terminate function and prevent duplicated error tips.
  }
}
GetICS()