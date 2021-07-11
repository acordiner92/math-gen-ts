/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import fs from 'fs';
import Knex from 'knex';
import { knexConfig } from '../../src/data/knex.config';

export default async (): Promise<void> => {
  const knex = Knex(knexConfig);
  await knex.destroy();
  fs.unlinkSync('./file:memDb1');
};
