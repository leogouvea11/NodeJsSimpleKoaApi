import { Context } from 'koa'
import Router from 'koa-router'

const router = new Router()

router.get('/ping', async (ctx: Context) => {
  ctx.success('-- PING --')
})

export { router }
