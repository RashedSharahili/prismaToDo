import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/task.controller';
import express from 'express'
import validate from '../middleware/validate'
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from '../schema.zod/task.zod';
import auth from '../middleware/auth'
let router = express.Router()

// read
router.get('/', auth, getAllTasks);

// create 
router.post('/', auth, validate(createTaskSchema), createTask);

// update
router.put('/updateTask/:id', auth, validate(updateTaskSchema), updateTask);

// delete
router.delete('/deleteTask/:id', auth, validate(deleteTaskSchema),deleteTask);

export default router;