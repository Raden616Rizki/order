/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('books_users', (table) => {
    table.increments('id').primary();
    table.integer('book_id').unsigned().notNullable()
      .references('id').inTable('books')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('quantity').notNullable().defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('books_users');
};
