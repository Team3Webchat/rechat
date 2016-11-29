import { Router } from 'express'

import { search } from '../../lib/search'

const searchRouter = Router()

searchRouter.route('/')
  .post((req, res, next) => search(req, res, next, 'Successful Search'))



export default searchRouter
