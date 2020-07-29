import Router from 'koa-router'
import createJwt from './middlewares/koa-create-jwt'

const router = new Router()

router.get('/public/ping', async (ctx: any) => {
  const token = createJwt({ id: '123456' })
  ctx.success(token)
})

router.post('/test', async (ctx: any) => {
  ctx.success(ctx.jwt)
})

export default router
