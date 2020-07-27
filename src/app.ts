import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import { routeNotFound } from './middlewares/routeNotFound'
import jsend from './middlewares/jsend/jsend'
import routes from './routes'
import jwt from 'koa-jwt'

const app = new Koa()

// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/public'
app.use(jwt({ secret: 'grilo' }).unless({ path: [/^\/public/] }))

// This middleware adds methods to koa ctx object to support `ctx.success`, `ctx.fail` and `ctx.error`. They are used to provide a standard response format
app.use(jsend())

// This middleware is used to parse application/json in the HTTP rquest
app.use(BodyParser())

// This middleware is used to enable cors
app.use(cors())

// This middleware register router handlers based on our configuration of routes
app.use(routes.routes())

// This middleware handle route not found cases
app.use(routeNotFound())

app.listen(3000, 'localhost')
console.log('Server runnig on http://localhost:3000')
