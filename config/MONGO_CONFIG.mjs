import mongoose from 'mongoose'
const {
  MONGO_DBNAME = '',
  MONGO_HOSTS = '',
  MONGO_USERNAME = '',
  MONGO_PASSWORD = ''
} = process.env

const CONNECTION_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTS}/${MONGO_DBNAME}?retryWrites=true&w=majority`

const CONFIG = {
  DBNAME: MONGO_DBNAME,
  uri: CONNECTION_URI,
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongodb connected')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongodb reconnected')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongodb disconnected')
})
mongoose.connection.on('close', () => {
  console.log('Mongodb close')
})
mongoose.connection.on('error', (error) => {
  console.log('Mongodb connected')
  throw error
})

const mongoConnect = async () => {
  console.log('Connecting to mongodb')
  await mongoose.connect(CONNECTION_URI, CONFIG.OPTIONS)
}

const MONGO_CONFIG = { CONFIG, mongoConnect }

export default MONGO_CONFIG
