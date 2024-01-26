import httpStatus from 'http-status'
import ApiError from '../Classes/ApiError'
import prisma from '../Shared/prisma'
import { studentSelect } from '../Shared/utils'
import { userServices } from './user.services'

const createBooklet = async (
  studentId: string,
  mobileNo: string,
  Level: number,
  Term: number,
  bloodGroup: string,
  session: string,
  hallName: string,
  resident: boolean,
) => {
  await userServices.getStudent(studentId)
  const result = await prisma.booklet.create({
    data: {
      studentId,
      mobileNo,
      Level,
      Term,
      bloodGroup,
      session,
      hallName,
      resident,
    },
    include: { student: { select: studentSelect } },
  })
  return result
}
const getBooklet = async (serialNo: number) => {
  const result = await prisma.booklet.findUnique({
    where: { serialNo },
    include: { student: { select: studentSelect } },
  })
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Booklet with this serial number does not exist',
    )
  }
  return result
}
const deleteBooklet = async (serialNo: number) => {
  await getBooklet(serialNo)
  const result = await prisma.booklet.delete({
    where: { serialNo },
    include: { student: { select: studentSelect } },
  })
  return result
}

export const bookletServices = {
  createBooklet,
  getBooklet,
  deleteBooklet,
}
