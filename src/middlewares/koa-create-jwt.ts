import jwt from 'jsonwebtoken'

require('dotenv').config()

type Payload = object

const createJWT = (payload: Payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET as string)
}

export default createJWT
