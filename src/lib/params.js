export function isChinese(s) { // 判断是否为中文字符
    var ret = true;
    for (var i = 0; i < s.length; i++)
        ret = ret && (s.charCodeAt(i) >= 10000);
    return ret;
}

export function timestampToTime(timestamp) { //时间戳转为时间 MM-DD hh:mm
    let date = new Date(timestamp);
    let Y = date.getFullYear() + "-";
    let M = (date.getMonth() < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1) + "-";
    let D = date.getDate() < 10 ?
        "0" + date.getDate() + " " :
        date.getDate() + " ";
    let h = date.getHours() < 10 ?
        "0" + date.getHours() + ":" :
        date.getHours() + ":";
    let m = date.getMinutes() < 10 ?
        "0" + date.getMinutes() :
        date.getMinutes();
    let s = date.getSeconds() < 10 ?
        "0" + date.getSeconds() :
        date.getSeconds();
    let time = M + D + ' ' + h + m;
    return time;
}