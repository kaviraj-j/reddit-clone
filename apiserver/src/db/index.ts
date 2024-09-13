import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUsers() {
    const users = await prisma.user.findMany()
    return users
}

export async function createNewUser(user: Prisma.UserCreateInput) {
    const createdUser = await prisma.user.create({
        data: user
    })
    return createdUser;
}

