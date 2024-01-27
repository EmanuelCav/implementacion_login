const { Router } = require('express');

const { users, register, login } = require('../controller/users.ctrl')

const router = Router()

router.get('/api/users', users)

router.post('/api/register', register)
router.post('/api/login', login)

module.exports = router