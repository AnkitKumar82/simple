const {
  PORT = 8080,
  BODY_LIMIT = '5mb',
  ALLOW_CORS_ORIGIN = '*,http://localhost*',
  ALLOW_CORS_METHODS = 'OPTIONS,GET,POST,PUT,PATCH,DELETE',
  SERVICE_NAME = ''
} = process.env

const ALLOW_ORIGINS = ALLOW_CORS_ORIGIN.split(',')
const ALLOW_ORIGINS_REGEXP = ALLOW_ORIGINS.map(origin => new RegExp(_sanitizeRegExpStr(origin)))

const CORS_OPTIONS = {
  methods: ALLOW_CORS_METHODS,
  origin: ALLOW_ORIGINS_REGEXP,
  preflightContinue: false
}

const SERVER_CONFIG = {
  PORT,
  BODY_LIMIT,
  CORS_OPTIONS,
  SERVICE_NAME
}

export default SERVER_CONFIG

function _sanitizeRegExpStr (string) {
  const escapedString = string.trim().replace(/[./]/g, '\\$&')
  const whildcardReplaced = escapedString.replace(/\*/g, '[0-9a-zA-Z.\\-_:]*')
  return `^${whildcardReplaced}$`.trim()
}
