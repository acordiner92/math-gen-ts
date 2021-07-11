/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('topic', table => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('identifier').notNullable();
    table.boolean('is_deleted').notNullable();
    table.date('created_at').notNullable();
    table.date('updated_at').notNullable();
  });
}

export async function down(): Promise<void> {}
