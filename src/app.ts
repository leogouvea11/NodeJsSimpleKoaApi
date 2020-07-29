import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import { routeNotFound } from './middlewares/routeNotFound'
import jsend from './middlewares/jsend/jsend'
import routes from './routes'
import jwt from 'koa-jwt'
import { jwtDecode } from './middlewares/koa-decode-jwt'

require('dotenv').config()

const app = new Koa()

// This middleware adds methods to koa ctx object to support `ctx.success`, `ctx.fail` and `ctx.error`. They are used to provide a standard response format
app.use(jsend())

// This middleware is used to parse application/json in the HTTP rquest
app.use(BodyParser())

// This middleware is used to enable cors
app.use(cors())

// unless the URL starts with '/public'
app.use(jwt({ secret: process.env.JWT_SECRET as string }).unless({ path: [/^\/public/] }))

// parse jwt payload and add to ctx.jwt
app.use(jwtDecode())

// This middleware register router handlers based on our configuration of routes
app.use(routes.routes())

// This middleware handle route not found cases
app.use(routeNotFound())

app.listen(parseInt(process.env.API_PORT as string), process.env.API_HOST as string)
console.log(`Server runnig on http://${process.env.API_HOST}:${process.env.API_PORT}`)
