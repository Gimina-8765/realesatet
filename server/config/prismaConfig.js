import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma }; // Add named export
export default prisma;
