import { PrismaClient } from "./generated/prisma";
export  { Role } from "./generated/prisma";

const prisma = new PrismaClient();

export default prisma;