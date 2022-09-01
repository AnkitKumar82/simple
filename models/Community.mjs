import CommunitySchema from '../Schema/Community.mjs'
import mongoose from 'mongoose'
import Errors from '../constants/Errors.mjs'
const { model } = mongoose

const Community = new model('Community', CommunitySchema)

const CommunityModel = {
  create,
  getById,
  getByUserId
}

async function create (attrs = {}, tokenUser = {}) {
  const { userId } = tokenUser
  const { name = '', about = '' } = attrs

  const communityObj = {
    name,
    about,
    userId
  }

  await Community.create(communityObj)
}

async function getById (id) {
  if (!id) {
    throw Errors.BAD_REQUEST
  }

  const community = await Community.findById(id)
  if (!community) {
    throw Errors.COMMUNITY_NOT_FOUND
  }
  return community
}

async function getByUserId (tokenUser) {
  const user = await UserModel.get(tokenUser)
  const { communitiesFollowing = [] } = user

  const query = {
    _id: { $in: communitiesFollowing}
  }

  const result = await Community.find({query})
  if (!result) {
    throw Errors.COMMUNITY_NOT_FOUND
  }
  return result
}

export default CommunityModel
