/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('flights', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.integer('drone_id').unsigned().notNullable().references('id').inTable('drones');
    table.integer('order_id').unsigned().notNullable().references('id').inTable('orders');
    table.integer('state_code').unsigned().notNullable().references('code').inTable('prm_flight_states');
    table.integer('start_address_id').unsigned().notNullable().references('id').inTable('addresses');
    table.timestamp('planned_time').nullable();
    table.timestamp('start_time').nullable();
    table.integer('end_address_id').unsigned().notNullable().references('id').inTable('addresses');
    table.timestamp('end_time').nullable();
    table.decimal('distance').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('flights');
};
