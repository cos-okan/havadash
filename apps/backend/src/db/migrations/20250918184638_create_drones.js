/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('drones', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.string('code').notNullable();
    table.string('serial_number').notNullable();
    table.integer('model_code').unsigned().notNullable().references('code').inTable('prm_drone_models');
    table.integer('state_code').unsigned().notNullable().references('code').inTable('prm_drone_states');
    table.decimal('max_payload_kg').nullable();
    table.decimal('battery_capacity').nullable();
    table.decimal('latitude', 10, 7).nullable();
    table.decimal('longitude', 10, 7).nullable();
    table.decimal('altitude').nullable();
    table.timestamp('last_location_time').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('drones');
};
