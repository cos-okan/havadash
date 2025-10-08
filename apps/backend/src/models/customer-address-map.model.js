import BaseModel from "./base.model.js";

class CustomerAddressMap extends BaseModel {
  static get tableName() {
    return "customer_address_maps";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'customerId', 'addressId'],
      properties: {
        ...super.jsonSchema.properties,
        customerId: { type: 'integer' },
        addressId: { type: 'integer' },
      },
    }
  }

}

export default CustomerAddressMap;
