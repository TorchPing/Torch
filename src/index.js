import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import json from 'koa-json'
import koa from 'koa'
import route from './router'

class Application {
    static app = null;

    constructor() {
        this.app = new koa()
        this.init()
        this.router()
    }

    init() {
        this.app.use(bodyParser({
            enableTypes:['json', 'form', 'text'],
        }))
        this.app.use(json())
        this.app.use(logger())
    }

    router() {
        this.app.use(route.routes(), route.allowedMethods())
    }

}

export default (new Application()).app
