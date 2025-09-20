/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('orders', function (table) {
    table.increments('id').primary();
    table.integer('status').notNullable();
    table.integer('created_by').notNullable();
    table.integer('updated_by').nullable();
    table.timestamps(true, true);
    table.integer('customer_id').unsigned().notNullable().references('id').inTable('customers');
    table.integer('delivery_address_id').unsigned().notNullable().references('id').inTable('addresses');
    table.integer('state_code').unsigned().notNullable().references('code').inTable('prm_order_states');
    table.integer('order_no').notNullable().unique();
    table.timestamp('order_date').notNullable();
    table.string('weight').nullable();
    table.text('notes').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('orders');
};
