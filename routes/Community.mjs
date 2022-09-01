import Express from 'express'
import { CommunityController } from '../controllers/index.mjs'
import { RequestHandlers, TokenHandlers } from '../middlewares/index.mjs'

const {
  routeMatched
} = RequestHandlers

const {
  tokenValidate
} = TokenHandlers

const {
  createCommunity,
  getCommunityById,
  getCommunityByUserId
} = CommunityController

const CommunityRouter = new Express.Router()

CommunityRouter.post('/', routeMatched, tokenValidate, createCommunity)


CommunityRouter.get('/user-id', routeMatched, getCommunityByUserId)
CommunityRouter.get('/:id', routeMatched, getCommunityById)

export default CommunityRouter
