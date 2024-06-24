import express from 'express'
import { getAllUsers } from '../controllers/userController.js'
import { restrictTo } from '../controllers/authController.js'
import protectRoutes from '../middlewares/protectRoutes.js'

const router = express.Router()

// router.use(restrictTo('admin'))
router.use(protectRoutes)

router.get('/', getAllUsers)

export default router