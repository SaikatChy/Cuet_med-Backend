import express from 'express'
import { userControllers } from '../Controllers/user.controllers'
import { userValidators } from '../Validators/user.validators'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
const doctorRoutes = express.Router()
doctorRoutes.post(
  '/',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userValidators.createDoctorValidator,
  userControllers.createDoctor,
)
doctorRoutes.get('/', userControllers.getAllDoctor)
doctorRoutes.get(
  '/:doctorId',
  userValidators.singleDoctorValidator,
  userControllers.getDoctor,
)
doctorRoutes.patch(
  '/:doctorId',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userValidators.singleDoctorValidator,
  userControllers.updateDoctor,
)
doctorRoutes.delete(
  '/:doctorId',
  userValidators.singleDoctorValidator,
  userControllers.deleteDoctor,
)
export default doctorRoutes
