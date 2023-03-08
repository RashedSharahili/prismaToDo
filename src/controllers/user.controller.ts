import { prisma } from '../config/db';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User as userModel } from '@prisma/client';
import * as jwt from 'jsonwebtoken'
import * as argon2 from "argon2";

let hash;

// Read Users 
export const getAllUsers = async(req:Request, res:Response) => {

    try {
        
        let user = req.body as userModel

        let users = await prisma.user.findMany({

            where: {
                id: user.id
            },
            select: {
                name: true,
                password: true,
                tasks: {
                    select: {
                        title: true,
                        isCompleted: true
                    }
                }
            }
        })

        if(users) {

            return res.status(200).json(users);
        }
    
        throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}

// Create User
export const createUser = async(req:Request, res:Response) => {
    try {

        let c_user = req.body as userModel

        hash = await argon2.hash(c_user.password)

        // const salt = await bcrypt.genSalt();

    let user = await prisma.user.create({
        data: {
            name: c_user.name,
            email: c_user.email,
            password: hash
        }
    });

    if(user) {

        return res.status(200).json({ message: "user created successfully!" });
    }

    throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}

interface User {
    id: String,
    name: String,
    email: String
}

export const login = async (req:Request, res:Response) => {

    try {

        let l_user = req.body as userModel
        

        let user = await prisma.user.findFirst({
            where: {
                email: l_user.email
            }
        })
        

        if(user) {

            if (await argon2.verify(user.password, l_user.password)) {

                let enToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: "300000ms" })

                // console.log(enToken);

                return res.status(200).json({ message: `Welcome Back ${user.name}`, token: enToken })

            } else {

                return res.status(200).json({ message: "Invalid username or password" })
            }
    
        } else {

            return res.status(200).json({ message: "Invalid username or password" })
        }
        

        throw("there was an error, try again!");

    } catch(err) {

        res.json(err)
    }

}

// export const testToken = (req:Request, res:Response) => {

//     try {

//         let deToken = jwt.verify(enToken, mySecret) as User

//         res.json({ message: deToken });

//     } catch(err) {

//         res.json({ message: "JWT Token Expired" })
//     }
// }

