import mongoose from 'mongoose'
import AttachmentSchema from './Attachment.mjs'
const { Schema } = mongoose

const PostSchema = new Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  attachments: { type: [AttachmentSchema], default: [] },
  communityId: { type: String, index: true, require: true },
  userId: { type: String, require: true, index: true },
  tags: { type: [String], default: [] },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default PostSchema
