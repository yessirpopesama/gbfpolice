const path = require('path');
let config = {} 

config.Base = {
    redis: "redis://127.0.0.1/1",
    req_url: "https://info.gbfteamraid.fun/web/userrank",
    file_path: path.join(__dirname, '../miscs'),
    raid_id: "teamraid055"  // Raid编号id
}

module.exports = config