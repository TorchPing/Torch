import router from 'koa-router'
import joi from 'joi'
import config from 'config'
import dns from 'dns'
import util from 'util'

const lookup = util.promisify(dns.lookup)
const route = router()

route.get('/:host/:port', async ctx => {
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

    const data = await ctx.service.ping(ctx.params.host, ctx.params.port)
    const status = (data.min !== undefined)

    if (config.get('enableDataAnalytics')) {
        lookup(ctx.params.host)
            .then(host => ctx.service.addDocs(Object.assign(host, {
                status,
                lag: isNaN(data.min) ? -1: data.min,
                ...ctx.params,
                tags: config.get('tags'),
            })))
            .catch(err => console.log(err))
    }

    ctx.body = {
        status,
        time: data.min,
    }
})

export default route
