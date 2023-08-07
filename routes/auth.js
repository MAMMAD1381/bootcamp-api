const express = require('express')
const router = express.Router()
const {register, login, tokenSender, getMe} = require('../controller/auth')
const {authorization} = require('../middleware/authorization')

router.route('/register').post(register, tokenSender)
router.route('/login').post(login, tokenSender)
router.route('/me').get(authorization, getMe)
module.exports = router