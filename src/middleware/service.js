import s from '../service'

/**
 * Add services to context
 *
 * @param {koa.Context} ctx
 * @param {() => Promise<any>} next
 */
async function service(ctx, next) {
    ctx.service = s
    return await next()
}

export default {
    service,
}
