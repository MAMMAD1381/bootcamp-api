const User = require('../models/User');
const errorMessage = require('../utils/ErrorMessage');
const asyncHandler = require('../middleware/async');
require('dotenv');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcryptjs');
const { options } = require('../routes/courses');
const crypto = require('crypto');

exports.register = asyncHandler(async function (req, res, next) {
    // ? duplicate email
    let user = await User.findOne({ email: req.body.email });
    if (user)
        next(new errorMessage(`user with email:${req.body.email} exists`, 400));

    // ? create user
    res.user = await User.create(req.body);

    // ? move on to send token section
    next();
});

exports.login = asyncHandler(async function (req, res, next) {
    let { email, password } = req.body;

    let user = await User.findOne({ email }).select('password');

    // ? check if a user exist with given email
    if (user) {
        let isPassCorrect = await user.isPassCorrect(password);

        // ? wrong pass
        if (!isPassCorrect) next(new errorMessage('wrong password', 401));
        res.user = await User.findOne({ email });
    } else next(new errorMessage(`user with email:${email} doesn't exists`, 401));

    // ? moves on to send token method
    next();
});

// ? get me
exports.getMe = asyncHandler(async function (req, res, next) {
    let user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});

// ? providing token in the cookie
exports.tokenSender = asyncHandler(async function (req, res, next) {
    let token = res.user.getJWT();
    let cookieOptions = {
        expire: new Date(
            Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(200)
        .cookie('TOKEN', token, cookieOptions)
        .send({ success: true, data: res.user, token });
});

// ? forgot pass
exports.forgotPassword = asyncHandler(async function (req, res, next) {
    if (!req.body.email)
        next(new errorMessage('an email is needed for using this route', 400));
    let user = await User.findOne({ email: req.body.email });
    if (!user)
        next(new errorMessage(`user with this email doesn't exists`, 401));
    let resetToken = user.generateResetPasswordToken();
    user = await user.save();

    let url = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/resetpassword/${resetToken}`;

    mailSender({
        toMail: user.email, // list of receivers
        subject: 'reset password', // Subject line
        message: `if you have not requested a password reset ignore this email otherwise send a post request to this url: ${url}`, // plain text body
        html: `<form method="post" action="some_page" class="inline">
        <center style="width: 100%; background-color: #0d0cb5; padding: 10px;">
            <div style="background-color: #0d0cb5; padding: 10px; color: #f1f1f1; font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 15px; line-height: 1.8;">
            <h2 style="color: #f1f1f1;">Password Reset Request</h2>
            <p> if you have not requested a reset Password ignore this email, otherwise pls click on the link below for password reset.</p>
            </div>
            <button style="height: 50px; background-color: #0d0cb5; display: inline-block; border-radius: 5px; border: 1px solid #fff;" type="submit" name="submit_param" value="submit_value" class="link-button">
                <p><a style="text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: transparent; color: #fff;" href="${url}"> reset password </a> </p>
        
            </button>
        </center>    
    </form>
    `,
    });
    res.status(200).send({ success: true, data: 'reset password link sent' });
    next();
});

// ? reset password
exports.resetPassword = asyncHandler(async function (req, res, next) {
    if (!req.params.token)
        return next(
            new errorMessage('pls provide a reset password token', 400)
        );

    let token = req.params.token;
    let hashedToken =
        crypto.createHash('sha256').update(token).digest('hex') + '';

    let user = await User.findOne({ resetPasswordToken: hashedToken });
    if (!user) return next(new errorMessage('wrong reset password token', 401));

    console.log(Date.now(), user.resetPasswordExpire);
    if (Date.now() > user.resetPasswordExpire)
        return next(new errorMessage('reset password token expired', 403));

    if (!req.body.newPassword)
        return next(
            new errorMessage('providing the new password is required', 400)
        );

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();

    res.status(200).send({
        success: true,
        data: 'the reset password was successful',
    });
    next();
});
