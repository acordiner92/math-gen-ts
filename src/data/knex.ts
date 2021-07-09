import Knex from 'knex';
import knexStringcase from 'knex-stringcase';

const options = knexStringcase({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'math_gen',
  },
});
export const knex = Knex(options);
