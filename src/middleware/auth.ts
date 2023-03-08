import {Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'

interface User {
    id: String,
    name: String,
    email: String
}

const auth = (req:Request, res:Response, next:NextFunction) => {

    try {

        let token = req.headers.authorization;
    if(!token) {

        return res.status(403).json({ message: "your are not authorized" });
    }

    const user = jwt.verify(token, process.env.TOKEN_SECRET as string) as User

    console.log(user);

    res.locals.user = user

    next();

    } catch(err) {

        res.json(err);
    }
}

export default auth;