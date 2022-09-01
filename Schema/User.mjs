import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true, index: true },
  password: { type: String, require: true },
  about: { type: String, default: '' },
  email: { type: String, require: true, index: true },
  following: { type: [String], default: [] },
  followers: { type: [String], default: [] },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
})

export default UserSchema
