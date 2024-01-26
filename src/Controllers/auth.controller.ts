import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { authServices } from '../Services/auth.services'
import { sendSuccessResponse } from '../Services/response.services'
import catchAsync from '../Shared/catchAsync'

const studentLogin = catchAsync(async (req: Request, res: Response) => {
  const { studentId, password } = req.body
  const data = await authServices.studentLogin(studentId, password)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student loggged in successfully',
    data,
  })
})
const doctorLogin = catchAsync(async (req: Request, res: Response) => {
  const { doctorId, password } = req.body
  console.log({ doctorId, password })
  const data = await authServices.doctorLogin(doctorId, password)

  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor loggged in successfully',
    data,
  })
})
const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { adminId, password } = req.body
  const data = await authServices.adminLogin(adminId, password)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin loggged in successfully',
    data,
  })
})
export const authControllers = { studentLogin, doctorLogin, adminLogin }
