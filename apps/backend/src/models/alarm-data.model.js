import BaseModel from "./base.model.js";

class AlarmData extends BaseModel {
  static get tableName() {
    return "alarm_data";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'typeCode', 'severityCode', 'timestamp'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        flightId: { type: ['integer', 'null'] },
        typeCode: { type: 'integer' },
        severityCode: { type: 'integer' },
        latitude: { type: ['number', 'null'] },
        longitude: { type: ['number', 'null'] },
        altitude: { type: ['number', 'null'] },
        message: { type: ['string', 'null'] },
        timestamp: { type: 'string', format: 'date-time' },
      },
    }
  }
}

export default AlarmData;
