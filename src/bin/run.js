import app from '../index'
import http from 'http'
import chalk from 'chalk'

const port = process.env.PORT || 3000

const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

const server = http.createServer(app.callback())

server.listen(port)

server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`[${chalk.red('Error')}] ${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`[${chalk.red('Error')}] ${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
})

server.on('listening', () => {
    console.log(`[${chalk.green('Server')}] Listening on ${server.address().port}`)
})
