import { Doctor, Student } from '@prisma/client'
import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../Services/response.services'
import { userServices } from '../Services/user.services'
import { hashPassword } from '../Services/utils.services'
import catchAsync from '../Shared/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, ...others } = req.body
  const data = await userServices.createStudent({
    ...others,
    password: hashPassword(password),
    role: 'student',
  })
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const data = await userServices.deleteStudent(studentId)
  sendSuccessResponse<Omit<Student, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data,
  })
})
const getStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const data = await userServices.getStudent(studentId)
  sendSuccessResponse<Omit<Student, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retreived successfully',
    data,
  })
})
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const data = await userServices.getAllStudent()
  sendSuccessResponse<Omit<Student, 'password'>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retreived successfully',
    data,
  })
})
const createDoctor: RequestHandler = catchAsync(async (req, res) => {
  const { password, ...others } = req.body
  console.log(req.body)
  const data = await userServices.createDoctor({
    ...others,
    password: hashPassword(password),
    role: 'doctor',
  })
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor created successfully',
    data,
  })
})
const getDoctor: RequestHandler = catchAsync(async (req, res) => {
  const { doctorId } = req.params
  const data = await userServices.getDoctor(doctorId)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor retreived successfully',
    data,
  })
})
const getAllDoctor: RequestHandler = catchAsync(async (req, res) => {
  const data = await userServices.getAllDoctor()
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctors retreived successfully',
    data,
  })
})
const updateDoctor: RequestHandler = catchAsync(async (req, res) => {
  const { doctorId } = req.params

  const data = await userServices.updateDoctor(doctorId, req.body)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor updated successfully',
    data,
  })
})
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params

  const data = await userServices.updateStudent(studentId, req.body)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data,
  })
})
const deleteDoctor: RequestHandler = catchAsync(async (req, res) => {
  const { doctorId } = req.params
  const data = await userServices.deleteDoctor(doctorId)
  sendSuccessResponse<Omit<Doctor, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor deleted successfully',
    data,
  })
})
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, ...others } = req.body
  const data = await userServices.createAdmin({
    ...others,
    password: hashPassword(password),
    role: 'admin',
  })
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data,
  })
})
const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const data = await userServices.updateAdmin(req.body)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data,
  })
})
export const userControllers = {
  createStudent,
  deleteStudent,
  getStudent,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  createAdmin,
  updateAdmin,
  getDoctor,
  getAllStudent,
  getAllDoctor,
  updateStudent,
}
