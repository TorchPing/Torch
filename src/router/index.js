import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.body = {
        'owner': 'Indexyz',
        'message': 'Meow~',
    }
})

export default route
