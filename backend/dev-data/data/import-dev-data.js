import fs from 'fs'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import Question from '../../model/questionModel.js'

dotenv.config({ path: './config.env' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.set('strictQuery', true)

mongoose.connect(DB)
    .then(() => {
        console.log('DB connected successfully.')
    })

//read json files
const questions = JSON.parse(fs.readFileSync(`${__dirname}/questions.json`, 'utf-8'))

// importing data into database
const importData = async () => {
    try {
        await Question.create(questions)
        console.log('Data successfully loaded.')
    }
    catch (err) {
        console.log(err)
    }
    process.exit()
}

//delete all data rfom database
const deleteData = async () => {
    try {
        await Question.deleteMany()
        console.log('Data successfully deleted.')
    }
    catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}