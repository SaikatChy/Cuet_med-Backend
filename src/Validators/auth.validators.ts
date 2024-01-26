import validationErrorHandler from '../middlewares/validationHandler'
import {
  adminIdValidator,
  doctorIdValidator,
  passwordValidator,
  studentIdValidator,
} from './utils.validators'

const studentLoginValidators = [
  studentIdValidator,
  passwordValidator,
  validationErrorHandler,
]

const doctorLoginValidators = [
  doctorIdValidator,
  passwordValidator,
  validationErrorHandler,
]
const adminLoginValidators = [
  adminIdValidator,
  passwordValidator,
  validationErrorHandler,
]

export const authValidators = {
  studentLoginValidators,
  doctorLoginValidators,
  adminLoginValidators,
}
