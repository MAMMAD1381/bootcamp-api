const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv')


// ? authorization with bearer token
exports.authorization = asyncHandler(async function(req, res, next){
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

        req.user = user
    }
    else next(new errorMessage('not authorized', 401))

    next()
})

// ? role authorization for given roles
exports.roleAuthorization = (roles) => function(req, res, next){
    if (!roles.includes(req.user.role))
        next(new errorMessage('user role is not permitted in this route', 403))

    next()
}

// ? check if the user is the owner
exports.ownershipAuthorization = (model) => asyncHandler(async function(req, res, next){
    
    let resource = await model.findById(req.params.id)
    if (resource.user+'' !== req.user.id+'' && (req.user.role === 'user' || req.user.role === 'publisher'))
        next(new errorMessage('this route is permitted to owner only', 403))
    next()
})


// ? check if the user has a resource already (you can only have one bootcamp)
exports.oneResourcePerUser = (model) => asyncHandler(async function(req, res, next){
    
    const resourceName = model.collection.modelName
    let resources = await model.find({user: req.user.id})
    if (resources.length > 1 && (req.user.role === 'user' || req.user.role === 'publisher'))
        next(new errorMessage(`multiple ${resourceName}s are not allowed`, 403))
    next()
})
