import CommentSchema from '../Schema/Comment.mjs'
import mongoose from 'mongoose'
const { model } = mongoose

const Comment = new model('Comment', CommentSchema)

const CommentModel = {
  createByPostId,
  getByPostId,
  deleteById
}

async function createByPostId (postId, attrs = {}, tokenUser = {}) {
  const { userId } = tokenUser
  const { body = '' } = attrs

  const commentObj = {
    body,
    userId,
    postId
  }

  await Comment.create(commentObj)
}

async function getByPostId (attrs = {}) {
  const {postId, offset} = attrs

  const query = {
    postId
  }

  const limit = 100
  const skip = offset * limit

  const promises = [
    Comment.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Comment.find(query).count()
  ]
  const result = await Promise.allSettled(promises)

  const comments = result[0].value
  const totalCount = result[1].value
  const from = skip + 1
  const to = skip + comments.length
  
  return { comments, metaData: { from, to, totalCount }}
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
