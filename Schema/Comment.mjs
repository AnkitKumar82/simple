import mongoose from 'mongoose'
const { Schema } = mongoose

const CommentSchema = new Schema({
  body: { type: String, default: '' },
  userId: { type: String, require: true, index: true },
  postId: { type: String, require: true, index: true },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default CommentSchema
