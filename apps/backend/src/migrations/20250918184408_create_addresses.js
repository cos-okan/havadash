/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('addresses', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('address_line').notNullable();
    table.integer('city_id').unsigned().notNullable().references('id').inTable('cities');
    table.integer('zip_code').nullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('addresses');
};
