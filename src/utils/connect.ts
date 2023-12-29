import { PrismaClient } from '@prisma/client'

// creates a singleton instance of prisma client to prevent multiple instances of prisma client being created during hot reloads
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma