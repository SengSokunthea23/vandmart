import { PrismaClient } from "@prisma/client";

// Declare a global variable for Prisma in development
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Use existing Prisma client if available (dev hot reloads)
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // optional
    errorFormat: "pretty",
  });

// Only assign in dev, so we reuse Prisma during hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
