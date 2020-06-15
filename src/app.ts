import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import { routeNotFound } from './middlewares/routeNotFound'
import jsend from './middlewares/jsend/jsend'
import { router } from './router'

const app = new Koa()

// This middleware adds methods to koa ctx object to support `ctx.success`, `ctx.fail` and `ctx.error`. They are used to provide a standard response format
app.use(jsend())

// This middleware is used to parse application/json in the HTTP rquest
app.use(BodyParser())

// This middleware is used to enable cors
app.use(cors())

// This middleware register router handlers based on our configuration of routes
app.use(router.routes())

// This middleware handle route not found cases
app.use(routeNotFound())

app.listen(3000, 'localhost')
console.log('Server runnig on http://localhost:3000')
