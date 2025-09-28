import BaseModel from "./base.model.js";
import { Model } from "objection";

class Address extends BaseModel {
  static get tableName() {
    return "addresses";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'name', 'addressLine', 'cityId', 'latitude', 'longitude'],
      properties: {
        ...super.jsonSchema.properties,
        name: { type: 'string' },
        addressLine: { type: 'string' },
        cityId: { type: 'integer' },
        zipCode: { type: 'integer' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./city.model.js").then((m) => m.default),
        join: {
          from: "addresses.city_id",
          to: "cities.id",
        },
      },

      customerAddressMap: {
        relation: Model.HasOneRelation,
        modelClass: () =>
          import("./customer-address-map.model.js").then((m) => m.default),
        join: {
          from: "addresses.id",
          to: "customer_address_maps.address_id",
        },
      },

      customer: {
        relation: Model.ManyToManyRelation,
        modelClass: () =>
          import("./customer.model.js").then((m) => m.default),
        join: {
          from: "addresses.id",
          through: {
            from: 'customer_address_maps.address_id',
            to: 'customer_address_maps.customer_id',
          },
          to: "customers.id",
        },
      }
    }));
  }

}

export default Address;
