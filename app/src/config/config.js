const path = require('path');
let config = {} 

config.Base = {
    req_url: "http://info.gbfteamraid.fun/web/userrank",
    session_id: "733EEEB69DCCCDBB960038A8FC57C330",  // 可自己修改
    file_path: path.join(__dirname, '../miscs'),
    raid_id: "teamraid045"  // Raid编号id
}

module.exports = config