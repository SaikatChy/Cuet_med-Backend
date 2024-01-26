import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Roles } from '../Interfaces/utils.interface'
import config from '../config'

export const hashPassword = (password: string): string => {
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(config.saltRounds as string),
  )
  return hashedPassword
}

export const comparePasswords = (
  password: string,
  hashedPassword: string,
): boolean => {
  const match = bcrypt.compareSync(password, hashedPassword)
  return match
}
export const generateToken = (id: string, role: Roles) => {
  const token = jwt.sign({ id, role }, config.jwtSecret as string, {
    expiresIn: '1y',
  })
  return token
}
export const getCurrentDate = () => {
  const today: Date = new Date()
  const year: number = today.getFullYear()
  const month: number = today.getMonth() + 1
  const day: number = today.getDate()

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`
  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`

  return formattedDate
}
