
export default class PrmRepository {
  constructor(knex) {
    this.knex = knex;

    this.tables = [
      "prm_user_roles",
      "prm_order_states",
      "prm_drone_states",
      "prm_drone_models",
      "prm_flight_states",
      "prm_command_types",
      "prm_command_states",
      "prm_alarm_types",
      "prm_alarm_severities",
    ];
  }

  async getTableData(tableName) {
    return this.knex(tableName).select("*");
  }
}
