const User = require('../models/User');
const errorMessage = require('../utils/ErrorMessage');
const asyncHandler = require('../middleware/async');
require('dotenv');

// ? get me
exports.getMe = asyncHandler(async function (req, res, next) {
    let user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});

// ? update deatails (for loggeed in users only)
exports.updateDetails = asyncHandler(async function (req, res, next) {
    if (!req.body.email && !req.body.name)
        next(
            new errorMessage('entering email or name or both is required'),
            400
        );

    let user = await User.findByIdAndUpdate(
        req.user.id,
        { email: req.body.email, name: req.body.name },
        { runValidators: true, new: true }
    );

    res.status(200).send({ success: true, data: user });
});

// ? update password (for loggeed in users only)
exports.updatePassword = asyncHandler(async function (req, res, next) {
    
    let {oldPassword, newPassword} = req.body
    if (!oldPassword || !newPassword)
        next(
            new errorMessage(
                'entring the old and new password is required',
                400
            )
        );

    let user = await User.findById(req.user.id).select('+password');

    let isPassCorrect = await user.isPassCorrect(oldPassword);
    if(!isPassCorrect) return next(new errorMessage('wrong password', 403))

    user.password = newPassword

    user = await user.save()

    res.status(200).send({ success: true, data: user });
});
