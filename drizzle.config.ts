import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_CONNECTION_STRING as string;

export default defineConfig({
  out: "./migrations",
  dialect: "postgresql",
  schema: "./src/database/repositories/**.ts",
  dbCredentials: {
    url: connectionString,
  },
  migrations: {
    prefix: "timestamp",
  },
});
