"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const db_1 = require("../config/db");
// Read Tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = req.body;
        let tasks = yield db_1.prisma.task.findMany({
            where: {
                userId: task.userId
            },
            select: {
                title: true,
                isCompleted: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (tasks) {
            return res.status(200).json(tasks);
        }
        throw ("there was an error, try again!");
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getAllTasks = getAllTasks;
// CREATE
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let c_task = req.body;
        let task = yield db_1.prisma.task.create({
            data: {
                title: c_task.title,
                userId: c_task.userId
            }
        });
        if (task) {
            return res.status(200).json({ message: "task created successfully!" });
        }
        throw ("there was an error, try again!");
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.createTask = createTask;
// UPDATE
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let u_task = req.body;
    let { id } = req.params;
    let task = yield db_1.prisma.task.updateMany({
        where: {
            id: id,
            userId: u_task.userId
        },
        data: {
            title: u_task.title,
            isCompleted: u_task.isCompleted
        }
    });
    if (task.count == 0) {
        res.status(200).json({ message: "No task updated" });
    }
    else {
        return res.status(200).json({ message: "task updated successfully!" });
    }
    throw ("there was an error, try again!");
});
exports.updateTask = updateTask;
// DELETE
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let d_task = req.body;
    let { id } = req.params;
    let task = yield db_1.prisma.task.deleteMany({
        where: {
            id: id,
            userId: d_task.userId
        }
    });
    if (task.count == 0) {
        res.status(200).json({ message: "No task deleted" });
    }
    else {
        return res.status(200).json({ message: "task deleted successfully!" });
    }
    throw ("there was an error, try again!");
});
exports.deleteTask = deleteTask;
