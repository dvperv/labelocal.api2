const Client = require('ssh2').Client;
const config = require('./config');
const conn = new Client();

const localFile = 'temp.pnt';

module.exports = {
    getDir() {
        return new Promise((resolve, reject) => {
            conn.on('ready', function () {
                console.log('Client :: ready');
                conn.sftp(function (err, sftp) {
                    if (err) throw err;
                    sftp.readdir('/home', function (err, list) {
                        if (err) throw err;
                        console.dir(list);
                        conn.end();
                        resolve(list);
                    });
                });
            }).connect({
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password
            });
        })
    },
    getFile(remoteFile) {
        return new Promise((resolve, reject) => {
            conn.on('ready', function () {
                console.log('Client :: ready');
                conn.sftp(function (err, sftp) {
                    if (err) throw err;
                    sftp.fastGet(remoteFile, localFile, function (err) {
                        if (err) throw err;
                        console.log(`${remoteFile} has successfully download to ${localFile}!`);
                        conn.end();
                        resolve(localFile);//TODO return png + meta instead
                    })
                });
            }).connect({
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password
            });
        })
    }
}
