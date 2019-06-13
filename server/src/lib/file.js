const fs = require('fs');
const execSync = require('child_process').execSync;
const readline = require('readline');

module.exports = async function(path) {
    return new Promise((resolve, reject) => {
        let r = execSync(`cat ${path} | wc -l`);
        let lines = parseInt(r.toString());
        let doneLine = 0;
        let instream = fs.createReadStream(path);
        let rl = readline.createInterface(instream);
        let user_lists = [];

        rl.on('line', (data) => {
            if (data) user_lists.push(data);
            doneLine++;
            if (doneLine === lines) {
                return resolve(user_lists);
            }
        }).on('close', () => {
            console.log("finished");
        }).on('error', (error) => {
            return reject(error);
        });

        instream.on('error', (error) => {
            return reject(error);
        });
    });
}