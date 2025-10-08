import BaseModel from "./base.model.js";

class FlightLocation extends BaseModel {
  static get tableName() {
    return "flight_locations";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'flightId', 'latitude', 'longitude', 'altitude', 'timestamp'],
      properties: {
        ...super.jsonSchema.properties,
        flightId: { type: 'integer' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        altitude: { type: 'number' },
        timestamp: { type: ['string', 'null'], format: 'date-time' },
      },
    }
  }

}

export default FlightLocation;
