import tcpPing from 'tcp-ping'

/**
 * Ping host status
 *
 * @param {string} host
 * @param {number} port
 * @returns {boolean} Is host down
 */
async function ping(host, port) {
    return await new Promise((reslove, reject) => {
        tcpPing.ping({
            address: host,
            port,
            attempts: 3,
            timeout: 1000,
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            reslove(data.address.min !== undefined)
        })
    })
}

export default {
    ping,
}
