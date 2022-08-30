import CommentSchema from '../Schema/Comment.mjs'
import mongoose from 'mongoose'
const { model } = mongoose

const Comment = new model('Comment', CommentSchema)

const CommentModel = {
  createByPostId,
  getByPostIdAndOffset,
  deleteById
}

async function createByPostId (postId, attrs = {}, tokenUser = {}) {
  const { userId } = tokenUser
  const { body = ''} = attrs

  const commentObj = {
    body,
    userId,
    postId
  }

  await Comment.create(commentObj)
}

async function getByPostIdAndOffset (postId, offset) {
  const limit = 100
  const skip = offset * limit
  const comments = await Comment.find({ postId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
  return comments
}

async function deleteById (id, tokenUser = {}) {
  const { userId } = tokenUser

  const deleteProps = {
    userId,
    _id: id
  }
  const result = await Comment.deleteOne(deleteProps)
  const {
    deletedCount
  } = result

  const response = {
    deleted: deletedCount === 1
  }

  return response
}

export default CommentModel
