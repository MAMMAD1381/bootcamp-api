const express = require('express');
const router = express.Router();
const { getMe, updateDetails, updatePassword } = require('../controller/me');
const { authorization } = require('../middleware/authorization');

router.route('/').get(authorization, getMe);
router.route('/updatedetails/').put(authorization, updateDetails);
router.route('/updatepassword/').put(authorization, updatePassword);

module.exports = router;
