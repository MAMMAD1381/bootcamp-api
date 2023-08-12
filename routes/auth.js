const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logOut,
    tokenSender,
    getMe,
    forgotPassword,
    resetPassword,
} = require('../controller/auth');
const { authorization } = require('../middleware/authorization');

router.route('/register').post(register, tokenSender);
router.route('/login').post(login, tokenSender);
router.route('/me').get(authorization, getMe);
router.route('/forgotpassword').get(forgotPassword);
router.route('/resetpassword/:token').post(resetPassword);
router.route('/logout').get(logOut);

module.exports = router;
