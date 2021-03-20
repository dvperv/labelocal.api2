module.exports = {
    host: process.env.RHST,
    port: process.env.RPRT,
    username: process.env.RLGN,
    password: process.env.RPWD,
    mongo: process.env.MNGC,
    authprovider: {
        domain: process.env.AP_DMN,
        secret: process.env.AP_SEC
    }
}
