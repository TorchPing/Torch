/**
 * Add CORS Header for every response
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
 *
 * @param {koa.Context} ctx
 * @param {() => Promise<any>} next
 */
async function cors(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELET')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-User-Token, X-Requested-With, Content-Type, Accept')

    return await next()
}

export default {
    cors,
}
