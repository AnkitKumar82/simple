import { ResponseHandlers } from '../middlewares/index.mjs'
import HealthRouter from './Health.mjs'
import VersionRouter from './Version.mjs'
import UserRouter from './User.mjs'
import PostRouter from './Post.mjs'
import CommentRouter from './Comment.mjs'

const {
  responseSend
} = ResponseHandlers

const Routes = [
  { path: '/health', router: HealthRouter },
  { path: '/version', router: VersionRouter },
  { path: '/user', router: UserRouter },
  { path: '/post', router: PostRouter },
  { path: '/comment', router: CommentRouter }
]

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', responseSend)
}

export default Routes
