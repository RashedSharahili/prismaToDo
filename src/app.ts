import express,{Application, Request, Response} from 'express';
const app:Application = express();
import { PrismaClient, Task, User } from '@prisma/client'
import routes from './routes/routes'
const prisma = new PrismaClient()
import * as dotenv from 'dotenv'
dotenv.config()
let port = process.env.PORT || 3003;

app.use(express.json());

var multer = require('multer');
var upload = multer();
// for parsing multipart/form-data
app.use(upload.array()); 
// app.use(express.static('public'));
app.use('/', routes);

// app.get('/token', (req:Request, res:Response) => {

//     try {

//         let deToken = jwt.verify(enToken, mySecret) as User

//         res.json({ message: deToken });

//     } catch(err) {

//         res.json({ message: "JWT Token Expired" })
//     }
// })



app.listen(port,()=>console.log(`express started on port ${port}`));