import { Middleware, Context } from 'koa'

export const routeNotFound = (): Middleware => async (ctx: any) => {
  ctx.fail('ROUTE_NOT_FOUND', `Route ${ctx.request.url} not found`, 404)
}
