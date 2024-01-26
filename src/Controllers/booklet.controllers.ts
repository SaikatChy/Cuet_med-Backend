import { Booklet } from '@prisma/client'
import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { bookletServices } from '../Services/booklet.services'
import { sendSuccessResponse } from '../Services/response.services'
import catchAsync from '../Shared/catchAsync'

const createBooklet: RequestHandler = catchAsync(async (req, res) => {
  const {
    studentId,
    mobileNo,
    Level,
    Term,
    resident,
    bloodGroup,
    hallName,
    session,
  } = req.body
  const data = await bookletServices.createBooklet(
    studentId,
    mobileNo,
    Level,
    Term,
    bloodGroup,
    session,
    hallName,
    resident,
  )
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booklet created successfully',
    data,
  })
})
const getBooklet = catchAsync(async (req, res) => {
  const { serialNo } = req.params
  const data = await bookletServices.getBooklet(Number(serialNo))
  sendSuccessResponse<Booklet>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booklet found successfully',
    data,
  })
})
const deleteBooklet = catchAsync(async (req, res) => {
  const { serialNo } = req.params
  const data = await bookletServices.deleteBooklet(Number(serialNo))
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booklet deleted successfully',
    data,
  })
})

export const bookletControllers = { createBooklet, getBooklet, deleteBooklet }
