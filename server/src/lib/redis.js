const conf = require('../config/config');
const redis = require('promise-redis')();
const client = redis.createClient(conf.Base.redis);
client.connection_string = conf.redis;
client.on('error', (err) => {
    console.log("redis connection error", err);
});
module.exports = client;