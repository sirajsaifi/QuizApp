import jwt from 'jsonwebtoken'

import User from '../model/userModel.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true


    res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

export const signup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body)

    createSendToken(newUser, 201, req, res)
})

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError('Please provide the email and the password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    createSendToken(user, 200, req, res)
})

export const logout = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        status: 'success'
    })
})

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have the permission to perform this action.', 403))    //403 --> forbidden
        }
        next()
    }
}