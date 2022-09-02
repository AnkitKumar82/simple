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
  getCommunityById,
  getCommunityBySearchQuery,
  getCommunityByUserId,
  createCommunity,
  followCommunity
} = CommunityController

const CommunityRouter = new Express.Router()

CommunityRouter.get('/user-id', routeMatched, tokenValidate, getCommunityByUserId)
CommunityRouter.get('/community-name/:communitySearchQuery', routeMatched, tokenValidate, getCommunityBySearchQuery)
CommunityRouter.get('/community-id/:id', routeMatched, getCommunityById)

CommunityRouter.post('/', routeMatched, tokenValidate, createCommunity)
CommunityRouter.post('/follow/community-id/:communityId', routeMatched, tokenValidate, followCommunity)

export default CommunityRouter
