import PrmRepository from "../repositories/prm.repository.js";
import knex from "../db/db.js";

export default class PrmService {
  constructor() {
    this.repository = new PrmRepository(knex);
  }

  async getPrms(queryParams) {
    const tables = queryParams.tables ? queryParams.tables.split(",") : [];
    let targetTables = tables;

    if (!tables || tables.length === 0) {
      targetTables = this.repository.tables;
    }

    const result = {};
    for (const table of targetTables) {
      if (this.repository.tables.includes(table)) {
        result[table] = await this.repository.getTableData(table);
      } else {
        result[table] = [];
      }
    }

    return result;
  }
}
