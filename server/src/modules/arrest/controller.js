const utils = require('../../lib/utils')
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
        return ctx.body = utils.successResp({});
    } catch (ex) {
        console.log("ex", ex);
        ctx.throw(500, ex)
    }
}

module.exports = { arrest }