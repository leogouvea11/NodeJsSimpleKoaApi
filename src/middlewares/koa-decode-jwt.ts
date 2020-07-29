import { decode } from 'jsonwebtoken'
import { Context } from 'koa'

declare module 'koa' {
  interface Context {
    jwt: DecodedJwt
  }
}

export interface DecodedJwt {
  iat: number,
  userId: string
}
const removeCustomPrefix = (obj: { [key: string]: any }) => {
  if (obj) {
    return Object.keys(obj).reduce((acc: { [key: string]: any }, key: string) => {
      if (key.includes('custom:')) {
        const newKey = key.replace('custom:', '')
        acc[newKey] = obj[key]
      } else {
        acc[key] = obj[key]
      }
      return acc
    }, {})
  } else {
    return obj
  }
}

export const jwtDecode = (): any => async (ctx: Context, next: () => Promise<void>) => {
  const { authorization: rawToken } = ctx.headers

  if (!rawToken) {
    await next()
    return
  }

  try {
    const token = rawToken.split(' ')[1]
    const decodedToken = decode(token)
    if (typeof decodedToken !== 'object') {
      throw new Error('Invalid token format')
    }
    ctx.jwt = removeCustomPrefix(decodedToken as { [key: string]: any }) as DecodedJwt
  } catch (err) {
    console.log(err)
  }

  await next()
}

export const decodeRawJwt = (token: string): DecodedJwt => {
  const decodedToken = decode(token)
  if (typeof decodedToken !== 'object') {
    throw new Error('Invalid token format')
  }
  return removeCustomPrefix(decodedToken as { [key: string]: any }) as DecodedJwt
}
