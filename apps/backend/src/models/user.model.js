import BaseModel from "./base.model.js";

class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'email', 'username', 'passwordHash', 'roleCode'],
      properties: {
        ...super.jsonSchema.properties,
        email: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        passwordHash: { type: 'string', minLength: 1, maxLength: 255 },
        roleCode: { type: 'integer' },
      },
    }
  }

}

export default User;
