import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = process.env.NODE_ENV === "test"
    ? `${process.env.TEST_DATABASE_URL}`
    : `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({
    connectionString,
    ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });
export { prisma };
//# sourceMappingURL=client.js.map