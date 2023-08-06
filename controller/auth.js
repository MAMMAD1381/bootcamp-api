const User = require('../models/User')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
require('dotenv')
const bcrypt = require('bcryptjs')

exports.register = asyncHandler(async function(req, res, next){

    // ? duplicate email
    let user = await User.findOne({email: req.body.email})
    if(user) next(new errorMessage(`user with email:${req.body.email} exists`, 400))

    // ? create user
    user = await User.create(req.body)
    let token = user.getJWT()
    res.status(200).json({success: 'true', data: user, token})
})

exports.login = asyncHandler(async function(req, res, next){
    let {email, password} = req.body

    let user = await User.findOne({email}).select('password')

    // ? check if a user exist with given email
    if (user){
        let isPassCorrect = await user.isPassCorrect(password)

        // ? wrong pass
        if (!isPassCorrect)
            next(new errorMessage('wrong password', 401))
        let token = user.getJWT()
        res.status(200).send({success: true, data: await User.findOne({email}), token})
    }
    else
        next(new errorMessage(`user with email:${email} doesn't exists`, 401))
})