import validationErrorHandler from '../middlewares/validationHandler'
import {
  bloodGroupValidator,
  hallNameValidator,
  levelValidator,
  mobileNumberValidator,
  residentValidator,
  serialNoParamValidator,
  sessionValidator,
  studentIdValidator,
  termValidator,
} from './utils.validators'

const createBookletValidator = [
  studentIdValidator,
  mobileNumberValidator,
  levelValidator,
  termValidator,
  residentValidator,
  bloodGroupValidator,
  hallNameValidator,
  sessionValidator,
  validationErrorHandler,
]
const singleBookletValidator = [serialNoParamValidator, validationErrorHandler]
export const bookletValidators = {
  createBookletValidator,
  singleBookletValidator,
}
