import router from 'koa-router'
import process from './process'
const route = router()

route.get('/', async ctx => {
    ctx.body = {
        'owner': 'Indexyz',
        'message': 'Meow~',
    }
})

route.use('', process.routes(), process.allowedMethods())

export default route
