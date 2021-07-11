import knexStringcase from 'knex-stringcase';
import path from 'path';

export const knexConfig = knexStringcase(
  process.env.NODE_ENV !== 'test'
    ? {
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: 'postgres',
          database: 'math_gen',
        },
        migrations: {
          tableName: 'migrations',
          directory: path.join(__dirname, '../../db/migrations'),
        },
      }
    : {
        client: 'sqlite3',
        connection: {
          filename: 'file:memDb1',
        },
        useNullAsDefault: true,
        migrations: {
          tableName: 'migrations',
          directory: path.join(__dirname, '../../db/migrations'),
        },
      },
);
