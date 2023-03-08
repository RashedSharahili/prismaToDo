import express from 'express'
import userRouter from '../routes/user.route'
import taskRouter from '../routes/task.route'
let router = express.Router()

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

export default router;