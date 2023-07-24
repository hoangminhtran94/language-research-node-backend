const { PrismaClient } = require("@prisma/client");
/**
 * Prisma Client instance.
 * @author: Minh Hoang Tran - Student Number: 041016957
 * @module prisma
 */

/**
 * Global object used to store the Prisma Client instance to make it accessible across the application.
 * @type {object}
 * @global
 */
const globalForPrisma = global;

/**
 * Prisma Client instance that is either retrieved from the global object or created if it doesn't exist.
 * The instance is configured to log only "query" events.
 * @type {PrismaClient}
 */
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

/**
 * Exports the Prisma Client instance for use in other modules.
 * @type {PrismaClient}
 */
module.exports = prisma;
