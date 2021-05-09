import { getConnection } from 'typeorm';

// entities
import { Report } from '../../repository/report';
import { Key } from '../../repository/key';

// this query makes a select statement on all the tables to check if the service can query the database
export default async (): Promise<[Key, Report]> => {
  const db = getConnection().createQueryBuilder();

  return Promise.all([
    db.select('keys.id').from(Key, 'keys').getOne(),
    db.select('reports.id').from(Report, 'reports').getOne(),
  ]);
};
