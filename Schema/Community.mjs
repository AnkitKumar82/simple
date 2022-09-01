import mongoose from 'mongoose'
const { Schema } = mongoose

const CommunitySchema = new Schema({
  name: { type: String, require: true, unique: true, index: true },
  userId: { type: String, require: true, index: true },
  about: { type: String, default: '' },
  followerCount: { type: Number, default: 1 },
  createdAt: { type: Date, default: () => new Date() }
})

export default CommunitySchema
