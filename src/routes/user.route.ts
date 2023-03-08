import { createUser, getAllUsers, login } from '../controllers/user.controller';
import express from 'express'
import validate from '../middleware/validate'
import { createUserSchema, loginSchema } from '../schema.zod/user.zod';
let router = express.Router()

// read
router.get('/', getAllUsers);

// test token
// router.get('/token', testToken)

// login user
router.post('/login', validate(loginSchema), login);

// create 
router.post('/', validate(createUserSchema), createUser)

export default router;