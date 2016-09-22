import { Router } from 'express'
import authorize from './middlewares/authorize'
import ctrl from './controllers/'
import multipart from 'connect-multiparty'

const router = Router()
.get('/users', ctrl.users.list)
.post('/users', ctrl.users.create)
.post('/login', ctrl.users.auth)
.post('/register', ctrl.users.register)
.post('/publications', authorize, multipart(), ctrl.publications.toPost)
.get('/publications', ctrl.publications.list)
.use(ctrl.err.err)
.use('*', ctrl.err.notFound)

export default router
