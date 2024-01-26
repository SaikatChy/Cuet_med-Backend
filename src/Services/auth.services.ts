import httpStatus from 'http-status'
import ApiError from '../Classes/ApiError'
import prisma from '../Shared/prisma'
import { comparePasswords, generateToken } from './utils.services'

const studentLogin = async (studentId: string, password: string) => {
  const existingStudent = await prisma.student.findUnique({
    where: { studentId },
  })
  if (
    !existingStudent ||
    !comparePasswords(password, existingStudent.password)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials')
  }
  const token = generateToken(existingStudent.studentId, 'student')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pwd, ...others } = existingStudent
  return { ...others, token }
}
const doctorLogin = async (doctorId: string, password: string) => {
  const existingDoctor = await prisma.doctor.findUnique({
    where: { doctorId },
  })
  if (!existingDoctor || !comparePasswords(password, existingDoctor.password)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials')
  }
  const token = generateToken(existingDoctor.doctorId, 'doctor')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pwd, ...others } = existingDoctor
  return { ...others, token }
}
const adminLogin = async (adminId: string, password: string) => {
  const existingAdmin = await prisma.admin.findUnique({
    where: { adminId },
  })
  if (!existingAdmin || !comparePasswords(password, existingAdmin.password)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials')
  }
  const token = generateToken(existingAdmin.adminId, 'admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pwd, ...others } = existingAdmin
  return { ...others, token }
}

export const authServices = { studentLogin, doctorLogin, adminLogin }
