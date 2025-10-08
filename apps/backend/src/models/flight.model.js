import BaseModel from "./base.model.js";

class Flight extends BaseModel {
  static get tableName() {
    return "flights";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'orderId', 'stateCode', 'startAddressId', 'endAddressId'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        orderId: { type: 'integer' },
        stateCode: { type: 'integer' },
        startAddressId: { type: 'integer' },
        plannedTime: { type: ['string', 'null'], format: 'date-time' },
        startTime: { type: ['string', 'null'], format: 'date-time' },
        endAddressId: { type: 'integer' },
        endTime: { type: ['string', 'null'], format: 'date-time' },
        distance: { type: ['number', 'null'] },
      },
    }
  }
}

export default Flight;
