import { err, notFound } from './middlewares/errors'
import { Router } from 'express'
import ctrl from './controllers/'

const router = Router()
.get('/users', ctrl.users.list)
.post('/users', ctrl.users.create)
.post('/login', ctrl.users.auth)
.post('/register', ctrl.users.register)
.use(err)
.use('*', notFound)

export default router
