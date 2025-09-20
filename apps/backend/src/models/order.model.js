import BaseModel from "./base.model.js";
import { Model } from "objection";

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

  static get relationMappings() {
    return this.lazyRelation(() => ({
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./customer.model.js").then((m) => m.default),
        join: {
          from: "orders.customer_id",
          to: "customers.id",
        },
      },
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./address.model.js").then((m) => m.default),
        join: {
          from: "orders.delivery_address_id",
          to: "addresses.id",
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-order-state.model.js").then((m) => m.default),
        join: {
          from: "orders.state_code",
          to: "prm_order_states.code",
        },
      },
    }));
  }

}

export default Order;
