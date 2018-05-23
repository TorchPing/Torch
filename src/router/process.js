import router from 'koa-router'
import joi from 'joi'
const route = router()

route.get('/:host/:port', async ctx => {
    const schema = {
        host: joi.string().hostname().required(),
        port: joi.number().min(1).max(65535).required(),
    }

    try {
        joi.validate(ctx.params, schema)
    } catch (err) {
        ctx.status = 422
        ctx.body = { err }
        return
    }

    ctx.body = {
        status: await ctx.service.ping.ping(ctx.params.host, ctx.params.port),
    }
})

export default route
