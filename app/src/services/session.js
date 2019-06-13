

const utils = require('../lib/utils')
/****
 *  该部分未完成, 无法获取到jsessionId, 考虑使用python实现
 *  坑了
 */

const request = require('superagent')
require('superagent-cache')(request, {storage: 'session', defaultExpiration: 60})

module.exports = async function() {
    let url = "http://info.gbfteamraid.fun/login";
    return new Promise((resolve, reject) => {
        request.get(url)
            .withCredentials()
            .timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            // .use(finalNoCache)
            .then(res => {
                // 动态获取cookie
                var gbfCookie = res;
                console.log(gbfCookie, 'aaaa')
                if (typeof (gbfCookie) !== "string") gbfCookie = gbfCookie + "";
                gbfCookie = gbfCookie.split("=").length > 1 ? gbfCookie.split("=")[1] : "";
                console.log(gbfCookie, 'bbbb')
                resolve(gbfCookie)
            })
            .catch(err => {
                console.log("request got error", err)
                reject(err)
            })
    });
}