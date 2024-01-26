import express from 'express'
import { bookletControllers } from '../Controllers/booklet.controllers'
import { bookletValidators } from '../Validators/booklet.validators'
const bookletRoutes = express.Router()
bookletRoutes.post(
  '/',
  bookletValidators.createBookletValidator,
  bookletControllers.createBooklet,
)
bookletRoutes.get(
  '/:serialNo',
  bookletValidators.singleBookletValidator,
  bookletControllers.getBooklet,
)
bookletRoutes.delete(
  '/:serialNo',
  bookletValidators.singleBookletValidator,
  bookletControllers.deleteBooklet,
)
export default bookletRoutes
