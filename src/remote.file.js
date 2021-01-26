const Client = require('ssh2').Client;
const config = require('./config')
const conn = new Client();

module.exports = {
    get() {
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
    }
}
