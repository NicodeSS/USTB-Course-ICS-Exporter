import processJSON from "./json-processor";

export default function getJSON(url) {
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function() {
        if (request.status == 200) {
            let json = JSON.parse(request.responseText);
            if (json.code === "SUCCESS") {
                processJSON(json.body);
            }
            else{
                alert("微教务后台获取课表失败！");
            }
        } else if(request.status == 401) {
            alert("您还未登录微教务！");
        } else {
            alert("发生错误：" + request.status + "，请到Console中查看。");
        }
    };
}