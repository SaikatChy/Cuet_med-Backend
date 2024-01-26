import validationErrorHandler from '../middlewares/validationHandler'
import {
  adminIdParamValidator,
  adminIdValidator,
  batchValidator,
  departmentValidator,
  designationValidator,
  doctorIdParamValidator,
  doctorIdValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  profileImageValidator,
  studentIdParamValidator,
  studentIdValidator,
} from './utils.validators'

const createStudentValidator = [
  nameValidator,
  emailValidator,
  studentIdValidator,
  batchValidator,
  profileImageValidator,
  departmentValidator,
  passwordValidator,
  validationErrorHandler,
]
const singleStudentValidator = [studentIdParamValidator, validationErrorHandler]
const createDoctorValidator = [
  doctorIdValidator,
  nameValidator,
  emailValidator,
  passwordValidator,
  profileImageValidator,
  designationValidator,
  validationErrorHandler,
]
const singleDoctorValidator = [doctorIdParamValidator, validationErrorHandler]
const createAdminValidator = [
  adminIdValidator,
  nameValidator,
  emailValidator,
  passwordValidator,
  profileImageValidator,
  validationErrorHandler,
]
const singleAdminValidator = [adminIdParamValidator, validationErrorHandler]
export const userValidators = {
  singleAdminValidator,
  singleDoctorValidator,
  singleStudentValidator,
  createAdminValidator,
  createDoctorValidator,
  createStudentValidator,
}
