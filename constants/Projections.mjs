const DefaultProjectionList = [
  '_id',
  'email',
  'username',
  'about'
]

const DefaultProjection = DefaultProjectionList.reduce((acc, val) => {
  acc[val] = 1
  return acc
}, {})

export default DefaultProjection
