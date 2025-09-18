import BaseModel from "./base.model.js";
import { Model } from "objection";

class Country extends BaseModel {
  static get tableName() {
    return "countries";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'name'],
      properties: {
        ...super.jsonSchema.properties,
        name: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      cities: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./city.model.js").then((m) => m.default),
        join: {
          from: "countries.id",
          to: "cities.country_id",
        },
      },
    }));
  }

}

export default Country;
