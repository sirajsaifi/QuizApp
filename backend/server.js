import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

import app from "./app.js";

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.set('strictQuery', true)

mongoose.connect(DB)
    .then(() => {
        console.log('DB connected successfully')
    }).catch((err) => {
        console.log('UNHANDLED REJECTION. Shutting down...')
        console.log('DB connection error', err.name, err.message)
        console.error(err)
        server.close(() => {
            process.exit(1)
        })
    })

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})