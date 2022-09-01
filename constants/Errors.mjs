const Errors = {
  UNAUTHENTICATED: {
    status: 401,
    message: 'Unauthenticated',
    code: 'ERROR_01'
  },
  USER_NOT_FOUND: {
    status: 404,
    message: 'User not found',
    code: 'ERROR_02'
  },
  POST_NOT_FOUND: {
    status: 404,
    message: 'Post not found',
    code: 'ERROR_03'
  },
  COMMENT_NOT_FOUND: {
    status: 404,
    message: 'Comment not found',
    code: 'ERROR_04'
  },
  COMMUNITY_NOT_FOUND: {
    status: 404,
    message: 'Community not found',
    code: 'ERROR_05'
  },
  UNAUTHORISED: {
    status: 403,
    message: 'Unauthorised',
    code: 'ERROR_06'
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal server error',
    code: 'ERROR_07'
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
    code: 'ERROR_08'
  },
  PASSWORDS_NOT_MATCHED: {
    status: 401,
    message: 'Password not matched',
    code: 'ERROR_09'
  },
  USER_ALREADY_EXISTS: {
    status: 401,
    message: 'User Already Exists',
    code: 'ERROR_10'
  },
  TOKEN_NOT_VALID: {
    status: 401,
    message: 'Token not valid',
    code: 'ERROR_11'
  }
}

export default Errors
