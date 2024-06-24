import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'
import Question from '../model/questionModel.js'
import User from '../model/userModel.js'

export const allQuestions = catchAsync(async (req, res) => {
    const questions = await Question.find({})

    res.status(200).json({
        questions
    })

})


export const totalScore = catchAsync(async (req, res) => {
    const { score } = req.body
    const user = await User.findById(req.user.id)
    if (user) {
        user.score = score;
        await user.save();

        res.status(200).json({
            user
        })
    }
})