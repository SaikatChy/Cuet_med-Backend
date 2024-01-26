import { Admin, Doctor, Student } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../Classes/ApiError'
import prisma from '../Shared/prisma'
import { adminSelect, doctorSelect, studentSelect } from '../Shared/utils'

const createStudent = async (data: Student) => {
  const result = await prisma.student.create({ data, select: studentSelect })
  return result
}
const getAllStudent = async () => await prisma.student.findMany({})
const getStudent = async (studentId: string) => {
  const result = await prisma.student.findUnique({
    where: { studentId },
    select: studentSelect,
  })
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student with this id does not exist',
    )
  }
  return result
}
const deleteStudent = async (studentId: string) => {
  await getStudent(studentId)
  const result = await prisma.student.delete({
    where: { studentId },
    select: studentSelect,
  })
  return result
}
const createAdmin = async (data: Admin) => {
  const isAdmin = await prisma.admin.count({})
  if (isAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is a admin already')
  }
  const result = await prisma.admin.create({ data, select: adminSelect })
  return result
}
const getAdmin = async () => {
  const existingAdmin = await prisma.admin.findFirst({})
  if (!existingAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is no admin')
  }
  return existingAdmin
}
const updateAdmin = async (data: Partial<Admin>) => {
  const existingAdmin = await getAdmin()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, adminId, ...others } = data
  const result = await prisma.admin.update({
    where: { adminId: existingAdmin.adminId },
    data: others,
    select: adminSelect,
  })
  return result
}
const createDoctor = async (data: Doctor) => {
  const result = await prisma.doctor.create({
    data,
    select: doctorSelect,
  })
  return result
}
const getAllDoctor = async () => await prisma.doctor.findMany({})
const getDoctor = async (doctorId: string) => {
  const result = await prisma.doctor.findUnique({
    where: { doctorId },
    select: doctorSelect,
  })
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Doctor with this id does not exist',
    )
  }
  return result
}
const updateDoctor = async (doctorId: string, data: Partial<Doctor>) => {
  await getDoctor(doctorId)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, doctorId: id, ...others } = data
  const result = await prisma.doctor.update({
    where: { doctorId },
    data: others,
    select: doctorSelect,
  })
  return result
}
const updateStudent = async (studentId: string, data: Partial<Student>) => {
  await getStudent(studentId)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, studentId: id, ...others } = data
  const result = await prisma.student.update({
    where: { studentId },
    data: others,
    select: studentSelect,
  })
  return result
}
const deleteDoctor = async (doctorId: string) => {
  await getDoctor(doctorId)
  const result = await prisma.doctor.delete({
    where: { doctorId },
    select: doctorSelect,
  })
  return result
}
export const userServices = {
  createStudent,
  deleteStudent,
  getStudent,
  createAdmin,
  updateAdmin,
  createDoctor,
  deleteDoctor,
  updateDoctor,
  getDoctor,
  getAllStudent,
  getAllDoctor,
  updateStudent,
}
