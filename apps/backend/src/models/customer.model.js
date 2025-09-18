import BaseModel from "./base.model.js";
import { Model } from "objection";

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

  static get relationMappings() {
    return this.lazyRelation(() => ({
      customerAddresses: {
        relation: Model.ManyToManyRelation,
        modelClass: () =>
          import("./address.model.js").then((m) => m.default),
        join: {
          from: "customers.id",
          through: {
            from: 'customer_address_map.customer_id',
            to: 'customer_address_map.address_id',
          },
          to: "address.id",
        },
      },
    }));
  }

}

export default Customer;
