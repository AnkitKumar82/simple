import CommentModel from '../models/Comment.mjs'

const CommentController = {
  getCommentByPostId,
  createCommentByPostId,
  deleteCommentById
}

async function getCommentByPostId (request, response, next) {
  try {
    const { params: {} } = request
    const data = await CommentModel.getByPostId(params)
    const responseBody = { data, message: 'Comment Fetch Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function createCommentByPostId (request, response, next) {
  try {
    const { params: { id }, body, tokenUser } = request
    const data = await CommentModel.createByPostId(id, body, tokenUser)
    const responseBody = { data, message: 'Comment Create Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function deleteCommentById (request, response, next) {
  try {
    const { params: { id }, tokenUser } = request
    const data = await CommentModel.deleteById(id, tokenUser)
    const responseBody = { data, message: 'Comment Delete Success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

export default CommentController
