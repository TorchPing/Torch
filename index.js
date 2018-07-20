const handler = require('./app').callback()

exports.torch = (req, res) => {
    handler(req, res)
}
