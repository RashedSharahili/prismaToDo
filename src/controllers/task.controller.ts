import { prisma } from '../config/db';
import {Request, Response} from 'express';
import { Task } from '@prisma/client';

// Read Tasks
export const getAllTasks = async(req:Request, res:Response) => {

    try {

        let task = req.body as Task
        

        let tasks = await prisma.task.findMany({
            where: {
                userId: res.locals.user.id
            },
            select: {
                id: true,
                title: true,
                isCompleted: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(tasks) {

            return res.status(200).json(tasks);
        }
    
        throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}

// CREATE
export const createTask = async(req:Request, res:Response) => {

    try {

        let c_task = req.body as Task

        let task = await prisma.task.create({
            data: {
                title: c_task.title,
                userId: res.locals.user.id
            }
        })

        if(task) {

            return res.status(200).json({ message: "task created successfully!" });
        }
    
        throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}

// UPDATE
export const updateTask = async(req:Request, res:Response) => {
    
    let u_task = req.body as Task

    let { id } = req.params

    let task = await prisma.task.updateMany({
        where: {
            id: id,
            userId: res.locals.user.id
        },
        data: {
            title: u_task.title,
            isCompleted: u_task.isCompleted
        }
    })

    if(task.count == 0) {

        res.status(200).json({ message: "No task updated" });

    } else {

        return res.status(200).json({ message: "task updated successfully!" });
    }

    throw("there was an error, try again!");
}

// DELETE
export const deleteTask = async(req:Request, res:Response) => {
    
    let d_task = req.body as Task

    let { id } = req.params

    let task = await prisma.task.deleteMany({
        where: {
            id: id,
            userId: res.locals.user.id
        }
    })

    if(task.count == 0) {

        res.status(200).json({ message: "No task deleted" });

    } else {

        return res.status(200).json({ message: "task deleted successfully!" });
    }

    throw("there was an error, try again!");
}