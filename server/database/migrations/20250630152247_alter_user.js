/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE users 
    ADD COLUMN email_verification_status TEXT DEFAULT 'NOTVERIFIED',
    ADD CONSTRAINT email_verification_status_check 
    CHECK (email_verification_status IN ('NOTVERIFIED', 'VERIFIED', 'pending'))
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE users 
    DROP COLUMN email_verification_status
  `);
};
