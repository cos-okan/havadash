/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('drone_commands', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.integer('drone_id').unsigned().notNullable().references('id').inTable('drones');
    table.integer('type_code').unsigned().notNullable().references('code').inTable('prm_command_types');
    table.integer('state_code').unsigned().notNullable().references('code').inTable('prm_command_states');
    table.timestamp('timestamp').notNullable();
    table.json('params').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('drone_commands');
};
