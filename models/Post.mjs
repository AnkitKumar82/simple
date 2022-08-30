import PostSchema from '../Schema/Post.mjs'
import mongoose from 'mongoose'
import Errors from '../constants/Errors.mjs'
const { model } = mongoose

const Post = new model('Post', PostSchema)

const PostModel = {
  create,
  getById,
  getByOffset,
  deleteById
}

async function create (attrs = {}, tokenUser = {}) {
  const { userId } = tokenUser
  const { title = '', body = '', attachments = [] } = attrs

  const attachmentProps = _getAttachmentProps(attachments)
  const postObj = {
    title,
    body,
    attachments: attachmentProps,
    userId
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

async function getByOffset (offset) {
  const limit = 5
  const skip = offset * limit
  const posts = await Post.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit)
  return posts
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
