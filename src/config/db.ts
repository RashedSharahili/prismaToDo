import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ["query"],
    errorFormat: "minimal"
});

const connectDB = () => {

    try {
        prisma.$connect()
        console.log(`conntected database`);
        
    } catch(err) {

        console.log(err);
        process.exit(1);
        
    }
}

export {connectDB, prisma }