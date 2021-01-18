const config = require('../config/config')
const utils = require('../lib/utils')
const request = require('superagent')

module.exports = async function(userid, sessionId) {
	let data = {
        "method": "getUserrank",
        "params": '{"userid": "' + userid + '","username":""}'
    };
    sessionId = "FF742CAFA731CA309F417147DA2E1FB2";
    return new Promise((resolve, reject) => {
        request.post(config.Base.req_url)
            .set(utils.getRequestHeaders(sessionId))
            .send(data)
            .timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
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