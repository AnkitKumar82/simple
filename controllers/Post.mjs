import PostModel from '../models/Post.mjs'

const PostController = {
  getPostsByUserId,
  getPostsByCreatedByUserId,
  getPostsByCommunityId,
  getPostById,
  createPost,
  deletePostById
}

async function getPostsByUserId (request, response, next) {
  try {
    const { params: { offset }, tokenUser = {}  } = request
    const data = await PostModel.getByUserId(offset, tokenUser)
    const responseBody = { data, message: 'Post fetch by User Id success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    console.log(error)
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function getPostsByCreatedByUserId (request, response, next) {
  try {
    const { params: { offset }, tokenUser = {} } = request
    const data = await PostModel.getByCreatedByUserId(offset, tokenUser)
    const responseBody = { data, message: 'Post fetch created by User id success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    console.log(error)
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function getPostsByCommunityId (request, response, next) {
  try {
    const { params} = request
    const data = await PostModel.getByCommunityId(params)
    const responseBody = { data, message: 'Post fetch by community success' }
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
