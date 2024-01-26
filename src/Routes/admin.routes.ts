import express from 'express'
import { userControllers } from '../Controllers/user.controllers'
import { userValidators } from '../Validators/user.validators'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
const adminRoutes = express.Router()
adminRoutes.post(
  '/',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userValidators.createAdminValidator,
  userControllers.createAdmin,
)
adminRoutes.patch(
  '/',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userValidators.singleAdminValidator,
  userControllers.updateAdmin,
)
export default adminRoutes
