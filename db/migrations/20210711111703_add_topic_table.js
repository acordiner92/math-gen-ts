/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-mutation */

exports.up = function (knex) {
  return knex.schema.createTable('topic', table => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('identifier').notNullable();
    table.boolean('is_deleted').notNullable();
    table.date('created_at').notNullable();
    table.date('updated_at').notNullable();
  });
};

exports.down = function (_knex) {};
