import { UserModel } from '../models/index.mjs'
const UserController = {
  get,
  login,
  signup,
  validateOtp
}

async function get (request, response, next) {
  try {
    const { tokenUser } = request
    const user = await UserModel.get(tokenUser)
    const { com } = user
    const responseBody = { data, message: 'User Fetch Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function login (request, response, next) {
  try {
    const { body = {} } = request
    const data = await UserModel.login(body)
    const responseBody = { data, message: 'User Login Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function signup (request, response, next) {
  try {
    const { body = {} } = request
    const data = await UserModel.signup(body)
    const responseBody = { data, message: 'User Signup Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function validateOtp (request, response, next) {
  try {
    const { body = {} } = request
    const data = await UserModel.validateOtp(body)
    const responseBody = { data, message: 'User Otp Validate Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}
export default UserController
