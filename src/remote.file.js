const Client = require('ssh2').Client;
const config = require('./config');
const conn = new Client();
const fs = require('fs')

const localFile = 'temp.pnt';

function getLocal(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            console.log(data)
            resolve(parse(data))
        })
    })
}

function parse(data){
    if (!(data instanceof Buffer)) {
        throw new Error('not an instance of Buffer');
    }
    console.log('Parsing data...')

    let res = {}

    let pEnd = 0
    for (let i = 0, pStart = 0; pEnd < data.length && i < 24 ; pEnd++) {
        if (data[pEnd] == "\n".charCodeAt(0)) {
            //line ended
            if (i == 6 || i == 23) {
                const val = +data.slice(pStart, pEnd).toString('utf8').split(/\s+/)[1];
                if (i == 6) res.nbands = val;
                else res.npoints = val;
            }
            i++;
            pStart = pEnd + 1;//pEnd will be incremented by cycle
        }
    }

    res.trans = data.slice(pEnd, data.length);

    return res;
}

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
                        resolve(getLocal(localFile));
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
