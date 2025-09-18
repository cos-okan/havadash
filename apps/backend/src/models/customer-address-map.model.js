import BaseModel from "./base.model.js";
import { Model } from "objection";

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

  static get relationMappings() {
    return this.lazyRelation(() => ({
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./customer.model.js").then((m) => m.default),
        join: {
          from: "customer_address_maps.customer_id",
          to: "customers.id",
        },
      },
      address: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./address.model.js").then((m) => m.default),
        join: {
          from: "customer_address_maps.address_id",
          to: "addresses.id",
        },
      },
    }));
  }
}

export default CustomerAddressMap;
