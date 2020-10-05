# 北科大课程表 iCalendar 转换脚本

## 本项目用于将[北京科技大学教务微服务](http://jwstu.ustb.edu.cn/)中提供的[网页版课表](http://jwstu.ustb.edu.cn/stu_daily/#/courseSchedule)导出为 iCalendar 文件，便于使用各种日历软件管理课程。

## 调用方法

**方法 1**

添加收藏夹书签

- 名称：微教务课表导出脚本
- 网址：`javascript:void(function(u,s){s=document.body.appendChild(document.createElement('script'));s.src=u;s.charset='UTF-8'}('https://nicodess.github.io/USTB-Course-ICS-Exporter/dist/course-exporter.js'))`

**方法 2**

直接在浏览器地址栏输入代码，请记得在地址栏粘贴后在首部重新添加 `javascript:`。

`javascript:void(function(u,s){s=document.body.appendChild(document.createElement('script'));s.src=u;s.charset='UTF-8'}('https://nicodess.github.io/USTB-Course-ICS-Exporter/dist/course-exporter.js'))`

## 使用方法

1. 打开[北京科技大学教务微服务](http://jwstu.ustb.edu.cn/)页面，微信扫码认证登陆。
2. 在登陆后的页面，点击“调用方法”部分添加的书签或者在地址栏运行代码。
3. 浏览器应该自动下载了生成出的 ICS 文件
4. 将 ICS 文件导入到你的日历账户（Exchange，Google 日历，iCloud 日历等）

## 更新

### v4.0
- 功能：运行脚本时可选择自动获取或是自定义学期以及学期第一天日期。
- 功能：现在脚本对于2020-2021-1学期会自动忽略对国庆节假期的判断（这意味着你需要手动删除国庆期间的课程内容——毕竟今年是特殊的）
- （注意）重构：**放弃IE支持**，引入axios库，以及ES6的async/await特性。
- 改进：代码逻辑优化。
- 改进：修复了一些小问题。

### v3.0

- 功能：针对每年的秋季学期，尝试自动修正国庆节假期。此功能仍在测试，确认无问题后会发布 Release 。（目前基准是使用 10 月 3 日的所在周作为国庆周，如果你有更好的想法请 issue ）

### v2.2

- 功能：自动根据学期选择学期第一天日期。

### v2.1

- 优化了参数传递逻辑
- 将地点楼名扩展为全称
- 将下载文件名改为动态

## 引用

本项目使用了 [FileSaver.js](https://github.com/eligrey/FileSaver.js) , [axios](https://github.com/axios/axios) , [webpack](https://github.com/webpack/webpack)


