import BaseModel from "./base.model.js";

class DroneCommand extends BaseModel {
  static get tableName() {
    return "drone_commands";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'typeCode', 'stateCode', 'timestamp', 'params'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        typeCode: { type: 'integer' },
        stateCode: { type: 'integer' },
        timestamp: { type: 'string', format: 'date-time' },
        params: { type: 'object'}
      },
    }
  }

}

export default DroneCommand;
