"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_controller_1 = require("../controllers/task.controller");
const express_1 = __importDefault(require("express"));
// import validate from '../middleware/vialdate'
// import { createStudentSchema } from '../schema.zod/student.zod';
let router = express_1.default.Router();
// read
router.get('/', task_controller_1.getAllTasks);
// create 
router.post('/', task_controller_1.createTask);
// update
router.put('/updateTask/:id', task_controller_1.updateTask);
// delete
router.delete('/deleteTask/:id', task_controller_1.deleteTask);
exports.default = router;
