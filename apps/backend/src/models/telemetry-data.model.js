import BaseModel from "./base.model.js";

class TelemetryData extends BaseModel {
  static get tableName() {
    return "telemetry_data";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'timestamp'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        flightId: { type: ['integer', 'null'] },
        latitude: { type: ['number', 'null'] },
        longitude: { type: ['number', 'null'] },
        altitude: { type: ['number', 'null'] },
        speed: { type: ['number', 'null'] },
        batteryLevel: { type: ['number', 'null'] },
        timestamp: { type: 'string', format: 'date-time' },
      },
    }
  }

}

export default TelemetryData;
