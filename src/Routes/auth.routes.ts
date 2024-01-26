import express from 'express'
import { authControllers } from '../Controllers/auth.controller'
import { authValidators } from '../Validators/auth.validators'
const authRoutes = express.Router()
authRoutes.post(
  '/student/login',
  authValidators.studentLoginValidators,
  authControllers.studentLogin,
)
authRoutes.post(
  '/doctor/login',
  authValidators.doctorLoginValidators,
  authControllers.doctorLogin,
)
authRoutes.post(
  '/admin/login',
  authValidators.adminLoginValidators,
  authControllers.adminLogin,
)
export default authRoutes
