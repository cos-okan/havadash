/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('prm_command_types', function (table) {
    table.integer('code').notNullable().unique();
    table.integer('value_type').notNullable();
    table.string('value').notNullable();
    table.string('description').nullable();
    table.boolean('is_active').defaultTo(true);
    table.integer('order').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('prm_command_types');
};
