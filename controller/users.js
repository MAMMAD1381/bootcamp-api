const User = require('../models/User');
const errorMessage = require('../utils/ErrorMessage');
const asyncHandler = require('../middleware/async');
require('dotenv');

// ? create user (admin only)
exports.createUser = asyncHandler(async function (req, res, next) {
    let user = await User.create(req.body);
    res.status(201).send({ success: true, data: user });
});

// ? update user (admin only)
exports.updateUser = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('an id is required for this route', 400));
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    res.status(200).send({ success: true, data: user });
});

// ? delete user (admin only)
exports.deleteUser = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('an id is required for this route', 400));
    let user = await User.findById(req.params.id);

    if(!user) return next(new errorMessage(`user with this id doesn't exists`, 404))

    user.deleteOne()
    res.status(200).send({ success: true, data: {} });

});

// ? get all users (admin only)
exports.getAllUsers = asyncHandler(async function (req, res, next) {
    res.status(200).send(res.advancedQueriesResult);
});

// ? get user (admin only)
exports.getUser = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('an id is required for this route', 400));
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return next(new errorMessage(`user with this id doesn't exists`, 404))

    res.status(200).send({ success: true, data: user });
});
