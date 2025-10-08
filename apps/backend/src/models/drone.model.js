import BaseModel from "./base.model.js";

class Drone extends BaseModel {
  static get tableName() {
    return "drones";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'code', 'serialNumber', 'modelCode', 'stateCode'],
      properties: {
        ...super.jsonSchema.properties,
        code: { type: 'string' },
        serialNumber: { type: 'string' },
        modelCode: { type: 'integer' },
        stateCode: { type: 'integer' },
        maxPayloadKg: { type: ['number', 'null'] },
        batteryCapacity: { type: ['number', 'null'] },
        latitude: { type: ['number', 'null'] },
        longitude: { type: ['number', 'null'] },
        altitude: { type: ['number', 'null'] },
        lastLocationTime: { type: ['string', 'null'], format: 'date-time' },
      },
    }
  }

}

export default Drone;
