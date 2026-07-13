import { createConnection, Connection } from "typeorm";

// entities
import { Report } from 'src/database/repositories/report';
import { Key } from 'src/database/repositories/key';

async function connection(connectionString?: string): Promise<Connection> {
  return createConnection({
    cache: true,
    type: 'postgres',
    synchronize: true,
    entities: [Key, Report],
    url: process.env.CONNECTION_STRING,
    extra: {
      rejectUnauthorized: false,
    },
  });
};


export default connection;
