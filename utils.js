const tcpPing = require('tcp-ping')

module.exports = async (host, port) => {
    const res = await new Promise((reslove, reject) => {
        tcpPing.ping({
            address: host,
            port,
            attempts: 3,
            timeout: 1000,
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            reslove(data)
        })
    })

    return res
}