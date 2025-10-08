import BaseModel from "./base.model.js";

class Order extends BaseModel {
  static get tableName() {
    return "orders";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'orderNo', 'customerId', 'deliveryAddressId', 'stateCode', 'orderDate'],
      properties: {
        ...super.jsonSchema.properties,
        customerId: { type: 'integer' },
        deliveryAddressId: { type: 'integer' },
        stateCode: { type: 'integer' },
        orderNo: { type: 'integer' },
        orderDate: { type: 'string', format: 'date-time' },
        weight: { type: ['number', 'null'] },
        notes: { type: 'string' },
      },
    }
  }
}

export default Order;
