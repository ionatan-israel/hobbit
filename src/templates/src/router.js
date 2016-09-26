import { err, notFound } from './middlewares/errors'
import { Router } from 'express'
import ctrl from './controllers/'

const router = Router()
.post('/auth', ctrl.users.auth)
.post('/register', ctrl.users.register)

Object.keys(ctrl).forEach((c) => {
  Object.keys(ctrl[c]).forEach((m) => {
    if (m === 'list') router.get(`/${c}`, ctrl[c].list)
    if (m === 'create') router.post(`/${c}`, ctrl[c].create)
  })
})

router.use('*', notFound)
router.use(err)

export default router
