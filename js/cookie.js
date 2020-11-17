function getCookie(key) {//拿到cookie里存储的信息。
    var cookie = document.cookie.trim().split('; ');
    var cookieObj = {}
    for (var i = 0; i < cookie.length; i++) {
        var arr = cookie[i].split('=');
        cookieObj[arr[0]] = arr[1];
    }
    return cookieObj[key]
}

function setCookie(key, value, time) {//给cookie里存值
    var expires = new Date(new Date().getTime() + time)
    document.cookie = key + '=' + value + '; expires=' + expires.toGMTString();
    console.log(document.cookie)
}
function removeCookie(key) {//cookie的移除也只能通过设置生命时间来作用。
    setCookie(key, '', -1)
}