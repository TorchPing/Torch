import r from 'rethinkdb'
import config from 'config'

async function getDatabase() {
    return await r.connect(config.get('rethinkdb'))
}

async function init() {
    if (!config.get('enableDataAnalytics')) {
        return
    }
    const conn = await getDatabase()

    const dbList = await r.dbList().run(conn)

    if (dbList.indexOf('torch') === -1) {
        await r.dbCreate('torch').run(conn)
    }

    const tableList = await r.db('torch').tableList().run(conn)

    if (tableList.indexOf('result') === -1) {
        await r.db('torch').tableCreate('result').run(conn)
    }
}

async function addDocs(docs) {
    return r.db('torch').table('result')
        .insert(docs).run(await getDatabase())
}

init()

export default {
    getDatabase,
    addDocs,
}
