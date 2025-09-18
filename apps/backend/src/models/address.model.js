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
    }));
  }

}

export default Address;
