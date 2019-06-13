const userInfo = require('./services/userinfo')
const file = require('./lib/file');
const config = require('./config/config');
const rank = require('./services/dayrank')
const session = require('./services/session');

async function worker() {
    // 测试是否获取到header中的jsessionid， 只能手动录入目前
    let sessionId = "FDF36F8871C31417BF97FC14778D594A"
    // 从本地文件中获取用户User_id
    let users = await file(config.Base.file_path + '/members.txt');
    console.log("users: ", users);
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
        console.log("each user info: ", user_info)
    }
}

worker()

