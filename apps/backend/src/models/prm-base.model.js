import { Model, snakeCaseMappers } from "objection";

class PrmBaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'valueType', 'value', 'order'],
      properties: {
        code: { type: 'integer' },
        valueType: { type: 'integer' },
        value: { type: 'string' },
        description: { type: 'string' },
        isActive: { type: 'boolean', default: true },
        order: { type: 'integer' },
      },
    };
  }
}

export default PrmBaseModel;
