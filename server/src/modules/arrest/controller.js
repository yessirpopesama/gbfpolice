const userInfo = require('./services/userinfo')
const file = require('../../lib/file')
const config = require('../../config/config')
const rank = require('./services/dayrank')
const utils = require('../../lib/utils')
const execSync = require('child_process').execSync;
const redis = require('../../lib/redis');

async function arrest(ctx) {
    let redis_str = "team";
    try {
        // 从redis中寻找是否存在记录
        let data = await redis.get(redis_str);
        if (data) {
            console.log("read from redis", data)
            return ctx.body = utils.successResp(JSON.parse(data));
        }
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
            console.log(`number: ${user_id} `, JSON.stringify(user_resp));
            if (user_resp && user_resp['result'].length > 0 && user_resp.err === '0') {
                user_info.level = user_resp['result'][0].level;
                user_info.name = user_resp['result'][0].name;
                user_info.userid = user_resp['result'][0].userid;
                user_info.contributes = await rank(user_id, sessionId);
            } 
            result.push(user_info);
            utils.sleep(500);  // 延迟500ms 防止接口访问不到
        }
        await redis.setex(str, 60*5, JSON.stringify(result));
        return ctx.body = utils.successResp(result);
    } catch (ex) {
        console.log("ex", ex);
        ctx.throw(500, ex)
    }
}

module.exports = { arrest }