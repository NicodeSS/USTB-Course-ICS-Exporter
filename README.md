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

### v2.0
使用Webpack重构了本脚本。

## 引用

本项目使用了[FileSaver.js](https://github.com/eligrey/FileSaver.js)
