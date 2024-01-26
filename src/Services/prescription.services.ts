import { Prescription_medicine } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../Classes/ApiError'
import { Medicine } from '../Interfaces/medicine.interface'
import prisma from '../Shared/prisma'
import { doctorSelect, studentSelect } from '../Shared/utils'
import { bookletServices } from './booklet.services'
import { userServices } from './user.services'
import { getCurrentDate } from './utils.services'

const createPrescription = async (
  bookletId: number,
  doctorId: string,
  medicines: Medicine[],
  description?: string,
) => {
  await bookletServices.getBooklet(bookletId)
  await userServices.getDoctor(doctorId)
  const transactionResult = await prisma.$transaction(async tx => {
    const newPrescription = await tx.prescription.create({
      data: {
        bookletId,
        doctorId,
        date: getCurrentDate(),
        description: description || '',
      },
      include: {
        doctor: { select: doctorSelect },
        booklet: {
          select: {
            student: { select: studentSelect },
            bloodGroup: true,
            hallName: true,
            mobileNo: true,
            Level: true,
            Term: true,
            resident: true,
            session: true,
          },
        },
      },
    })
    if (!newPrescription) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Prescription creation failed')
    }
    const results: Prescription_medicine[] = []
    for (const medicine of medicines) {
      const { name, dose } = medicine
      const newMedicine = await tx.prescription_medicine.create({
        data: { prescriptionId: newPrescription.prescriptionId, name, dose },
      })
      if (!newMedicine) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Prescription creation failed',
        )
      }
      results.push(newMedicine)
    }
    return { prescription: newPrescription, medicines: results }
  })
  return transactionResult
}
const getPrescription = async (prescriptionId: string) => {
  const result = await prisma.prescription.findUnique({
    where: { prescriptionId },
    include: {
      doctor: { select: doctorSelect },
      booklet: {
        select: {
          student: { select: studentSelect },
          bloodGroup: true,
          hallName: true,
          mobileNo: true,
          Level: true,
          Term: true,
          resident: true,
          session: true,
        },
      },
      Prescription_medicine: true,
    },
  })
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Prescription with this id does not exist',
    )
  }
  return result
}
const addMedicine = async (
  prescriptionId: string,
  medicines: Medicine[] = [],
) => {
  await getPrescription(prescriptionId)
  const transactionResult = await prisma.$transaction(async tx => {
    const results: Prescription_medicine[] = []
    for (const medicine of medicines) {
      const { name, dose } = medicine
      const updatedMedicine = await tx.prescription_medicine.upsert({
        where: { prescriptionId_name: { prescriptionId, name } },
        update: {
          name,
          dose,
        },
        create: {
          name,
          dose,
          prescriptionId,
        },
      })
      if (!updatedMedicine) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Prescription update failed')
      }
      results.push(updatedMedicine)
    }
    return results
  })
  return transactionResult
}
const deletePrescription = async (prescriptionId: string) => {
  await getPrescription(prescriptionId)
  const transactionResult = await prisma.$transaction(async tx => {
    const deletedMedicines = await tx.prescription_medicine.deleteMany({
      where: { prescriptionId },
    })
    if (!deletedMedicines) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Prescription deletion failed')
    }
    const deletedPrescription = await tx.prescription.delete({
      where: { prescriptionId },
      include: {
        doctor: { select: doctorSelect },
        booklet: {
          select: {
            student: { select: studentSelect },
            bloodGroup: true,
            hallName: true,
            mobileNo: true,
            Level: true,
            Term: true,
            resident: true,
            session: true,
          },
        },
      },
    })
    return deletedPrescription
  })
  return transactionResult
}
const getAllPrescriptionsOfStudent = async (serialNo: number) => {
  await bookletServices.getBooklet(serialNo)
  const result = await prisma.prescription.findMany({
    where: { bookletId: serialNo },
    include: {
      Prescription_medicine: true,
    },
  })
  return result
}
const getAllPrescriptionsOfDoctor = async (doctorId: string) => {
  await userServices.getDoctor(doctorId)
  const result = await prisma.prescription.findMany({
    where: { doctorId },
    include: {
      Prescription_medicine: true,
    },
  })
  return result
}
export const prescriptionServices = {
  createPrescription,
  getPrescription,
  addMedicine,
  deletePrescription,
  getAllPrescriptionsOfStudent,
  getAllPrescriptionsOfDoctor,
}
