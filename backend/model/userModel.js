import mongoose from "mongoose";
import validator from "validator";

import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must enter the name.'],
        maxlength: [15, 'A name should not be exceeding 15 characters.']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email.'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    role: {
        type: String,
        default: 'client'
    },
    score: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        minlength: [8, 'A password must have atleast 8 characters.'],
        required: [true, 'Please enter a password.'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not same.'
        }
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})


userSchema.methods.correctPassword = async function (candidatePassword, userPasword) {
    return await bcrypt.compare(candidatePassword, userPasword)
}

const User = mongoose.model('User', userSchema)

export default User