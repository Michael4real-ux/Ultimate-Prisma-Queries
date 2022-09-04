import {PrismaClient} from '@prisma/client';

declare global {
    var prisma:PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient({ log: ['info'] });

if(process.env.NODE_ENV !== 'production'){
  global.prisma = prisma
}

async function connectDB(){
    try{
        await prisma.$connect();
        console.log('🚀 Database connected successfully')
    } catch(err){
        console.log(err)
        await prisma.$disconnect();
        process.exit(1);     
    } finally{
        await prisma.$disconnect();
    }
}

export default connectDB