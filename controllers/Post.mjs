import PostModel from '../models/Post.mjs'

const PostController = {
  getPostByOffset,
  getPostById,
  createPost,
  deletePostById
}

async function getPostByOffset (request, response, next) {
  try {
    const { params: { offset } } = request
    const data = await PostModel.getByOffset(offset)
    const responseBody = { data, message: 'Post fetch by offset success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    console.log(error)
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function getPostById (request, response, next) {
  try {
    const { params: { id } } = request
    const data = await PostModel.getById(id)
    const responseBody = { data, message: 'Post fetch success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function createPost (request, response, next) {
  try {
    const { body = {}, tokenUser = {} } = request
    const data = await PostModel.create(body, tokenUser)
    const responseBody = { data, message: 'Post Create success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function deletePostById (request, response, next) {
  try {
    const { params: { id }, tokenUser = {} } = request
    const data = await PostModel.deleteById(id, tokenUser)
    const responseBody = { data, message: 'Post Delete success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

export default PostController
