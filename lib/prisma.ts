import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  return new PrismaClient({
    adapter,
  });
}

let prismaClient = globalForPrisma.prisma ?? createPrismaClient();

// Recover when the dev server cached a client from before new models were generated.
if (process.env.NODE_ENV !== "production" && !("cart" in prismaClient)) {
  prismaClient = createPrismaClient();
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

export const prisma = prismaClient;