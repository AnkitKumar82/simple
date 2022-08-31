import Jwt from '../Helpers/Jwt.mjs'
import bcrypt from 'bcrypt'
import { Errors } from '../constants/index.mjs'
import UserSchema from '../Schema/User.mjs'
import NotificationModel from './Notification.mjs'
import Projections from '../constants/Projections.mjs'
import mongoose from 'mongoose'
const { model } = mongoose

const User = new model('User', UserSchema)

const UserModel = {
  get,
  login,
  signup,
  validateOtp
}

async function get (attrs = {}) {
  const { tokenUser } = attrs
  const { userId } = tokenUser

  const projections = {
    ...Projections
  }
  const user = await User.findById(userId, projections)

  if (!user) {
    throw Errors.USER_NOT_FOUND
  }

  return user
}

async function login (attrs = {}) {
  const { username = '', password = '' } = attrs

  if (!password || !username) {
    throw Errors.BAD_REQUEST
  }

  const user = await User.findOne({ username })
  if (!user) {
    throw Errors.USER_NOT_FOUND
  }
  await _verifyUserLoginPasswords(password, user.password)

  const { _id } = user
  const tokenData = {
    userId: _id
  }

  const token = Jwt.jwtGenerate(tokenData)
  const result = {
    token
  }
  return result
}

async function _verifyUserLoginPasswords (password, passwordHash) {
  const passwordMatch = await bcrypt.compare(password, passwordHash)

  if (!passwordMatch) {
    throw Errors.PASSWORDS_NOT_MATCHED
  }
}

async function signup (attrs = {}) {
  try {
    const { username = '', email = '', password = '' } = attrs

    if (!email || !password || !username) {
      throw Errors.BAD_REQUEST
    }

    const passwordHash = await _generateHash(password)

    const userObj = {
      username,
      password: passwordHash,
      email
    }

    const user = await User.create(userObj)
    const { _id } = user

    const otp = await NotificationModel.sendOtp(attrs)

    const tokenData = {
      userId: _id
    }
    const token = Jwt.jwtGenerate(tokenData)

    const result = {
      token,
      otp
    }
    return result
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw Errors.USER_ALREADY_EXISTS
    }
    throw error
  }
}

async function validateOtp (attrs = {}) {
  const { refId, otp } = attrs

  if (!refId || !otp) {
    throw Errors.BAD_REQUEST
  }

  await NotificationModel.validateOtp(attrs)

  return {
    otpValid: true
  }
}

async function _generateHash (str) {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(str, salt)
  return passwordHash
}

export default UserModel
