import express from 'express'
import { userControllers } from '../Controllers/user.controllers'
import { userValidators } from '../Validators/user.validators'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
const studentRoutes = express.Router()
studentRoutes.post(
  '/',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userValidators.createStudentValidator,
  userControllers.createStudent,
)
studentRoutes.get('/', userControllers.getAllStudent)
studentRoutes.delete(
  '/:studentId',
  userValidators.singleStudentValidator,
  userControllers.deleteStudent,
)
studentRoutes.get(
  '/:studentId',
  userValidators.singleStudentValidator,
  userControllers.getStudent,
)
studentRoutes.patch(
  '/:studentId',
  userValidators.singleStudentValidator,
  userControllers.updateStudent,
)

export default studentRoutes
