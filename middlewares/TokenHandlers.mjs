import Jwt from '../Helpers/Jwt.mjs'
import { Errors } from '../constants/index.mjs'

async function tokenValidate (request, response, next) {
  try {
    const token = request.headers['access-token']
    const result = Jwt.jwtValidate(token)
    const { userId } = result
    if (!userId) {
      throw Errors.UNAUTHORISED
    }
    request.tokenUser = result
    process.nextTick(next)
  } catch (error) {
    const err = Errors.UNAUTHORISED
    response.status(err.status || 500)
    return response.send(err).end()
  }
}

export default {
  tokenValidate
}
