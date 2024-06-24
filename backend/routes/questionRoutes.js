import express from 'express'
import { allQuestions, totalScore } from '../controllers/questionController.js'

const router = express.Router()

router.get('/question', allQuestions)
router.post('/score', totalScore)

export default router