import { ENPOINTS_CONFIG } from '../config/index.mjs'

const {
  NOTIFICATION
} = ENPOINTS_CONFIG

const NOTIFICATION_PATHS = {
  OTP: {
    GENERATE: {
      POST: `${NOTIFICATION}/otp/generate`
    },
    VALIDATE: {
      POST: `${NOTIFICATION}/otp/validate`
    }
  }
}

const ENPOINTS = {
  NOTIFICATION: NOTIFICATION_PATHS
}

export default ENPOINTS
