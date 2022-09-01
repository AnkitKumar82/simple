import Express from 'express'
import { CommentController } from '../controllers/index.mjs'
import { RequestHandlers, TokenHandlers } from '../middlewares/index.mjs'

const {
  routeMatched
} = RequestHandlers

const {
  tokenValidate
} = TokenHandlers

const {
  getCommentByPostId,
  createCommentByPostId,
  deleteCommentById
} = CommentController

const CommentRouter = new Express.Router()

CommentRouter.get('/:id/:offset', routeMatched, getCommentByPostId)

CommentRouter.post('/:id', routeMatched, tokenValidate, createCommentByPostId)

CommentRouter.delete('/:id', routeMatched, tokenValidate, deleteCommentById)

export default CommentRouter
