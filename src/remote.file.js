const Client = require('ssh2').Client;
const config = require('./config');
const fs = require('fs');

const bc = require('./utils/buffer.cast')
const tp = require('./utils/to.pic')

const localFile = 'temp.pnt';

function getLocal(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            resolve(parse(data))
        })
    })
}

function parse(data){
    if (!(data instanceof Buffer)) {
        throw new Error('not an instance of a Buffer');
    }

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
            pStart = pEnd + 1;//pEnd will be incremented by the cycle
        }
    }

    // res.trans = bc.bufferToFloatArray(data.slice(pEnd, data.length))
    res.grayscale255 = tp.GrayScaleData(bc.bufferToFloatArray(data.slice(pEnd, data.length)))

    return res;
}

function dirCompactor(list){
    let cList =[]
    if (list)
        list.forEach( el => {
            if(
                el.longname[0] == 'd'
                ||
                el.filename.length > 4 && el.filename.slice(el.filename.length - 4, el.filename.length) == '.pnt'
            )
                    cList.push({ name: el.filename, isDir: (el.longname[0] == 'd')})
        });
    return cList.sort((a, b) => (a.name < b.name ? -1: (a.name > b.name ? 1 : 0)));
}

module.exports = {
    getDir(path) {
        return new Promise((resolve, reject) => {
            const conn = new Client();
            conn.on('ready', function () {
                conn.sftp(function (err, sftp) {
                    if (err) resolve({
                        error: err,
                        list: null
                    })
                    sftp.readdir(path, function (err, list) {
                        if (err) resolve({
                            error: err,
                            list: null
                        })
                        conn.end();
                        let cList = dirCompactor(list);
                        resolve({
                            error: null,
                            list: cList
                        });
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
            const conn = new Client();
            conn.on('ready', function () {
                conn.sftp(function (err, sftp) {
                    if (err) resolve({
                        error: err,
                        info: null
                    })
                    sftp.fastGet(remoteFile, localFile, function (err) {
                        if (err) resolve({
                            error: err,
                            info: null
                        })
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
