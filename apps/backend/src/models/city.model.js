import BaseModel from "./base.model.js";
import { Model } from "objection";

class City extends BaseModel {
  static get tableName() {
    return "cities";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'countryId', 'name'],
      properties: {
        ...super.jsonSchema.properties,
        countryId: { type: 'integer' },
        name: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./country.model.js").then((m) => m.default),
        join: {
          from: "cities.country_id",
          to: "countries.id",
        },
      },
      addresses: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./address.model.js").then((m) => m.default),
        join: {
          from: "cities.id",
          to: "addresses.city_id",
        },
      },
    }));
  }

}

export default City;
