import Redis from 'ioredis'
import config from 'config'

let redis = new Redis(config.get('redis'))

async function init() {
    if (!config.get('enableDataAnalytics')) {
        return
    }
    if (redis === null) {
        redis = new Redis(config.get('redis'))
    }
}

async function addDocs(docs) {
    return redis.publish(config.get('channel'), JSON.stringify(docs))
}

init()

export default {
    addDocs,
}
