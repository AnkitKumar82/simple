import jwtwebtoken from 'jsonwebtoken'
import { JWT_CONFIG } from '../config/index.mjs'
import { Errors } from '../constants/index.mjs'

const {
  SECRET_KEY
} = JWT_CONFIG

const Jwt = {
  jwtGenerate,
  jwtValidate
}

function jwtGenerate (data, secretKey = '') {
  secretKey = secretKey || SECRET_KEY
  const token = jwtwebtoken.sign(data, secretKey)
  return token
}

function jwtValidate (token, secretKey = '') {
  try {
    secretKey = secretKey || SECRET_KEY
    const verified = jwtwebtoken.verify(token, secretKey)
    return verified
  } catch (error) {
    throw Errors.TOKEN_NOT_VALID
  }
}

export default Jwt
