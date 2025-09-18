import { Model, snakeCaseMappers } from "objection";

class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["status", "createdBy"],
      properties: {
        id: { type: "integer" },
        status: { type: "integer", default: 1 },
        createdBy: { type: "integer" },
        updatedBy: { type: ["integer", "null"] },
        createdAt: { type: "string" },
        updatedAt: { type: ["string", "null"] },
      },
    };
  }

  static lazyRelation(fn) {
    return fn();
  }

  async $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  async $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default BaseModel;
