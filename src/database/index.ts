import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Logger } from "drizzle-orm";

import { logger } from "src/tools/logger";

let databaseConnection: NodePgDatabase;

// postgres database connection string
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING as string;

export type DatabaseConnectionType = NodePgDatabase;

class DatabaseLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger().info({ message: "database query", query });
    logger().debug({ message: "database query params", params });
  }
}

export default function connection(
  connectionString?: string
): DatabaseConnectionType {
  if (!connectionString) {
    connectionString = CONNECTION_STRING;
  }

  if (databaseConnection) {
    return databaseConnection;
  }

  databaseConnection = drizzle({
    connection: connectionString,
    logger: new DatabaseLogger(),
  });

  return databaseConnection;
}
