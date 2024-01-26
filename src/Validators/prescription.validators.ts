import validationErrorHandler from '../middlewares/validationHandler'
import {
  descriptionValidator,
  doctorIdParamValidator,
  doctorIdValidator,
  medicinesValidator,
  serialNoParamValidator,
  uuidValidator,
} from './utils.validators'

const createPrescriptionValidator = [
  uuidValidator('bookletId'),
  doctorIdValidator,
  ...medicinesValidator,
  descriptionValidator,
  validationErrorHandler,
]
const singlePrescriptionValidator = [
  uuidValidator('prescriptionId', false),
  validationErrorHandler,
]

const addMedicineValidator = [
  uuidValidator('prescriptionId', false),
  ...medicinesValidator,
  validationErrorHandler,
]
const getAllPrescriptionsOfStudentValidator = [
  serialNoParamValidator,
  validationErrorHandler,
]
const getAllPrescriptionsOfDoctorValidator = [
  doctorIdParamValidator,
  validationErrorHandler,
]
export const prescriptionValidators = {
  createPrescriptionValidator,
  singlePrescriptionValidator,
  addMedicineValidator,
  getAllPrescriptionsOfDoctorValidator,
  getAllPrescriptionsOfStudentValidator,
}
