import CommunitySchema from '../Schema/Community.mjs'
import UserModel from './User.mjs'
import mongoose from 'mongoose'
import Errors from '../constants/Errors.mjs'
const { model } = mongoose

const Community = new model('Community', CommunitySchema)

const CommunityModel = {
  create,
  getById,
  getByUserId,
  follow,
  getBySearchQuery
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
    _id: { $in: communitiesFollowing }
  }

  const result = await Community.find(query)
  if (!result) {
    throw Errors.COMMUNITY_NOT_FOUND
  }
  return result
}

async function getBySearchQuery (communitySearchQuery) {
  const query = {
    name: { $regex: '.*' + communitySearchQuery + '.*' }
  }

  const results = await Community.find(query)
  if (!results.length) {
    throw Errors.COMMUNITY_NOT_FOUND
  }
  return results
}

async function follow (communityId, tokenUser) {
  const options = {
    new: true
  }
  const updateProps = {
    $inc: { followerCount: 1 }
  }

  const result = await Community.findByIdAndUpdate(communityId, updateProps, options)
  if (!result) {
    throw Errors.COMMUNITY_NOT_FOUND
  }

  await UserModel.addFollowing(communityId, tokenUser)

  return {
    follow: true
  }
}

export default CommunityModel
