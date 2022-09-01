import Express from 'express'
import { PostController } from '../controllers/index.mjs'
import { RequestHandlers, TokenHandlers } from '../middlewares/index.mjs'

const {
  routeMatched
} = RequestHandlers

const {
  tokenValidate
} = TokenHandlers

const {
  getPostsByUserId,
  getPostsByCreatedByUserId,
  getPostsByCommunityId,
  getPostById,
  createPost,
  deletePostById
} = PostController

const PostRouter = new Express.Router()

PostRouter.get('/user-id/:offset', routeMatched, tokenValidate, getPostsByUserId)
PostRouter.get('/user-created/:offset', routeMatched, tokenValidate, getPostsByCreatedByUserId)
PostRouter.get('/community-id/:communityId/:offset', routeMatched, getPostsByCommunityId)
PostRouter.get('/:id', routeMatched, getPostById)

PostRouter.post('/', routeMatched, tokenValidate, createPost)

PostRouter.delete('/:id', routeMatched, tokenValidate, deletePostById)

export default PostRouter
