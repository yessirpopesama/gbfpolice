const config = require('../config/config')
const utils = require('../lib/utils')
const _ = require('lodash');
const request = require('superagent');

async function getRankStatus(userid, sessionId) {
    let data = {
        "method": "getUserDayPoint",
        "params": '{"teamraidid":"' + config.Base.raid_id + '","userid": "' + userid + '"}'
    }
    sessionId = "FF742CAFA731CA309F417147DA2E1FB2";
    return new Promise((resolve, reject) => {
        request.post(config.Base.req_url)
            .set(utils.getRequestHeaders(sessionId))
            .send(data)
            .timeout({
                response: 10000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .then(res => {
                resolve(JSON.parse(res.text))
            })
            .catch(err => {
                reject(err)
            })
    });
}

module.exports =  async function (userid, sessionId) {
    let userRank = await getRankStatus(userid, sessionId);
    let contributes = [];
    if (userRank && userRank.err === "0") {
        let { result } = userRank;
        // 处理最后一条数据
        if (result && result.length > 0) {
            let tmp = {}
            tmp.date = result[result.length - 1].updatedate
            tmp.day = Number.parseInt(result[result.length - 1].maxp)
            tmp.total = Number.parseInt(result[result.length - 1].maxp)
            contributes.push(tmp)
            // 处理其余数据
            for (i = result.length - 2; i >= 0; i--) {
                let tmp = {};
                tmp.date = result[i].updatedate;
                tmp.day =  Number.parseInt(result[i].maxp) - Number.parseInt(result[i+1].maxp)
                tmp.total =  Number.parseInt(result[i].maxp)
                contributes.push(tmp)
            }
        }
    }
    return contributes
}