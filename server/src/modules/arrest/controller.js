const userInfo = require('./services/userinfo')
const file = require('../../lib/file')
const config = require('../../config/config')
const rank = require('./services/dayrank')
const utils = require('../../lib/utils')
const execSync = require('child_process').execSync;

async function arrest(ctx) {
    try {
        // 测试是否获取到header中的jsessionid， 只能手动录入目前
        // let sessionId = "FDF36F8871C31417BF97FC14778D594A"
        // 自动生成sessionId
        let sessionId = execSync(`python ${__dirname}/session.py`, { encoding: "binary" }).toString();
        if (sessionId.length > 32) {
            sessionId = sessionId.substring(0, 32);
        }
        console.log(`sessionId: ${sessionId}`, typeof(sessionId), sessionId.length);
        // 从本地文件中获取用户User_id
        let users = await file(config.Base.file_path + '/members.txt');
        let result = [];
        for (let i = 0; i < users.length; i++) {
            let user_id = users[i];
            let user_resp = await userInfo(user_id, sessionId);
            let user_info = {};  // 记录用户信息
            if (user_resp && user_resp.err === '0') {
                user_info.level = user_resp['result'][0].level;
                user_info.name = user_resp['result'][0].name;
                user_info.userid = user_resp['result'][0].userid;
            }
            let contributes = await rank(user_id, sessionId);
            user_info.contributes = contributes;
            result.push(user_info);
        }
        return ctx.body = utils.successResp(result);
    } catch (ex) {
        console.log("ex", ex);
        ctx.throw(500, ex)
    }
}

module.exports = { arrest }