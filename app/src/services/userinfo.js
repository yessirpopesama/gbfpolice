const config = require('../config/config')
const utils = require('../lib/utils')
const request = require('superagent')

module.exports = async function(userid) {
	let data = {
        "method": "getUserrank",
        "params": '{"userid": "' + userid + '","username":""}'
    }
    return new Promise((resolve, reject) => {
        request.post(config.Base.req_url)
            .set(utils.getRequestHeaders())
            .send(data)
            .timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .then(res => {
                resolve(JSON.parse(res.text))
            })
            .catch(err => {
                console.log("request got error", err)
                reject(err)
            })
    });
}