export const convertValuesToTrue = (
  inputObject: Record<string, unknown>,
): Record<string, boolean> => {
  const result: Record<string, boolean> = {}

  for (const key in inputObject) {
    result[key] = key !== 'password'
  }

  return result
}
export const studentSelect = {
  studentId: true,
  name: true,
  email: true,
  department: true,
  batch: true,
  profileImage: true,
  role: true,
}
export const adminSelect = {
  adminId: true,
  role: true,
  name: true,
  email: true,
  profileImage: true,
}
export const doctorSelect = {
  doctorId: true,
  name: true,
  email: true,
  designation: true,
  role: true,
  profileImage: true,
}
