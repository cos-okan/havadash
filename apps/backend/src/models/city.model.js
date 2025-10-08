import BaseModel from "./base.model.js";

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

}

export default City;
