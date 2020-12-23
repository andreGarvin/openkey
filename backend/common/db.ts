import { createConnection } from 'typeorm';

import { Report } from '../repository/report';
import { Key } from '../repository/key';

export default async () => {
  return await createConnection({
    cache: true,
    type: 'postgres',
    synchronize: true,
    entities: [Key, Report],
    url: process.env.CONNECTION_STRING,
  });
};
