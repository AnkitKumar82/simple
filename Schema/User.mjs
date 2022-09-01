import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true, index: true },
  password: { type: String, require: true },
  about: { type: String, default: '' },
  email: { type: String, require: true, index: true },
  communitiesFollowing: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() }
})

export default UserSchema
