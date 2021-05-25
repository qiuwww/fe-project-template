// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
    const input = document.createElement("input");
    return "placeholder" in input;
}


// 判断是否是IE浏览器，包括Edge浏览器
function IEVersion() {
    // 取得浏览器的userAgent字符串
    const {userAgent} = navigator;
    // 判断是否IE浏览器
    const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    if (isIE) {
        const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        const fIEVersion = parseFloat(RegExp.$1);
        if (fIEVersion < 11 || !isSupportPlaceholder()) {
            return true;
        }
    } else {
        return false;
    }
}

export default IEVersion;
