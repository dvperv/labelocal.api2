const Client = require('ssh2').Client;
const config = require('./config');
const conn = new Client();
const fs = require('fs')
const readline = require('readline');

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
    return data; //TODO Parse
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
                        resolve(getLocal(localFile));//TODO return png + meta instead
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
