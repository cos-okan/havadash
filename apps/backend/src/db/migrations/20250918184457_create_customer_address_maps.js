/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('customer_address_maps', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.integer('customer_id').unsigned().notNullable().references('id').inTable('customers');
    table.integer('address_id').unsigned().notNullable().references('id').inTable('addresses');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('customer_address_maps');
};
