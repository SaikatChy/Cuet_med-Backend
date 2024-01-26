import express from 'express'
import { prescriptionControllers } from '../Controllers/prescription.controller'
import { prescriptionValidators } from '../Validators/prescription.validators'
const prescriptionRoutes = express.Router()
prescriptionRoutes.post(
  '/',
  prescriptionValidators.createPrescriptionValidator,
  prescriptionControllers.createPrescription,
)
prescriptionRoutes.get(
  '/:prescriptionId',
  prescriptionValidators.singlePrescriptionValidator,
  prescriptionControllers.getPrescription,
)
prescriptionRoutes.delete(
  '/:prescriptionId',
  prescriptionValidators.singlePrescriptionValidator,
  prescriptionControllers.deletePrescription,
)
prescriptionRoutes.patch(
  '/:prescriptionId',
  prescriptionValidators.singlePrescriptionValidator,
  prescriptionControllers.addMedicine,
)
prescriptionRoutes.get(
  '/student-prescriptions/:serialNo',
  prescriptionValidators.getAllPrescriptionsOfStudentValidator,
  prescriptionControllers.getAllPrescriptionsOfStudent,
)
prescriptionRoutes.get(
  '/doctor-prescriptions/:doctorId',
  prescriptionValidators.getAllPrescriptionsOfDoctorValidator,
  prescriptionControllers.getAllPrescriptionsOfDoctor,
)
export default prescriptionRoutes
