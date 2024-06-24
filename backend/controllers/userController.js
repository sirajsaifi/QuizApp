import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";

export const getAllUsers = catchAsync(async (req, res) => {
    const allUsers = await User.find(req.params)

    res.status(200).json({
        status: 'success',
        data: {
            data: allUsers
        }

    })
})