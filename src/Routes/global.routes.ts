import express from 'express'
import adminRoutes from './admin.routes'
import authRoutes from './auth.routes'
import bookletRoutes from './booklet.routes'
import doctorRoutes from './doctor.routes'
import prescriptionRoutes from './prescription.routes'
import studentRoutes from './student.routes'

const globalRoutes = express.Router()
const moduleRoutes = [
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/doctor',
    route: doctorRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/booklet',
    route: bookletRoutes,
  },
  {
    path: '/prescription',
    route: prescriptionRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
]
moduleRoutes.forEach(route => globalRoutes.use(route.path, route.route))
export default globalRoutes
