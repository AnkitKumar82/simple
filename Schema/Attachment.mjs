import mongoose from 'mongoose'
const { Schema } = mongoose

const AttachmentSchema = new Schema({
  data: { type: String, default: '' },
  url: { type: String, default: '' },
  extension: { type: String, default: '' }
}, { _id: false })

export default AttachmentSchema
