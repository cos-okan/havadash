import BaseModel from "./base.model.js";

class Customer extends BaseModel {
  static get tableName() {
    return "customers";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'name', 'phoneNumber'],
      properties: {
        ...super.jsonSchema.properties,
        name: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: ['string', 'null'] },
      },
    }
  }
}

export default Customer;
