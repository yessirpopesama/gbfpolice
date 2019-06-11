const config = require('../config/config');
const utils = require('../lib/utils');
const _ = require('lodash');
const request = require('superagent');

async function getRankStatus(userid) {
    let data = {
        "method": "getUserDayPoint",
        "params": '{"teamraidid":"teamraid045","userid": "' + userid + '"}'
    }
    console.log("data: ", JSON.stringify(data))
    return new Promise((resolve, reject) => {
        request.post(config.Base.req_url)
            .set(utils.getRequestHeaders())
            .send(data)
            .timeout({
                response: 10000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .then(res => {
                resolve(JSON.parse(res.text))
            })
            .catch(err => {
                //console.log("error", err);
                reject(err)
            })
    });
}

module.exports =  async function (userid) {
    let userRank = await getRankStatus(userid);
    let contributes = [];
    if (userRank && userRank.err === "0") {
        let { result } = userRank;
        result.forEach(each => {
            let tmp = {};
            tmp.date = each.updatedate;
            tmp.day =  Number.parseInt(each.maxp) - Number.parseInt(each.minp)
            tmp.total =  Number.parseInt(each.maxp)
            contributes.push(tmp)
        });
    }
    return contributes
}