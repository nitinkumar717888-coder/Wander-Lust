/**
 * Prisma Client singleton for Next.js
 *
 * In development, Hot Module Replacement (HMR) causes the module
 * to be re-evaluated on each change, which would create many new
 * PrismaClient instances and exhaust the database connection pool.
 *
 * The global singleton pattern prevents this in development while
 * still allowing proper instantiation in production.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
