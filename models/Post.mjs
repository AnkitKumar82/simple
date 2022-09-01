import PostSchema from '../Schema/Post.mjs'
import mongoose from 'mongoose'
import Errors from '../constants/Errors.mjs'
import UserModel from './User.mjs'
const { model } = mongoose

const Post = new model('Post', PostSchema)

const PostModel = {
  getByUserId,
  getByCreatedByUserId,
  getByCommunityId,
  getById,
  create,
  deleteById
}

async function getByOffset (offset, query = {}) {
  const limit = 5
  const skip = offset * limit
  
  const promises = [
    Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.find(query).count()
  ]
  const result = await Promise.allSettled(promises)

  const posts = result[0].value
  const totalCount = result[1].value
  const from = skip + 1
  const to = skip + posts.length

  return { posts, metaData: { from, to, totalCount }}
}

async function getByUserId (offset, tokenUser = {}) {
  const user = await UserModel.get(tokenUser, { communitiesFollowing: 1 })
  const { communitiesFollowing = [] } = user

  const query = {
    communityId: { $in: communitiesFollowing}
  }
  const result = await getByOffset(offset, query)
  return result
}

async function getByCreatedByUserId (offset, tokenUser = {}) {
  const { userId } = tokenUser

  const query = {
    userId
  }

  const result = await getByOffset(offset, query)
  return result
}

async function getByCommunityId (attrs = {}, tokenUser = {}) {
  const { communityId, offset } = attrs
  const query = {
    communityId
  }
  const result = await getByOffset(offset, query)
  return result
}


async function create (attrs = {}, tokenUser = {}) {
  const { userId } = tokenUser
  const { title = '', body = '', attachments = [], tags = [], communityId = '' } = attrs

  const attachmentProps = _getAttachmentProps(attachments)
  const postObj = {
    title,
    body,
    attachments: attachmentProps,
    userId,
    tags,
    communityId
  }

  await Post.create(postObj)
}

function _getAttachmentProps (attachments = []) {
  const attachmentsProps = []
  for (const attachment of attachments) {
    const attachmentObj = {
      data: attachment,
      extension: attachment.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
    }
    attachmentsProps.push(attachmentObj)
  }
  return attachmentsProps
}

async function getById (id) {
  if (!id) {
    throw Errors.BAD_REQUEST
  }

  const post = await Post.findById(id)
  if (!post) {
    throw Errors.POST_NOT_FOUND
  }
  return post
}


async function deleteById (id, tokenUser = {}) {
  const { userId } = tokenUser

  const deleteProps = {
    userId,
    _id: id
  }
  const result = await Post.deleteOne(deleteProps)
  const {
    deletedCount
  } = result

  const response = {
    deleted: deletedCount === 1
  }

  return response
}

export default PostModel
