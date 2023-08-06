const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('colors')
require('dotenv')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmEmailToken: String,
    isEmailConfirmed: {
        type: Boolean,
        default: false,
    },
    twoFactorCode: String,
    twoFactorCodeExpire: Date,
    twoFactorEnable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// ? hashing pass before saving with bcrypt
UserSchema.pre('save', async function(next){
    let salt = process.env.AUTH_SALT_NUM ? parseInt(process.env.SALT_NUM) : 10
    this.password = await bcrypt.hash(this.password, salt)
})

// ? jwt sign
UserSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_EXPIRE,});
}
  
// ? is password correct
UserSchema.methods.isPassCorrect = async function (plainPass) {
    console.log(`un hashed: ${plainPass}`.red, `${this.password}`.blue)
    let r = await bcrypt.compare(plainPass+'', this.password)
    console.log(`${r}`.red)
    return await bcrypt.compare(plainPass+'', this.password)
}

module.exports = mongoose.model('User', UserSchema)