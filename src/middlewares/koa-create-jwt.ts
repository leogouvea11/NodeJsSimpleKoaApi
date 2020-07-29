import jwt from 'jsonwebtoken'

type Payload = object

const createJWT = (payload: Payload) => {
  return jwt.sign({ ...payload }, 'grilo')
}

export default createJWT
