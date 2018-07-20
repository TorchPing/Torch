const koa = require('koa')
const utils = require('./utils')
const Router = require('koa-router')
const joi = require('joi')

const router = new Router()
const app = new koa()

// cors
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-User-Token, X-Requested-With, Content-Type, Accept')

    return await next()
})

router.get('/', async ctx => {
    ctx.body = {
        'owner': 'Indexyz',
        'message': 'Meow~',
        'version': 'Google-Cloud'
    }
})

router.get('/:host/:port', async ctx => {
    const schema = {
        host: joi.string().hostname().required(),
        port: joi.number().min(1).max(65535).required(),
    }

    try {
        await joi.validate(ctx.params, schema)
    } catch (err) {
        ctx.status = 422
        ctx.body = { err }
        return
    }
    
    const data = await utils(ctx.params.host, ctx.params.port)
    const status = (data.min !== undefined)

    ctx.body = {
        status,
        time: data.avg,
    }
})

app.use(router.routes())
    .use(router.allowedMethods())

module.exports = app