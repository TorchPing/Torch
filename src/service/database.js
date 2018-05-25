import r from 'rethinkdb'
import config from 'config'

let db = null

async function getDatabase() {
    if (db === null) {
        db = await r.connect(config.get('rethinkdb'))
    }
    return db
}

async function init() {
    const dbList = await r.dbList().run(getDatabase())

    if (dbList.indexOf('torch') === -1) {
        await r.dbCreate('torch').run(getDatabase())
    }

    const tableList = await r.db('torch').tableList().run(getDatabase())

    if (tableList.indexOf('result') === -1) {
        await r.db('torch').tableCreate('result').run(getDatabase())
    }
}

async function addDocs(docs) {
    return r.db('torch').table('result')
        .insert(docs).run(getDatabase())
}

init()

export default {
    getDatabase,
    addDocs,
}
