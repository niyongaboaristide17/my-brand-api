import express from 'express'
import { UserController } from '../../controllers/userController'

const route = express.Router()

route.get('/', new UserController().getAllUsers)

route.post('/', new UserController().createUser)

route.get('/:id', new UserController().getUser)

export default route