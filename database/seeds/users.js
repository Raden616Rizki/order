/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const users = require('./data/users.json');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  // Inserts seed entries
  await knex('users').insert(users);
};
