import Router from 'koa-router'
import { Context } from 'koa'
import createJwt from './middlewares/koa-create-jwt'
import Joi from 'joi'
import { validateSchema } from './utils/validateSchema'
import { getDb } from './service/database'

const router = new Router()

router.get('/public/test-jwt', async (ctx: Context) => {
  const token = createJwt({ id: '123456' })
  ctx.success(token)
})

router.post('/public/login', async (ctx: Context) => {
  const { username, password } = ctx.request.body

  const schema = Joi.object().keys({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(6).required()
  })

  const errors = validateSchema(schema, { username, password })

  if (errors) {
    ctx.fail('INVALID_SCHEMA', errors)
    return
  }

  try {
    const token = createJwt({ userId: '123456', username })
    ctx.success({ token })
  } catch (err) {
    if (err.statusCode < 500) {
      ctx.fail(err.errorCode, err.message, err.statusCode)
      return
    }
    ctx.error('INTERNAL_ERROR', 'Could not get collection notifications reports')
  }
})

router.post('/internal/test', async (ctx: Context) => {
  ctx.success(ctx.jwt)
})

export default router
