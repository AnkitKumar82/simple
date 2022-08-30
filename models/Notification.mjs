import axios from 'axios'
import { Endpoints, Errors } from '../constants/index.mjs'
import { SERVER_CONFIG } from '../config/index.mjs'

const NotificationModel = {
  sendOtp,
  validateOtp
}

async function sendOtp (attrs = {}) {
  const sendOtpRequestOptions = _sendOtpRequestOptions(attrs)
  const response = await axios(sendOtpRequestOptions)
  const {
    data: {
      data: {
        refId,
        retryCount
      } = {}
    } = {}
  } = response

  if (!refId) {
    throw Errors.INTERNAL_SERVER_ERROR
  }

  const result = {
    refId,
    retryCount
  }
  return result
}

function _sendOtpRequestOptions (attrs) {
  const { refId = '', email } = attrs
  const text = 'Otp valid for 10 mins. OTP:'
  const subject = 'Verify your Simple App email address'
  const otpLength = 6
  const options = {
    method: 'post',
    url: Endpoints.NOTIFICATION.OTP.GENERATE.POST,
    data: {
      refId,
      text,
      subject,
      email,
      from: SERVER_CONFIG.SERVICE_NAME,
      otpLength
    }
  }
  return options
}

async function validateOtp (attrs = {}) {
  const validateOtpRequestOptions = _validateOtpRequestOptions(attrs)
  const response = await axios(validateOtpRequestOptions)

  const {
    data: {
      otpValid = false
    }
  } = response

  if (!otpValid) {
    throw Errors.UNAUTHENTICATED
  }
  return {
    otpValid: true
  }
}

function _validateOtpRequestOptions (attrs) {
  const { refId, otp } = attrs
  const options = {
    method: 'post',
    url: Endpoints.NOTIFICATION.OTP.VALIDATE.POST,
    data: {
      refId,
      otp
    }
  }
  return options
}

export default NotificationModel
