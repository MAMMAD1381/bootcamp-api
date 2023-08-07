const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv')

exports.authorization = asyncHandler(async function(req, res, next){
    console.log('authorization')
    let bearerKey = req.headers.authorization
    if(bearerKey){
        bearerKey = bearerKey.split(' ')[1]
                
        let id
        jwt.verify(bearerKey, process.env.AUTH_SECRET, function(err, decoded){
            if(err) return next(new errorMessage(err.message + 'error in decoding', 500))

            if(!decoded.id) return next(new errorMessage(`the token doesn't contains user id`, 401))

            id = decoded.id
        })

        let user = await User.findById(id)

        if(!user) next(new errorMessage('wrong token', 401))

        req.id = id

    }
    else next(new errorMessage('not authorized', 401))


    console.log(`id:${req.id}`.red)
    next()
})