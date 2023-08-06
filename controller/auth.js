const User = require('../models/User')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
require('dotenv')

exports.register = asyncHandler(async function(req, res, next){

    // ? duplicate email
    let user = await User.findOne({email: req.body.email})
    if(user) return next(new errorMessage(`user with email:${req.body.email} exists`, 400))

    // ? create user
    user = await User.create(req.body)
    let token = user.getJWT(user._id)
    res.status(200).json({success: 'true', data: user, token})
})