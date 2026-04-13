"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
var client_js_1 = require("../generated/prisma/client.js");
var connectionString = "".concat(process.env.DATABASE_URL);
var adapter = new adapter_pg_1.PrismaPg({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});
var prisma = new client_js_1.PrismaClient({ adapter: adapter });
exports.prisma = prisma;
