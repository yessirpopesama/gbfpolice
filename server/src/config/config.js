const path = require('path');
let config = {} 

config.Base = {
    req_url: "http://info.gbfteamraid.fun/web/userrank",
    file_path: path.join(__dirname, '../miscs'),
    raid_id: "teamraid045"  // Raid编号id
}

module.exports = config