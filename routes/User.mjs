import Express from 'express'
import { UserController } from '../controllers/index.mjs'
import { RequestHandlers, TokenHandlers } from '../middlewares/index.mjs'

const {
  routeMatched
} = RequestHandlers

const {
  tokenValidate
} = TokenHandlers

const {
  get,
  login,
  signup,
  validateOtp
} = UserController

const UserRouter = new Express.Router()

UserRouter.get('/', routeMatched, tokenValidate, get)

UserRouter.post('/login', routeMatched, login)
UserRouter.post('/signup', routeMatched, signup)
UserRouter.post('/validate-otp', routeMatched, validateOtp)

export default UserRouter
