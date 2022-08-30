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
  getPostByOffset,
  getPostById,
  createPost,
  deletePostById
} = PostController

const PostRouter = new Express.Router()

PostRouter.get('/all/:offset', routeMatched, getPostByOffset)
PostRouter.get('/:id', routeMatched, getPostById)

PostRouter.post('/', routeMatched, tokenValidate, createPost)

PostRouter.delete('/:id', routeMatched, tokenValidate, deletePostById)

export default PostRouter
