import CommunityModel from '../models/Community.mjs'

const CommunityController = {
  getCommunityById,
  getCommunityByUserId,
  createCommunity
}

async function getCommunityById (request, response, next) {
  try {
    const { params: { id } } = request
    const data = await CommunityModel.getById(id)
    const responseBody = { data, message: 'Community fetch success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function getCommunityByUserId (request, response, next) {
  try {

    const { tokenUser = {}  } = request
    const data = await CommunityModel.getByUserId(tokenUser)
    const responseBody = { data, message: 'Community fetch by User Id success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

async function createCommunity (request, response, next) {
  try {
    const { body = {}, tokenUser = {} } = request
    const data = await CommunityModel.create(body, tokenUser)
    const responseBody = { data, message: 'Community Create success' }
    response.body = responseBody
    process.nextTick(next)
  } catch (error) {
    response.status(error.status || 500)
    return response.send(error).end()
  }
}

export default CommunityController
