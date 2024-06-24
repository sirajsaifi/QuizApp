import express from 'express'
import cookieParser from 'cookie-parser'

import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import questionRouter from './routes/questionRoutes.js'

const app = express()


app.use(express.json())

app.use(cookieParser())

app.use('/api/v1', questionRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

export default app