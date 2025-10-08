import BaseModel from "./base.model.js";

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

}

export default Country;
