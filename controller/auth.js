const User = require('../models/User')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
require('dotenv')
const mailSender = require('../utils/mailSender')
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
    let user = await User.findById(req.user.id)
    res.status(200).json({success: true, data: user})
})

// ? providing token in the cookie
exports.tokenSender = asyncHandler(async function(req, res, next){
    let token = res.user.getJWT()
    let cookieOptions = {expire: new Date(Date.now + process.env.COOKIE_EXPIRE *24*60*60*1000), 
        httpOnly: true}
    res.status(200).cookie('TOKEN', token, cookieOptions).send({success: true, data: res.user , token})
})


// ? forgot pass
exports.forgotPassword = asyncHandler(async function(req, res, next){
    if (!req.body.email) next(new errorMessage('an email is needed for using this route', 400))
    let user = await User.findOne({email: req.body.email})
    if (!user) next(new errorMessage(`user with this email doesn't exists`, 401))
    // console.log(user)
    user.generateResetPasswordToken()
    user = await user.save()
    let url = `<a href="${req.protocol}://${req.get('host')}/api/v1/resetpassword">reset password</a>`
    console.log(url)
    // let url = document.createElement('a')
    // url.title = 'reset password'
    // url.href = `${req.protocol}://${req.get('host')}/api/v1/resetpassword`
    mailSender({
        toMail: user.email, // list of receivers
        subject: 'reset password', // Subject line
        message: `if you have not requested a password reset ignore this email otherwise send a put request to this url: ${url}` // plain text body
    })
    res.status(200).send({success: true, data: 'reset password link sent'})
    next()
})