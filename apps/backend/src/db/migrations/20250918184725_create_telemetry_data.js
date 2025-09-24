/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('telemetry_data', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.integer('drone_id').unsigned().notNullable().references('id').inTable('drones');
    table.integer('flight_id').nullable().references('id').inTable('flights');
    table.decimal('latitude', 10, 7).nullable();
    table.decimal('longitude', 10, 7).nullable();
    table.decimal('altitude').nullable();
    table.decimal('speed').nullable();
    table.decimal('battery_level').nullable();
    table.timestamp('timestamp').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('telemetry_data');
};
