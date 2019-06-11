const config = require('../config/config');

function getRequestHeaders () {
    return {
        "Host": "info.gbfteamraid.fun",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Accept": "*/*",
        "Origin": "http://info.gbfteamraid.fun",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7",
        "Cookie": "JSESSIONID=" + config.Base.session_id,
    }
}

module.exports = {
    getRequestHeaders
}