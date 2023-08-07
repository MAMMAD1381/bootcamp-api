const User = require('../models/User')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
require('dotenv')
const bcrypt = require('bcryptjs')
const { options } = require('../routes/courses')

exports.register = asyncHandler(async function(req, res, next){

    // ? duplicate email
    let user = await User.findOne({email: req.body.email})
    if(user) next(new errorMessage(`user with email:${req.body.email} exists`, 400))

    // ? create user
    res.user = await User.create(req.body)

    // ? move on to send token section
    next()
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
        res.user = await User.findOne({email})
        
    }
    else
        next(new errorMessage(`user with email:${email} doesn't exists`, 401))

    // ? moves on to send token method
    next()
})


// ? get me
exports.getMe = asyncHandler(async function(req, res ,next){
    let user = await User.findById(req.id)
    res.status(200).json({success: true, data: user})
})

// ? providing token in the cookie
exports.tokenSender = asyncHandler(async function(req, res, next){
    let token = res.user.getJWT()
    let cookieOptions = {expire: new Date(Date.now + process.env.COOKIE_EXPIRE *24*60*60*1000), 
        httpOnly: true}
    res.status(200).cookie('TOKEN', token, cookieOptions).send({success: true, data: res.user , token})
})