//  判断浏览器版本
var appName = navigator.appName, appVersion = navigator.appVersion .split(";")[1].replace(/[ ]/g,"");
if(appName == "Microsoft Internet Explorer" && (appVersion=="MSIE6.0"||appVersion=="MSIE7.0"||appVersion=="MSIE8.0"||appVersion=="MSIE9.0"||appVersion=="MSIE10.0")){
        alert("Your browser version is too low, please use IE11 and above or Chrome, Firefox and other browsers!");
    }